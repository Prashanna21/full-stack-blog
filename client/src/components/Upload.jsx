import { IKContext, IKUpload } from "imagekitio-react";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

function Upload({ children, type, setData, setLoading }) {
  const imageKitUploadRef = useRef(null);
  const uploadToastId = useRef(null);
  const onError = (error) => {
    toast.error("Error while uploading your file. Try again");
    console.log(error);
  };

  const onSuccess = (res) => {
    setLoading(false);
    toast.done(uploadToastId.current);
    setData(res);
    toast.success("Your file has been uploaded", {
      hideProgressBar: true,
    });
  };

  const onProgress = (res) => {
    setLoading(true);

    let progress = res.loaded / res.total;
    if (!uploadToastId.current) {
      uploadToastId.current = toast.info("Uploading file...", {
        progress: progress,
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      });
    } else {
      toast.update(uploadToastId.current, {
        progress: progress,
      });
    }
  };

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        useUniqueFileName
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onProgress}
        accept={`${type}/*`}
        ref={imageKitUploadRef}
      />
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          imageKitUploadRef.current.click();
        }}
      >
        {children}
      </div>
    </IKContext>
  );
}

export default Upload;
