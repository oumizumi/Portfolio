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
    slug: 'the-case-for-looking-up',
    title: 'The Case for Looking Up',
    date: '2025-11-15',
    category: 'Space',
    excerpt: '',
    content: 'Staring at the night sky has been a source of wonder and inspiration for humanity since time immemorial. The vast expanse of stars, planets, and galaxies above us reminds us of our place in the universe and ignites our curiosity about what lies beyond our worlld. The fact that space is al',
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
    slug: 'earth',
    title: 'Earth',
    date: '2025-11-15',
    category: 'Ranting',
    excerpt: '',
    content: `![Earth](/Earth.png)

A beautiful oasis in the midst of a vast universe. I find it incredible that we just live on a rotating sphere of rock and water - and somehow, that's enough to sustain everything we have ever known or loved. It's a reminder of how small we are in the grand scheme of things, absolutely stunning!! P.S; You can see the aurora borealis if you look closely on the poles ;)`,
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
