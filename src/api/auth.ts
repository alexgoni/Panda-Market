import type {
  PostRefreshTokenRequest,
  PostSignInRequest,
  PostSignInResponse,
  PostSignUpRequest,
  PostSignUpResponse,
} from "@panda-market-api";

import httpClient from ".";

// POST '/auth/signUp'

export async function postSignUp(formValue: PostSignUpRequest) {
  try {
    const url = `/auth/signUp`;
    const body = JSON.stringify({ ...formValue });
    const response = await httpClient.post<PostSignUpResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("postSignUp 함수에서 오류 발생:", error);
    throw error;
  }
}

// POST '/auth/signIn'

export async function postSignIn(formValue: PostSignInRequest) {
  try {
    const url = `/auth/signIn`;
    const body = JSON.stringify({ ...formValue });
    const response = await httpClient.post<PostSignInResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("postSignIn 함수에서 오류 발생:", error);
    throw error;
  }
}

// POST '/auth/refresh-token'

export async function postRefreshToken(formValue: PostRefreshTokenRequest) {
  try {
    const url = `/auth/refresh-token`;
    const body = JSON.stringify({ ...formValue });
    const response = await httpClient.post<PostSignInResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("postRefreshToken 함수에서 오류 발생:", error);
    throw error;
  }
}
