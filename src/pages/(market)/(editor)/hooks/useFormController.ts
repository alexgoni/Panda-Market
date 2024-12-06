import { PostProductRequest } from "@panda-market-api";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "api/image";
import { postProduct, updateProduct } from "api/product";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { FormValue } from "../type";

export default function useFormController(initialValue?: FormValue) {
  const navigate = useNavigate();
  const params = useParams();
  const [formValue, setFormValue] = useState<FormValue>(
    initialValue ?? {
      image: null,
      name: "",
      description: "",
      price: 0,
      tags: [],
    },
  );

  const mutation = useMutation({
    mutationFn: async () => {
      if (!formValue.image) return null;

      let imageStr;
      if (typeof formValue.image === "string") imageStr = formValue.image;
      else {
        const imageRes = await uploadImage(formValue.image);
        imageStr = imageRes.url;
      }

      const body: PostProductRequest = {
        images: [imageStr],
        description: formValue.description,
        name: formValue.name,
        price: formValue.price,
        tags: formValue.tags,
      };

      return !initialValue
        ? postProduct(body)
        : updateProduct({ productId: Number(params.id), formValue: body });
    },
    onSuccess: () => {
      navigate("/market");
    },
  });

  // ImageUploader
  const handleImageChange = (file: File | null) => {
    const name = "image";

    setFormValue((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // Input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Textarea
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Tag
  const handleTagKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = "tags";

    setFormValue((prev) => ({
      ...prev,
      [name]: [...prev.tags, e.currentTarget.value],
    }));
  };

  const handleTagDelete = (target: string) => {
    const name = "tags";

    setFormValue((prev) => ({
      ...prev,
      [name]: prev[name].filter((tag: string) => tag !== target),
    }));
  };

  // Form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleFormKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;

    if (e.key === "Enter" && target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };

  return {
    formValue,
    mutation,
    handleImageChange,
    handleInputChange,
    handleTextareaChange,
    handleTagDelete,
    handleTagKeyUp,
    handleSubmit,
    handleFormKeyDown,
  };
}
