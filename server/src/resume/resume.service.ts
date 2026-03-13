import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';

export interface ResumeRecord {
  id: string;
  data: CreateResumeDto;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ResumeService {
  private resumes = new Map<string, ResumeRecord>();

  create(createResumeDto: CreateResumeDto): ResumeRecord {
    const id = this.generateId();
    const now = new Date();
    const record: ResumeRecord = {
      id,
      data: createResumeDto,
      createdAt: now,
      updatedAt: now,
    };
    this.resumes.set(id, record);
    return record;
  }

  findOne(id: string): ResumeRecord {
    const record = this.resumes.get(id);
    if (!record) {
      throw new NotFoundException(`Resume with ID "${id}" not found`);
    }
    return record;
  }

  update(id: string, updateResumeDto: CreateResumeDto): ResumeRecord {
    const existing = this.findOne(id);
    const updated: ResumeRecord = {
      ...existing,
      data: updateResumeDto,
      updatedAt: new Date(),
    };
    this.resumes.set(id, updated);
    return updated;
  }

  findAll(): ResumeRecord[] {
    return Array.from(this.resumes.values());
  }

  remove(id: string): void {
    if (!this.resumes.has(id)) {
      throw new NotFoundException(`Resume with ID "${id}" not found`);
    }
    this.resumes.delete(id);
  }

  getTemplates() {
    return [
      { id: 'classic', name: 'Classic', description: 'Traditional professional layout with clean sections' },
      { id: 'modern', name: 'Modern', description: 'Two-column design with colored sidebar and skill bars' },
      { id: 'minimal', name: 'Minimal', description: 'Clean whitespace-heavy design with timeline layout' },
    ];
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }
}
