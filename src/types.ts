export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  colSpan: string; // e.g., 'col-span-12 md:col-span-7' or 'col-span-12 md:col-span-5'
  aspectRatio: string; // e.g., 'aspect-[4/3]' or 'aspect-[16/10]'
}

export interface JournalEntry {
  id: string;
  title: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  image: string;
  rotation: string; // Tailwind rotation class, e.g., 'rotate-2' or '-rotate-3'
  col: 1 | 2; // Column index for parallax columns
}
