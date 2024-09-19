import type {
  AddFavoriteProductResponse,
  DeleteFavoriteProductResponse,
  DeleteProductResponse,
  GetProductDetailResponse,
  GetProductsResponse,
  PostProductRequest,
  PostProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from "@panda-market-api";

import httpClient from ".";

// POST '/products'

export async function postProduct(formValue: PostProductRequest) {
  try {
    const url = `/products`;
    const body = JSON.stringify({ ...formValue });
    const response = await httpClient.post<PostProductResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("postProduct 함수에서 오류 발생:", error);
    throw error;
  }
}

// GET '/products'

interface GetProductsParams {
  page?: number;
  pageSize?: number;
  orderBy?: "favorite" | "recent";
  keyword?: string;
}

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword,
}: GetProductsParams = {}) {
  try {
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      orderBy,
    });

    if (keyword) query.append("keyword", keyword);

    const url = `/products?${query}`;
    const response = await httpClient.get<GetProductsResponse>(url);

    return response;
  } catch (error) {
    console.error("getProducts 함수에서 오류 발생:", error);
    throw error;
  }
}

// GET '/products/{productId}'

export async function getProductDetail(productId: number) {
  try {
    const url = `/products/${productId}`;
    const response = await httpClient.get<GetProductDetailResponse>(url);

    return response;
  } catch (error) {
    console.error("getProductDetail 함수에서 오류 발생:", error);
    throw error;
  }
}

// PATCH '/products/{productId}'

export async function updateProduct({
  productId,
  formValue,
}: {
  productId: number;
  formValue: UpdateProductRequest;
}) {
  try {
    const url = `/products/${productId}`;
    const body = JSON.stringify({ ...formValue });
    const response = await httpClient.patch<UpdateProductResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("updateProduct 함수에서 오류 발생:", error);
    throw error;
  }
}

// DELETE '/products/{productId}'

export async function deleteProducts(productId: number) {
  try {
    const url = `/products/${productId}`;
    const response = await httpClient.delete<DeleteProductResponse>(url);

    return response;
  } catch (error) {
    console.error("deleteProducts 함수에서 오류 발생:", error);
    throw error;
  }
}

// POST '/products/{productId}/favorite'

export async function addFavoriteProduct(productId: number) {
  try {
    const url = `/products/${productId}/favorite`;
    const response = await httpClient.post<AddFavoriteProductResponse>(url);

    return response;
  } catch (error) {
    console.error("addFavoriteProduct 함수에서 오류 발생:", error);
    throw error;
  }
}

// DELETE '/products/{productId}/favorite'

export async function deleteFavoriteProduct(productId: number) {
  try {
    const url = `/products/${productId}/favorite`;
    const response =
      await httpClient.delete<DeleteFavoriteProductResponse>(url);

    return response;
  } catch (error) {
    console.error("deleteFavoriteProduct 함수에서 오류 발생:", error);
    throw error;
  }
}
