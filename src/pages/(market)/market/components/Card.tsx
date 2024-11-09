import type { Product } from "@panda-market-api";
import heartIcon from "assets/icons/ic_heart.svg";
import noImage from "assets/images/no-img.png";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../Market.module.scss";

const cx = classNames.bind(styles);

export default function Card({ data }: { data: Product }) {
  const { id, images, price, name, favoriteCount } = data;
  const [imageSrc, setImageSrc] = useState(images[0]);

  const handleImageError = () => {
    setImageSrc(noImage);
  };

  return (
    <Link to={`/product/${id}`} className={cx("card")}>
      <img
        src={imageSrc}
        alt="thumbnail"
        className={cx("thumbnail")}
        onError={handleImageError}
      />
      <h1>{name}</h1>
      <span className={cx("price")}>{price.toLocaleString()}원</span>
      <div className={cx("favorite-count")}>
        <img src={heartIcon} alt="heart-icon" />
        <span>{favoriteCount}</span>
      </div>
    </Link>
  );
}

function Skeleton() {
  return (
    <div className={cx("card-skeleton")}>
      <div className={cx("thumbnail")} />
      <div className={cx("title")} />
      <div className={cx("price")} />
      <div className={cx("favorite-count")} />
    </div>
  );
}

Card.Skeleton = Skeleton;
