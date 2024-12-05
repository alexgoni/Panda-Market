import type { Comment, GetCommentsResponse } from "@panda-market-api";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteComment, postProductComment, updateComment } from "api/comment";
import type { UserInfo } from "context/user";
import { useParams } from "react-router-dom";

type MutationType = "create" | "edit" | "delete";

type CreateParams = {
  text: string;
  userInfo: UserInfo;
};

type EditParams = {
  text: string;
  commentId: number;
};

type DeleteParams = {
  commentId: number;
};

export default function useCommentAction<T extends MutationType>(
  type: T,
  params: T extends "create"
    ? CreateParams
    : T extends "edit"
      ? EditParams
      : DeleteParams,
) {
  const queryClient = useQueryClient();
  const routeParams = useParams();

  const createMutation = useMutation({
    mutationFn: () => {
      if (type !== "create") {
        throw new Error("Invalid mutation type for create");
      }
      const createParams = params as CreateParams;
      return postProductComment({
        productId: Number(routeParams.id),
        content: createParams.text,
      });
    },
    onMutate: async () => {
      if (type !== "create") return null;

      const createParams = params as CreateParams;

      await queryClient.cancelQueries({
        queryKey: ["comments", routeParams.id],
      });

      const previousComments = queryClient.getQueryData([
        "comments",
        routeParams.id,
      ]);

      queryClient.setQueryData(
        ["comments", routeParams.id],
        (
          old: InfiniteData<GetCommentsResponse>,
        ): InfiniteData<GetCommentsResponse> => ({
          ...old,
          pages: old.pages.map((page, index) =>
            index === 0
              ? {
                  ...page,
                  list: [
                    {
                      id: Date.now(),
                      content: createParams.text,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      writer: {
                        id: createParams.userInfo.id,
                        nickname: createParams.userInfo.nickname,
                        image: createParams.userInfo.image,
                      },
                    },
                    ...page.list,
                  ],
                }
              : page,
          ),
        }),
      );

      return () => {
        queryClient.setQueryData(
          ["comments", routeParams.id],
          previousComments,
        );
      };
    },
    onError: (error, variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", routeParams.id] });
    },
  });

  const editMutation = useMutation({
    mutationFn: () => {
      if (type !== "edit") {
        throw new Error("Invalid mutation type for edit");
      }
      const editParams = params as EditParams;
      return updateComment({
        commentId: editParams.commentId,
        content: editParams.text,
      });
    },
    onMutate: async () => {
      if (type !== "edit") return null;

      const editParams = params as EditParams;

      await queryClient.cancelQueries({
        queryKey: ["comments", routeParams.id],
      });

      const previousComments = queryClient.getQueryData([
        "comments",
        routeParams.id,
      ]);

      queryClient.setQueryData(
        ["comments", routeParams.id],
        (
          old: InfiniteData<GetCommentsResponse>,
        ): InfiniteData<GetCommentsResponse> => ({
          ...old,
          pages: old.pages.map((page, index) =>
            index === 0
              ? {
                  ...page,
                  list: page.list.map((comment: Comment) =>
                    comment.id === editParams.commentId
                      ? {
                          ...comment,
                          content: editParams.text,
                          updatedAt: new Date().toISOString(),
                        }
                      : comment,
                  ),
                }
              : page,
          ),
        }),
      );

      return () => {
        queryClient.setQueryData(
          ["comments", routeParams.id],
          previousComments,
        );
      };
    },
    onError: (error, variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", routeParams.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (type !== "delete") {
        throw new Error("Invalid mutation type for delete");
      }
      const deleteParams = params as DeleteParams;
      return deleteComment(deleteParams.commentId);
    },
    onMutate: async () => {
      if (type !== "delete") return null;

      const deleteParams = params as DeleteParams;

      await queryClient.cancelQueries({
        queryKey: ["comments", routeParams.id],
      });

      const previousComments = queryClient.getQueryData([
        "comments",
        routeParams.id,
      ]);

      queryClient.setQueryData(
        ["comments", routeParams.id],
        (
          old: InfiniteData<GetCommentsResponse>,
        ): InfiniteData<GetCommentsResponse> => ({
          ...old,
          pages: old.pages.map((page, index) =>
            index === 0
              ? {
                  ...page,
                  list: page.list.filter(
                    (comment: Comment) => comment.id !== deleteParams.commentId,
                  ),
                }
              : page,
          ),
        }),
      );

      return () => {
        queryClient.setQueryData(
          ["comments", routeParams.id],
          previousComments,
        );
      };
    },
    onError: (error, variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", routeParams.id] });
    },
  });

  return { createMutation, editMutation, deleteMutation };
}
