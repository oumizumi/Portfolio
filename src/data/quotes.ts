export type Quote = {
  text: string;
  author: string;
  source?: string;
};

export type QuoteGroup = {
  theme: string;
  quotes: Quote[];
};

export const quoteGroups: QuoteGroup[] = [
  {
    theme: 'On Craft',
    quotes: [
      {
        text: 'Programs must be written for people to read, and only incidentally for machines to execute.',
        author: 'Harold Abelson',
        source: 'Structure and Interpretation of Computer Programs',
      },
      {
        text: 'Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it. And to make matters worse: complexity sells better.',
        author: 'Edsger Dijkstra',
      },
      {
        text: 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.',
        author: 'Bill Gates',
      },
      {
        text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        author: 'Martin Fowler',
        source: 'Refactoring',
      },
    ],
  },
  {
    theme: 'On Learning',
    quotes: [
      {
        text: 'The first principle is that you must not fool yourself — and you are the easiest person to fool.',
        author: 'Richard Feynman',
      },
      {
        text: 'An expert is a person who has found out by his own painful experience all the mistakes that one can make in a very narrow field.',
        author: 'Niels Bohr',
      },
      {
        text: 'I have no special talent. I am only passionately curious.',
        author: 'Albert Einstein',
      },
      {
        text: 'The more that you read, the more things you will know. The more that you learn, the more places you\'ll go.',
        author: 'Dr. Seuss',
      },
    ],
  },
  {
    theme: 'On Building',
    quotes: [
      {
        text: 'The best way to predict the future is to invent it.',
        author: 'Alan Kay',
      },
      {
        text: 'Make it work, make it right, make it fast.',
        author: 'Kent Beck',
      },
      {
        text: 'Good software, like wine, takes time.',
        author: 'Joel Spolsky',
      },
      {
        text: 'Walking on water and developing software from a specification are easy if both are frozen.',
        author: 'Edward V Berard',
      },
    ],
  },
  {
    theme: 'On Life',
    quotes: [
      {
        text: 'Time you enjoy wasting is not wasted time.',
        author: 'Marthe Troly-Curtin',
      },
      {
        text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
        author: 'Aristotle',
      },
      {
        text: 'The impediment to action advances action. What stands in the way becomes the way.',
        author: 'Marcus Aurelius',
        source: 'Meditations',
      },
      {
        text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
        author: 'Ralph Waldo Emerson',
      },
    ],
  },
  {
    theme: 'On Mathematics',
    quotes: [
      {
        text: 'Mathematics is the language with which God has written the universe.',
        author: 'Galileo Galilei',
      },
      {
        text: "God does arithmetic.",
        author: 'Carl Friedrich Gauss',
      },
      {
        text: 'Pure mathematics is, in its way, the poetry of logical ideas.',
        author: 'Albert Einstein',
      },
    ],
  },
];
