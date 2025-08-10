export type Metric = { label: string; value: string };

export type Module = {
  order: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  metrics?: Metric[];
  tech: string[];
  codeUrl?: string;
  liveUrl?: string;
};

export const modules: Module[] = [
  // Intentionally left empty until portfolio projects are added
];

