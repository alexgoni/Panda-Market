import type {
  DeleteArticleLike,
  DeleteArticleResponse,
  GetArticleDetailResponse,
  GetArticlesResponse,
  PostArticleLike,
  PostArticleRequest,
  PostArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "@panda-market-api";

import httpClient from ".";

// POST '/articles'

export async function postArticle(formValue: PostArticleRequest) {
  try {
    const url = `/articles`;
    const body = JSON.stringify({ ...formValue });
    const response = await httpClient.post<PostArticleResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("postArticle 함수에서 오류 발생:", error);
    throw error;
  }
}

// GET '/articles'

interface GetArticlesParams {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
}

export async function getArticles({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword,
}: GetArticlesParams = {}) {
  try {
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      orderBy,
    });

    if (keyword) query.append("keyword", keyword);

    const url = `/articles`;
    const response = await httpClient.get<GetArticlesResponse>(url);

    return response;
  } catch (error) {
    console.error("getArticles 함수에서 오류 발생:", error);
    throw error;
  }
}

// GET '/articles/{articleId}'

export async function getArticleDetail(articleId: number) {
  try {
    const url = `/articles/${articleId}`;
    const response = await httpClient.get<GetArticleDetailResponse>(url);

    return response;
  } catch (error) {
    console.error("getArticleDetail 함수에서 오류 발생:", error);
    throw error;
  }
}

// PATCH '/articles/{articleId}'

export async function updateArticle({
  articleId,
  formValue,
}: {
  articleId: number;
  formValue: UpdateArticleRequest;
}) {
  try {
    const url = `/articles/${articleId}`;
    const body = JSON.stringify({ ...formValue });
    const response = await httpClient.patch<UpdateArticleResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("updateArticle 함수에서 오류 발생:", error);
    throw error;
  }
}

// DELETE '/articles/{articleId}'

export async function deleteArticle(articleId: number) {
  try {
    const url = `/articles/${articleId}`;
    const response = await httpClient.delete<DeleteArticleResponse>(url);

    return response;
  } catch (error) {
    console.error("deleteArticle 함수에서 오류 발생:", error);
    throw error;
  }
}

// POST '/articles/{articleId}/like'

export async function addFavoriteArticle(articleId: number) {
  try {
    const url = `/articles/${articleId}/like`;
    const response = await httpClient.post<PostArticleLike>(url);

    return response;
  } catch (error) {
    console.error("addFavoriteArticle 함수에서 오류 발생:", error);
    throw error;
  }
}

// DELETE '/articles/{articleId}/like'

export async function deleteFavoriteArticle(articleId: number) {
  try {
    const url = `/articles/${articleId}/like`;
    const response = await httpClient.delete<DeleteArticleLike>(url);

    return response;
  } catch (error) {
    console.error("deleteFavoriteArticle 함수에서 오류 발생:", error);
    throw error;
  }
}
