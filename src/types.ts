export type Level = "A" | "B" | "C" | "Special";

export interface Course {
  id: string;
  level: Level;
  title: string;
  description: string;
  img?: string;
  pricePerPerson: number;
  durationMonths: number;
}

export interface CartItem {
  courseId: string;
  title: string;
  level: Level;
  persons: number;
  withAccommodation: boolean;
  pricePerPerson: number;
  durationMonths: number;
}
