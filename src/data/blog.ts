export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
};

export const posts: BlogPost[] = [
  {
    slug: 'on-death',
    title: 'On Death',
    date: '2026-04-15',
    category: 'Musings',
    excerpt: '',
    content: '',
  },
  {
    slug: 'the-challenger-disaster',
    title: 'The Challenger Disaster',
    date: '2025-11-15',
    category: 'Space',
    excerpt: '',
    content: '',
  },
  {
    slug: 'artemis-1',
    title: 'Artemis 1',
    date: '2025-10-14',
    category: 'Space',
    excerpt: '',
    content: '',
  },
  {
    slug: 'artemis-2',
    title: 'Artemis 2',
    date: '2026-03-20',
    category: 'Space',
    excerpt: '',
    content: '',
  },
];
