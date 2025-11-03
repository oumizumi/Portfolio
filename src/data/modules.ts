export type Metric = { label: string; value: string };

export type Module = {
  order: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  video?: string; // Optional video path - if provided, video will be used instead of image only for kairo.
  metrics?: Metric[];
  tech: string[];
  codeUrl?: string;
  liveUrl?: string;
};

export const modules: Module[] = [
  // Intentionally left empty until portfolio projects are added
];

