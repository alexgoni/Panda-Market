import Footer from "components/Layout/Footer";
import MainLayout from "components/Layout/MainLayout";
import Navbar from "components/Layout/Navbar";

import EditorForm from "../components/EditorForm";

export default function AddItemPage() {
  return (
    <>
      <Navbar />
      <MainLayout>
        <EditorForm />
      </MainLayout>
      <Footer />
    </>
  );
}
