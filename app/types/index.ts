import { ReactNode } from "react"

export type TypeFilter = {
    id: number;
    label: string;
    name: 'rating' | 'genres' | 'date';
    content: ReactNode;
}

export type TypeFilterState = {
  name: 'rating' | 'genres' | 'date';
  isOpen: boolean;
};