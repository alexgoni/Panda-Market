export interface FormValue {
  image: File | string | null;
  name: string;
  description: string;
  price: number;
  tags: string[];
}
