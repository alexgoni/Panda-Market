declare module "@panda-market-api" {
  // common
  interface ProductRequest {
    images: string[];
    tags: string[];
    price: number;
    description: string;
    name: string;
  }

  interface ProductResponse {
    createdAt: string;
    favoriteCount: number;
    ownerId: number;
    images: string[];
    tags: string[];
    price: number;
    description: string;
    name: string;
    id: number;
    isFavorite: boolean | null;
  }

  // POST '/products'
  export type PostProductRequest = ProductRequest;
  export type PostProductResponse = ProductResponse;

  // GET '/products'
  export interface GetProductsResponse {
    totalCount: number;
    list: Product[];
  }

  // GET '/products/{productId}'
  export type GetProductDetailResponse = ProductResponse;

  // PATCH '/products/{productId}'
  export type UpdateProductRequest = ProductRequest;
  export type UpdateProductResponse = ProductResponse;

  // DELETE '/products/{productId}'
  export interface DeleteProductResponse {
    id: number;
  }

  // POST '/products/{productId}/favorite'
  export type AddFavoriteProductResponse = ProductResponse;

  // DELETE '/products/{productId}/favorite'
  export type DeleteFavoriteProductResponse = ProductResponse;
}
