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

  private generateShortId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async create(createResumeDto: CreateResumeDto): Promise<Resume> {
    const resume = this.resumeRepository.create({
      data: createResumeDto,
      shortId: this.generateShortId(),
    });
    return this.resumeRepository.save(resume);
  }

  async findOne(id: string): Promise<Resume> {
    // Attempt to find by UUID first, then by shortId
    let resume = await this.resumeRepository.findOne({
      where: { id },
    });

    if (!resume) {
      resume = await this.resumeRepository.findOne({
        where: { shortId: id.toUpperCase() },
      });
    }

    if (!resume) {
      throw new NotFoundException(`Resume with ID "${id}" not found`);
    }
    return resume;
  }

  async update(
    idOrShortId: string,
    updateResumeDto: CreateResumeDto,
  ): Promise<Resume> {
    const resume = await this.findOne(idOrShortId);
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
      {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional professional layout with clean sections',
      },
      {
        id: 'modern',
        name: 'Modern',
        description: 'Two-column design with colored sidebar and skill bars',
      },
      {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean whitespace-heavy design with timeline layout',
      },
    ];
  }
}
