import React, { useEffect, useRef, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

function WritePage() {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [quillValue, setQuillValue] = useState("");
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cover, setCover] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  useEffect(() => {
    image &&
      setQuillValue((prev) => prev + `<p><image src = ${image.url}> </p>`);
  }, [image]);

  useEffect(() => {
    console.log(loading);
    video &&
      setQuillValue(
        (prev) => prev + `<p> <iframe class="ql-video" src=${video.url} /> </p>`
      );
    setLoading(false);
  }, [video]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      toast("Your Post is being created", {
        autoClose: 2000,
      });
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onSuccess: (res) => {
      toast.success("Your Post Has been created");
      navigator(`/post/${res.data.slug}`);
    },

    onError: (res) => {
      toast.error("Post failed to be created");
    },
  });

  if (!isLoaded) {
    return <div className="">Loading....</div>;
  }
  if (!isSignedIn) {
    return <div className="">You should login</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: quillValue,
      image: cover.filePath,
    };

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a new post</h1>
      <form className="flex flex-col gap-6 h-full mb-6" onSubmit={handleSubmit}>
        <Upload type="image" setLoading={setLoading} setData={setCover}>
          <button className="p-2 shadow-md rounded-xl text-sm w-max text-gray-500 bg-white">
            Add a cover Images
          </button>
        </Upload>
        <input
          type="text"
          placeholder="My Awesome Story"
          className="text-4xl font-semibold bg-transparent outline-none focus:outline-none"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label className="text-sm">Choose a catagory: </label>
          <select className="p-2 rounded-xl bg-white shadow-md" name="category">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="databases">Databases</option>
            <option value="marketing">Marketing</option>
            <option value="seo">Search Engine</option>
            <option value="development">Development</option>
          </select>
        </div>
        <input
          name="desc"
          className="p-4 rounded-xl bg-white shadow-md"
          placeholder="A short description"
        />

        <div className="flex w-full flex-1">
          <div className="flex  flex-col gap-2 mr-4">
            <Upload type="image" setLoading={setLoading} setData={setImage}>
              <button className="p-2 shadow-md rounded-xl text-sm w-max text-gray-500 bg-white">
                🖼️
              </button>
            </Upload>
            <Upload type="video" setLoading={setLoading} setData={setVideo}>
              📹
            </Upload>
          </div>
          <div className="w-full">
            <ReactQuill
              value={quillValue}
              onChange={setQuillValue}
              theme="snow"
              className="h-full rounded-xl bg-white shadow-md"
            />
          </div>
        </div>

        <p>{mutation.isError ? mutation.error.message : ""}</p>
        <button
          disabled={mutation.isPending}
          className="bg-blue-800 text-white font-medium rounded-xl disabled:bg-blue-400 disabled:cursor-not-allowed w-36 mt-2 p-2"
        >
          {mutation.isPending || loading ? "Loading" : "Send"}
        </button>
      </form>
    </div>
  );
}

export default WritePage;
