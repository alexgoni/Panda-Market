/* eslint-disable no-bitwise */
import classNames from "classnames/bind";
import { useMemo } from "react";

import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

interface Props {
  name: string;
  image?: string | null;
  size?: "sm" | "md";
}

export default function Profile({ name, image, size = "md" }: Props) {
  const classnames = cx("profile", { sm: size === "sm", md: size === "md" });

  const bgColor = useMemo(() => stringToColor(name), [name]);

  return (
    <div
      className={classnames}
      style={{ backgroundColor: !image ? bgColor : undefined }}
    >
      {image ? <img src={image} alt="profile" /> : name[0]}
    </div>
  );
}

function stringToColor(str: string): string {
  let hash = 0;

  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  const BRIGHTNESS_LIMIT = 180;

  for (let i = 0; i < 3; i += 1) {
    let value = (hash >> (i * 8)) & 0xff;

    value = Math.min(value, BRIGHTNESS_LIMIT);

    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}
