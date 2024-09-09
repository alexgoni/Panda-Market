import classNames from "classnames/bind";
import { useFormContext } from "components/Form";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

import styles from "../Input.module.scss";
import { TagInputProps } from "../type";
import TagList from "./TagList";

const cx = classNames.bind(styles);

type Props = Omit<TagInputProps, "type">;

export default function TagInput(props: Props) {
  const {
    value: tagList,
    required,
    name,
    onKeyUp,
    onDelete: handleDelete,
    ...rest
  } = props;
  const [currentValue, setCurrentValue] = useState("");
  const { handleValidationState } = useFormContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || e.currentTarget.value.trim() === "") return;
    if (tagList.includes(currentValue)) {
      // eslint-disable-next-line no-alert
      alert("같은 태그가 있습니다.");
      return;
    }

    onKeyUp(e);
    setCurrentValue("");
  };

  useEffect(() => {
    if (!required) return;

    if (tagList.length > 0) handleValidationState({ [name]: true });
    else handleValidationState({ [name]: false });
  }, [tagList, required]);

  return (
    <>
      <input
        {...rest}
        type="text"
        required={required}
        name={name}
        value={currentValue}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        className={cx("input")}
      />
      {tagList && <TagList data={tagList} onDelete={handleDelete} />}
    </>
  );
}
