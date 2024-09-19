import type {
  GetMyFavoriteProductsResponse,
  GetMyInfoResponse,
  GetMyProductsResponse,
  UpdatePasswordRequest,
  UpdateProfileImageResponse,
} from "@panda-market-api";

import httpClient from ".";

// GET '/users/me'

export async function getMyInfo() {
  try {
    const url = `/users/me`;
    const response = await httpClient.get<GetMyInfoResponse>(url);

    return response;
  } catch (error) {
    console.error("getMyInfo 함수에서 오류 발생:", error);
    throw error;
  }
}

// PATCH '/users/me'

export async function updateProfileImage(image: string) {
  try {
    const url = `/users/me`;
    const body = JSON.stringify({ image });
    const response = await httpClient.patch<UpdateProfileImageResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("updateProfileImage 함수에서 오류 발생:", error);
    throw error;
  }
}

// PATCH '/users/me/password'

export async function updatePassword(formValue: UpdatePasswordRequest) {
  try {
    const url = `/users/me/password`;
    const body = JSON.stringify({ ...formValue });
    const response = await httpClient.patch<UpdateProfileImageResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("updatePassword 함수에서 오류 발생:", error);
    throw error;
  }
}

// GET '/users/me/products'

interface GetMyProductsParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export async function getMyProducts({
  page = 1,
  pageSize = 10,
  keyword,
}: GetMyProductsParams = {}) {
  try {
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    if (keyword) query.append("keyword", keyword);

    const url = `/users/me/products?${query}`;
    const response = await httpClient.get<GetMyProductsResponse>(url);

    return response;
  } catch (error) {
    console.error("getMyProducts 함수에서 오류 발생:", error);
    throw error;
  }
}

// GET '/users/me/favorites'

interface GetMyFavoriteProductsParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export async function getMyFavoriteProduct({
  page = 1,
  pageSize = 10,
  keyword,
}: GetMyFavoriteProductsParams = {}) {
  try {
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    if (keyword) query.append("keyword", keyword);

    const url = `/users/me/favorites?${query}`;
    const response = await httpClient.get<GetMyFavoriteProductsResponse>(url);

    return response;
  } catch (error) {
    console.error("getMyFavoriteProduct 함수에서 오류 발생:", error);
    throw error;
  }
}
