import type {
  DeleteCommentResponse,
  GetCommentsResponse,
  PostCommentResponse,
  UpdateCommentResponse,
} from "@panda-market-api";

import httpClient from ".";

// POST '/products/{productId}/comments'

export async function postProductComment({
  productId,
  content,
}: {
  productId: number;
  content: string;
}) {
  try {
    const url = `/products/${productId}/comments`;
    const body = JSON.stringify({ content });
    const response = await httpClient.post<PostCommentResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("postProductComment 함수에서 오류 발생:", error);
    throw error;
  }
}

// GET '/products/{productId}/comments'

interface GetProductCommentsParams {
  productId: number;
  limit: number;
  cursor?: number;
}

export async function getProductComments({
  productId,
  limit,
  cursor,
}: GetProductCommentsParams) {
  try {
    const query = new URLSearchParams({
      limit: String(limit),
    });

    if (cursor) query.append("cursor", String(cursor));

    const url = `/products/${productId}/comments?${query}`;
    const response = await httpClient.get<GetCommentsResponse>(url);

    return response;
  } catch (error) {
    console.error("getProductComments 함수에서 오류 발생:", error);
    throw error;
  }
}

// POST '/articles/{articleId}/comments'

export async function postArticleComment({
  articleId,
  content,
}: {
  articleId: number;
  content: string;
}) {
  try {
    const url = `/articles/${articleId}/comments`;
    const body = JSON.stringify({ content });
    const response = await httpClient.post<PostCommentResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("postArticleComment 함수에서 오류 발생:", error);
    throw error;
  }
}

// GET '/articles/{articleId}/comments'

interface GetArticleCommentsParams {
  articleId: number;
  limit: number;
  cursor?: number;
}

export async function getArticleComments({
  articleId,
  limit,
  cursor,
}: GetArticleCommentsParams) {
  try {
    const query = new URLSearchParams({
      limit: String(limit),
    });

    if (cursor) query.append("cursor", String(cursor));

    const url = `/articles/${articleId}/comments?${query}`;
    const response = await httpClient.get<GetCommentsResponse>(url);

    return response;
  } catch (error) {
    console.error("getArticleComments 함수에서 오류 발생:", error);
    throw error;
  }
}

// PATCH '/comments/{commentId}'

export async function updateComment({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) {
  try {
    const url = `/comments/${commentId}`;
    const body = JSON.stringify({ content });
    const response = await httpClient.patch<UpdateCommentResponse>(url, {
      body,
    });

    return response;
  } catch (error) {
    console.error("updateComment 함수에서 오류 발생:", error);
    throw error;
  }
}

// DELETE '/comments/{commentId}'

export async function deleteComment(commentId: number) {
  try {
    const url = `/comments/${commentId}`;
    const response = await httpClient.delete<DeleteCommentResponse>(url);

    return response;
  } catch (error) {
    console.error("deleteComment 함수에서 오류 발생:", error);
    throw error;
  }
}
