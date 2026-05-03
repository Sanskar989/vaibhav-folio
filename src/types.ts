export interface Profile {
  name: string;
  title: string;
  age: number;
  location: string;
  email: string;
  phone: string;
  about: string;
  linkedin: string;
  instagram: string;
}

export interface Project {
  id?: string | number;
  title: string;
  description: string;
  details: string;
  tags: string[];
  image?: string;
  link?: string;
  repo?: string;
}

export interface PhotoEntry {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Achievement {
  title: string;
}
