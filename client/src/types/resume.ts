export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface SkillItem {
  name: string;
  level?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  techStack: string;
  link: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  languages: LanguageItem[];
}
