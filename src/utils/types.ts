export interface Post {
  author: string;
  authorId: number;
  id: number;
  likes: number;
  popularity: number;
  reads: number;
  tags: string[];
}

export type SortBy = "id" | "likes" | "reads" | "popularity";

export type Direction = "asc" | "desc";
