import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resto365Job } from './entities/resto365-job.entity';
import { In, Repository } from 'typeorm';
import { CreateResto365JobDto } from './dto/create-resto365-job.dto';
import { JobStatus, JobType } from 'src/context';
import { UpdateResto365JobDto } from './dto/update-resto365-job.dto';

@Injectable()
export class Resto365JobService {
  constructor(
    @InjectRepository(Resto365Job, 'r365')
    private readonly Resto365JobRepository: Repository<Resto365Job>,
  ) {}

  async create(
    createResto365JobDto: CreateResto365JobDto,
  ): Promise<Resto365Job> {
    try {
      const job = this.Resto365JobRepository.create(createResto365JobDto);
      return await this.Resto365JobRepository.save(job);
    } catch (error) {
      throw error;
    }
  }

  async findByJobId(jobId: number): Promise<Resto365Job> {
    try {
      const job = await this.Resto365JobRepository.findOne({
        where: { jobId },
      });
      if (!job) {
        throw new NotFoundException(`Job with id ${jobId} not found`);
      }
      return job;
    } catch (error) {
      throw error;
    }
  }

  async findActiveJobsByRestoId(restaurantId: number): Promise<Resto365Job[]> {
    try {
      const job = await this.Resto365JobRepository.find({
        where: {
          restaurantId,
          status: In([JobStatus.CREATED, JobStatus.INPROGRESS]),
          jobType: JobType.MENU_GENERATION,
        },
      });

      return job;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Resto365Job[]> {
    try {
      const job = await this.Resto365JobRepository.find();

      return job;
    } catch (error) {
      throw error;
    }
  }

  async findActiveJobsByJobType(jobType: string): Promise<Resto365Job[]> {
    try {
      const job = await this.Resto365JobRepository.find({
        where: {
          status: In([JobStatus.CREATED, JobStatus.INPROGRESS]),
          jobType,
        },
        relations: ['restaurant'],
      });

      return job;
    } catch (error) {
      throw error;
    }
  }

  async upsert(updateResto365JobDto: UpdateResto365JobDto[]): Promise<void> {
    try {
      await this.Resto365JobRepository.upsert(updateResto365JobDto, ['id']);
    } catch (error) {
      throw error;
    }
  }
}
