import { AuthService } from '@modules/auth/auth.service';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GygLog } from 'src/shared';
import { Resto365NotificationService } from './resto365-notification.service';
@WebSocketGateway({ cors: true })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() io: Server;
  private logger = new GygLog(NotificationGateway.name);
  constructor(
    private authService: AuthService,
    notificationService: Resto365NotificationService,
  ) {
    notificationService.notificationQueue$.subscribe(async (notification) => {
      const { message, category, userId, time } = notification;
      this.logger.info(
        'notification',
        `Sending notification to ${notification.userId} `,
        notification.message,
      );
      await notificationService.create(notification);
      this.io.to(userId.toString()).emit('notification', {
        message,
        category,
        time: time,
      });
    });
  }

  afterInit() {
    this.logger.writeLog('Init', NotificationGateway.name, '');
  }

  async handleConnection(socket: Socket) {
    const { token } = socket.handshake.auth;
    const oktaToken = this.authService.getOktaToken(token);
    const subject = oktaToken?.sub ?? 'Unknown';
    this.logger.info(this.handleConnection.name, 'User connecting', subject);
    if (!token) {
      socket.disconnect();
      this.logger.error(this.handleConnection.name, 'Unauthorized', subject);
      return;
    }
    try {
      const user = await this.authService.authenticate(token);
      socket.join(user.id.toString());
      this.logger.info(this.handleConnection.name, 'User connected', subject);
    } catch (error) {
      this.logger.error(this.handleConnection.name, error, subject);
      socket.disconnect();
      this.logger.info(this.handleConnection.name, 'Forbidden', subject);
    }
  }
  handleDisconnect(socket: Socket) {
    const { token } = socket.handshake.auth;
    const oktaToken = this.authService.getOktaToken(token);
    this.logger.info(
      this.handleDisconnect.name,
      'User disconnected',
      oktaToken.sub,
    );
  }
}
