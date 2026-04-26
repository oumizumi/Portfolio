export type Project = {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  url?: string;
  year: string;
};

export const projects: Project[] = [
  {
    name: 'NestFinder',
    description: 'A housing platform to help students and young professionals find places to live near their universities.',
    tech: ['React', 'Next.js', 'TypeScript', 'Supabase'],
    year: '2025',
  },
];
