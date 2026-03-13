import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CreateResumeDto } from '../dto/create-resume.dto';

@Entity('resumes')
export class Resume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'simple-json' })
  data: CreateResumeDto;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
