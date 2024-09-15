declare module "@panda-market-api" {
  // common
  interface UserResponse {
    updatedAt: string;
    createdAt: string;
    image: string | null;
    nickname: string;
    id: number;
  }

  // GET '/users/me'
  export type GetMyInfoResponse = UserResponse;

  // PATCH '/users/me'
  export interface UpdateProfileImageRequest {
    image: string;
  }

  export type UpdateProfileImageResponse = UserResponse;

  // PATCH '/users/me/password'
  export interface UpdatePasswordRequest {
    passwordConfirmation: string;
    password: string;
    currentPassword: string;
  }

  export type UpdatePasswordResponse = UserResponse;

  // GET '/users/me/products'
  export interface GetMyProductsResponse {
    totalCount: number;
    list: Product[];
  }

  // GET '/users/me/favorites'
  export interface GetMyFavoriteProductsResponse {
    totalCount: number;
    list: Product[];
  }
}
