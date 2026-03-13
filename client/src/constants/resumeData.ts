import { ResumeData } from '@/types/resume';

export const initialData: ResumeData = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',
  website: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
};

export const templates = [
  { id: 'classic', name: 'Classic', emoji: '📄' },
  { id: 'modern', name: 'Modern', emoji: '🎨' },
  { id: 'minimal', name: 'Minimal', emoji: '✨' },
];

export const sampleData: ResumeData = {
  fullName: 'Alex Johnson',
  jobTitle: 'Senior Full-Stack Developer',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 987-6543',
  address: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/alexjohnson',
  website: 'alexjohnson.dev',
  summary: 'Passionate and results-driven Full-Stack Developer with 6+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud technologies. Strong background in agile methodologies and team collaboration.',
  experience: [
    {
      company: 'TechCorp Inc.',
      position: 'Senior Full-Stack Developer',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: '• Led a team of 5 developers to rebuild the core platform using React and Node.js\n• Improved application performance by 40% through code optimization\n• Implemented CI/CD pipelines reducing deployment time by 60%',
    },
    {
      company: 'StartupXYZ',
      position: 'Full-Stack Developer',
      startDate: 'Mar 2019',
      endDate: 'Dec 2021',
      description: '• Built and maintained 3 production-grade web applications\n• Developed RESTful APIs serving 100K+ daily requests\n• Mentored 2 junior developers',
    },
  ],
  education: [
    {
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: 'Sep 2015',
      endDate: 'Jun 2019',
    },
  ],
  skills: [
    { name: 'React.js', level: 'Expert' },
    { name: 'Node.js', level: 'Expert' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'Python', level: 'Advanced' },
    { name: 'PostgreSQL', level: 'Advanced' },
    { name: 'AWS', level: 'Intermediate' },
    { name: 'Docker', level: 'Advanced' },
    { name: 'Git', level: 'Expert' },
  ],
  projects: [
    {
      name: 'E-Commerce Platform',
      description: 'Full-featured e-commerce platform with real-time inventory management and payment processing.',
      techStack: 'Next.js, NestJS, PostgreSQL, Stripe',
      link: 'github.com/alex/ecommerce',
    },
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'Intermediate' },
  ],
};
