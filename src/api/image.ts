import type { UploadImageResponse } from "@panda-market-api";

import httpClient from ".";

export async function uploadImage(imageFile: File) {
  try {
    const url = `/images/upload`;
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await httpClient.post<UploadImageResponse>(url, {
      body: formData,
    });

    return response;
  } catch (error) {
    console.error("uploadImage 함수에서 오류 발생:", error);
    throw error;
  }
}
