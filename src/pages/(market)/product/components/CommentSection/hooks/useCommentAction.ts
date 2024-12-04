import type { GetCommentsResponse } from "@panda-market-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProductComment } from "api/comment";
import type { UserInfo } from "context/user";
import { useParams } from "react-router-dom";

interface Params {
  text: string;
  userInfo: UserInfo;
}

export default function useCommentAction({ text, userInfo }: Params) {
  const params = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      postProductComment({
        productId: Number(params.id),
        content: text,
      }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["comments", params.id] });

      const previousComments = queryClient.getQueryData<GetCommentsResponse>([
        "comments",
        params.id,
      ]);

      queryClient.setQueryData(
        ["comments", params.id],
        (old: GetCommentsResponse): GetCommentsResponse => ({
          ...old,
          list: [
            {
              id: Date.now(),
              content: text,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              writer: {
                id: userInfo.id,
                nickname: userInfo.nickname,
                image: userInfo.image,
              },
            },
            ...old.list,
          ],
        }),
      );

      return () => {
        queryClient.setQueryData(["comments", params.id], previousComments);
      };
    },
    onError: (error, variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", params.id] });
    },
  });

  return mutation;
}
