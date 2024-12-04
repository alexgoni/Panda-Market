import { useMutation } from "@tanstack/react-query";
import { addFavoriteProduct, deleteFavoriteProduct } from "api/product";
import { ReactComponent as HeartIcon } from "assets/icons/ic_heart.svg";
import classNames from "classnames/bind";
import { useState } from "react";

import styles from "../../Product.module.scss";

const cx = classNames.bind(styles);

interface Props {
  favoriteCount: number;
  productId: number;
  isFavorite: boolean;
}

export default function LikeButton({
  favoriteCount,
  productId,
  isFavorite,
}: Props) {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const [likeCount, setLikeCount] = useState(favoriteCount);
  const mutation = useMutation({
    mutationFn: () => {
      if (isLiked) return addFavoriteProduct(productId);
      return deleteFavoriteProduct(productId);
    },
    onMutate: () => {
      if (!isLiked) {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      } else {
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button type="button" className={cx("like-button")} onClick={handleClick}>
      <HeartIcon
        width={24}
        height={24}
        strokeWidth={1}
        fill={isLiked ? "#ff0000" : "#ffffff"}
      />
      {likeCount}
    </button>
  );
}
