import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "api/product";
import Footer from "components/Layout/Footer";
import MainLayout from "components/Layout/MainLayout";
import Navbar from "components/Layout/Navbar";
import { useUserContext } from "context/user";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EditorForm from "../components/EditorForm";
import type { FormValue } from "../type";

export default function EditItemPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { userInfo } = useUserContext();

  const { data, isLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => {
      if (!params.id) return null;
      return getProductDetail(Number(params.id));
    },
  });

  useEffect(() => {
    if (data?.ownerId !== userInfo?.id) navigate("/market");
  }, [data]);

  if (isLoading) return null;

  let initialValue: FormValue | undefined;
  if (data) {
    initialValue = {
      image: data.images[0],
      description: data.description,
      name: data.name,
      price: data.price,
      tags: data.tags,
    };
  }

  return (
    <>
      <Navbar />
      <MainLayout>
        <EditorForm initialValue={initialValue} />
      </MainLayout>
      <Footer />
    </>
  );
}
