# Stage 1: Build the application
FROM node:18-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock tsconfig*.json .npmrc ./

RUN yarn install --production

# Copy application sources (.ts, .tsx, js)
COPY src/ src/
COPY nest-cli.json nest-cli.json

# Build the NestJS app
RUN yarn global add @nestjs/cli
RUN yarn run build

# Stage 2: Setup the production environment
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy built assets from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main"]
