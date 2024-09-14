/* eslint-disable react/jsx-no-useless-fragment */
import hotItemSectionImage from "assets/images/landing/hot_item.png";
import registerSectionImage from "assets/images/landing/register.png";
import searchSectionImage from "assets/images/landing/search.png";
import classNames from "classnames/bind";

import styles from "../Landing.module.scss";

const cx = classNames.bind(styles);

const HOT_ITEM_CONTENT = {
  img: hotItemSectionImage,
  badge: "Hot item",
  title: (
    <>
      <span>인기 상품을 </span>
      <span>확인해보세요</span>
    </>
  ),
  description: (
    <>
      가장 HOT한 중고거래 물품을
      <br />
      판다마켓에서 확인해 보세요
    </>
  ),
};

const SEARCH_CONTENT = {
  img: searchSectionImage,
  badge: "Search",
  title: (
    <>
      <span>구매를 원하는 </span>
      <span>상품을 검색하세요</span>
    </>
  ),
  description: (
    <>
      구매하고 싶은 물품은 검색해서
      <br />
      쉽게 찾아보세요
    </>
  ),
};

const REGISTER_CONTENT = {
  img: registerSectionImage,
  badge: "Register",
  title: (
    <>
      <span>판매를 원하는 </span>
      <span>상품을 등록하세요</span>
    </>
  ),
  description: (
    <>
      어떤 물건이든 판매하고 싶은 상품을
      <br />
      쉽게 등록하세요
    </>
  ),
};

export function Section({
  type,
  direction = "left",
}: {
  type: "hot-item" | "search" | "register";
  direction?: "left" | "right";
}) {
  let content = { img: "", badge: "", title: <></>, description: <></> };

  if (type === "hot-item") content = HOT_ITEM_CONTENT;
  if (type === "search") content = SEARCH_CONTENT;
  if (type === "register") content = REGISTER_CONTENT;

  const scriptClassnames = cx("script", {
    left: direction === "left",
    right: direction === "right",
  });

  return (
    <div className={cx("section-container")}>
      <img src={content.img} alt="content" />

      <div className={scriptClassnames}>
        <span className={cx("badge")}>{content.badge}</span>
        <h1 className={cx("title")}>{content.title}</h1>
        <p className={cx("description")}>{content.description}</p>
      </div>
    </div>
  );
}
