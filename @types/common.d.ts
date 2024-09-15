declare module "@panda-market-api" {
  export interface ErrorMessage {
    message: string;
  }

  export interface Product {
    createdAt: string;
    favoriteCount: number;
    ownerId: number;
    images: string[];
    tags: string[];
    price: number;
    description: string;
    name: string;
    id: number;
  }
}
