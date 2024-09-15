declare module "@panda-market-api" {
  // common
  interface User {
    id: number;
    email: string;
    image: string | null;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  }

  interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
  }

  // POST '/auth/signUp'
  export interface PostSignUpRequest {
    email: string;
    nickname: string;
    password: string;
    passwordConfirmation: string;
  }

  export type PostSignUpResponse = AuthResponse;

  // POST '/auth/signIn'
  export interface PostSignInRequest {
    email: string;
    password: string;
  }

  export type PostSignInResponse = AuthResponse;

  // POST '/auth/refresh-token'
  export interface PostRefreshTokenRequest {
    refreshToken: string;
  }

  export interface PostRefreshTokenResponse {
    accessToken: string;
  }
}
