import { PostProductRequest } from "@panda-market-api";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "api/image";
import { postProduct } from "api/product";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormValue {
  image: File | null;
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export default function useFormController() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState<FormValue>({
    image: null,
    name: "",
    description: "",
    price: 0,
    tags: [],
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!formValue.image) return null;
      const imageRes = await uploadImage(formValue.image);
      const body: PostProductRequest = {
        images: [imageRes.url],
        description: formValue.description,
        name: formValue.name,
        price: formValue.price,
        tags: formValue.tags,
      };
      return postProduct(body);
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
