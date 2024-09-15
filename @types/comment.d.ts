declare module "@panda-market-api" {
  // common
  interface Writer {
    image: string | null;
    nickname: string;
    id: number;
  }

  interface Comment {
    writer: Writer;
    updatedAt: string;
    createdAt: string;
    content: string;
    id: number;
  }

  // POST '/products/{productId}/comments'
  // POST '/articles/{articleId}/comments'
  export interface PostCommentRequest {
    content: string;
  }

  export type PostCommentResponse = Comment;

  // GET '/products/{productId}/comments'
  // GET '/articles/{articleId}/comments'
  export interface GetCommentsResponse {
    nextCursor: number;
    list: Comment[];
  }

  // PATCH '/comments/{commentId}'
  export interface UpdateCommentRequest {
    content: string;
  }

  export interface UpdateCommentResponse {
    nextCursor: number;
    list: Comment[];
  }

  // DELETE '/comments/{commentId}'
  export interface DeleteCommentResponse {
    id: number;
  }
}
