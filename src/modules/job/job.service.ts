import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}
  public async findAll(): Promise<Job[]> {
    return await this.jobRepository.find();
  }

  public async findByIds(id: number[]): Promise<Job[]> {
    try {
      return await this.jobRepository.find({
        where: { id: In(id) },
      });
    } catch (error) {
      throw error;
    }
  }
}
