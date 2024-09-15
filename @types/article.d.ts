declare module "@panda-market-api" {
  // common
  interface Writer {
    nickname: string;
    id: number;
  }

  interface Article {
    updatedAt: string;
    createdAt: string;
    likeCount: number;
    writer: Writer;
    image: string | null;
    content: string;
    title: string;
    id: number;
  }

  // POST '/articles'
  export interface PostArticleRequest {
    image: string;
    content: string;
    title: string;
  }

  export type PostArticleResponse = Article;

  // GET '/articles'
  export interface GetArticlesResponse {
    totalCount: number;
    list: Article[];
  }

  // GET '/articles/{articleId}'
  export type GetArticleDetailResponse = Article;

  // PATCH '/articles/{articleId}'
  export interface UpdateArticleRequest {
    image: string;
    content: string;
    title: string;
  }

  export interface UpdateArticleResponse extends Article {
    isLiked: boolean | null;
  }

  // DELETE '/articles/{articleId}'
  export interface DeleteArticleResponse {
    id: number;
  }

  // POST '/articles/{articleId}/like'
  export interface PostArticleLike extends Article {
    isLiked: boolean | null;
  }

  // DELETE '/articles/{articleId}/like'
  export interface DeleteArticleLike extends Article {
    isLiked: boolean | null;
  }
}
