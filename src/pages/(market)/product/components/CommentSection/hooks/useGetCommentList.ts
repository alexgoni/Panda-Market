import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getProductComments } from "api/comment";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { RefObject, useEffect } from "react";
import { useParams } from "react-router-dom";

const LIMIT = 5;

export default function useGetCommentList(sentinelRef: RefObject<HTMLElement>) {
  const { id } = useParams();
  const isIntersecting = useIntersectionObserver(sentinelRef);

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: ({ pageParam = undefined }: { pageParam: number | undefined }) => {
      if (!id) throw new Error("해당 상품이 존재하지 않습니다.");
      return getProductComments({
        productId: Number(id),
        limit: LIMIT,
        cursor: pageParam ?? undefined,
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });

  // 무한 스크롤
  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage]);

  const comments = data.pages.flatMap((page) => page.list);

  return comments;
}
