import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductDetail } from "api/product";
import classNames from "classnames/bind";
import { useUserContext } from "context/user";
import { useParams } from "react-router-dom";

import styles from "../../Product.module.scss";
import LikeButton from "./LikeButton";
import Tag from "./Tag";
import UpdateButton from "./UpdateButton";

const cx = classNames.bind(styles);

// TODO: 케밥, 낙관적 업데이트, 스켈레톤, 에러 폴백

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

  return (
    <div className={cx("product-info-container")}>
      <img
        src={data.images[0]}
        alt="product-img"
        className={cx("product-img")}
      />

      <div className={cx("info-wrapper")}>
        <div className={cx("top-content")}>
          <h1>{data.name}</h1>
          {data.ownerId === userInfo?.id ? <UpdateButton /> : <div />}
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

        <LikeButton productId={Number(id)} favoriteCount={data.favoriteCount} />
      </div>
    </div>
  );
}