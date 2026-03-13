import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResumeDto } from './dto/create-resume.dto';
import { Resume } from './entities/resume.entity';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
  ) {}

  async create(createResumeDto: CreateResumeDto): Promise<Resume> {
    const resume = this.resumeRepository.create({
      data: createResumeDto,
    });
    return this.resumeRepository.save(resume);
  }

  async findOne(id: string): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({ where: { id } });
    if (!resume) {
      throw new NotFoundException(`Resume with ID "${id}" not found`);
    }
    return resume;
  }

  async update(id: string, updateResumeDto: CreateResumeDto): Promise<Resume> {
    const resume = await this.findOne(id);
    resume.data = updateResumeDto;
    return this.resumeRepository.save(resume);
  }

  async findAll(): Promise<Resume[]> {
    return this.resumeRepository.find({
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async remove(id: string): Promise<void> {
    const resume = await this.findOne(id);
    await this.resumeRepository.remove(resume);
  }

  getTemplates() {
    return [
      { id: 'classic', name: 'Classic', description: 'Traditional professional layout with clean sections' },
      { id: 'modern', name: 'Modern', description: 'Two-column design with colored sidebar and skill bars' },
      { id: 'minimal', name: 'Minimal', description: 'Clean whitespace-heavy design with timeline layout' },
    ];
  }
}

