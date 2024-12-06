import plusIcon from "assets/icons/ic_plus.svg";
import classNames from "classnames/bind";
import { useFormContext } from "components/Form";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import styles from "./ImageUploader.module.scss";
import PreviewImage from "./PreviewImage";

const cx = classNames.bind(styles);

interface Props {
  id?: string;
  name: string;
  defaultValue?: string;
  onChange: (file: File | null) => void;
  required: boolean;
}

export default function ImageUploader({
  id,
  name,
  defaultValue,
  onChange,
  required,
}: Props) {
  const [preview, setPreview] = useState(defaultValue ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleValidationState } = useFormContext();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    onChange(file);

    const nextPreview = URL.createObjectURL(file);
    setPreview(nextPreview);
  };

  const handleDelete = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(null);
    setPreview("");
  };

  useEffect(() => {
    if (!preview) return undefined;

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (!required) return;

    if (preview) handleValidationState({ [name]: true });
    else handleValidationState({ [name]: false });
  }, [preview, required]);

  return (
    <div className={cx("image-uploader-container")}>
      <button
        type="button"
        className={cx("input-wrapper")}
        onClick={handleClick}
        aria-label="image-uploader"
      >
        <div className={cx("inner")}>
          <input
            id={id}
            name={name}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            ref={inputRef}
          />
          <img src={plusIcon} alt="plus-icon" />
          <h1>이미지 등록</h1>
        </div>
      </button>
      {preview && <PreviewImage data={preview} onDelete={handleDelete} />}
    </div>
  );
}
