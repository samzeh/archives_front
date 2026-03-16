export interface ProfileBook {
  book_id: string;
  your_ratings: number;
  comment: string;
  status: "to_read" | "finished";
}