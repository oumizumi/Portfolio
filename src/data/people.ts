export type Person = {
  name: string;
  role: string;
  description: string;
  category: 'History' | 'Science & Technology' | 'Mathematics' | 'Philosophy';
  initials: string;
  color: string;
  image?: string;
};

export const people: Person[] = [
  {
    name: 'Isaac Newton',
    role: 'Mathematician, Physicist & Astronomer',
    description: '',
    category: 'Science & Technology',
    initials: 'IN',
    color: '#374151',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/GodfreyKneller-IsaacNewton-1689.jpg',
  },
];

export const categories = ['History', 'Science & Technology', 'Mathematics', 'Philosophy'] as const;
