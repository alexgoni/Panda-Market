import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductDetail } from "api/product";
import noImage from "assets/images/no-img.png";
import classNames from "classnames/bind";
import { useUserContext } from "context/user";
import { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "../../Product.module.scss";
import LikeButton from "./LikeButton";
import Tag from "./Tag";
import UpdatePopover from "./UpdatePopover";

const cx = classNames.bind(styles);

// TODO:  케밥

export default function ProductInfo() {
  const { id } = useParams();
  const { userInfo } = useUserContext();

  const { data } = useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: () => {
      if (!id) throw new Error("해당 상품이 존재하지 않습니다.");
      return getProductDetail(Number(id));
    },
  });

  const [imageSrc, setImageSrc] = useState(data.images[0] ?? noImage);

  const handleImageError = () => {
    setImageSrc(noImage);
  };

  return (
    <div className={cx("product-info-container")}>
      <img
        src={imageSrc}
        alt="product-img"
        className={cx("product-img")}
        onError={handleImageError}
      />

      <div className={cx("info-wrapper")}>
        <div className={cx("top-content")}>
          <h1>{data.name}</h1>
          {data.ownerId === userInfo?.id ? <UpdatePopover /> : <div />}
          <span>{data.price.toLocaleString()}원</span>
        </div>

        <div className={cx("bottom-content")}>
          <h2>상품 소개</h2>
          <p>{data.description}</p>
          <h2>상품 태그</h2>
          <div className={cx("tag-wrapper")}>
            {data.tags.map((tag) => (
              <Tag key={tag}>{`#${tag}`}</Tag>
            ))}
          </div>
        </div>

        {userInfo && (
          <LikeButton
            productId={Number(id)}
            favoriteCount={data.favoriteCount}
            isFavorite={!!data.isFavorite}
          />
        )}
      </div>
    </div>
  );
}
