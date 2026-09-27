export interface Review {
  name: string;
  location: string;
  rating: number;
  date: string;
  product: string;
}


export const overallRating = {
  average: 4.5,
  total: 80,
  satisfaction: "96%",
  quality: "100%",
  delivery: "100%",
  distribution: { 5: 67, 4: 0, 3: 0, 2: 0, 1: 33 },
};
