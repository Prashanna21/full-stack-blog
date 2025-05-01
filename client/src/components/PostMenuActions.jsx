import { useUser, useAuth } from "@clerk/clerk-react";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

const getSaved = async (getToken, isLoaded) => {
  console.log(isLoaded);
  const token = await getToken();
  console.log(token);
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/users/savedposts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

function PostMenuActions({ post }) {
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const isAdmin = user?.publicMetadata?.role === "admin";
  console.log(isAdmin);
  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["isSaved"],
    queryFn: () => getSaved(getToken, isLoaded),
    enabled: isLoaded,
  });
  const isSaved = savedPosts?.includes(post._id);

  const saveorUnsavePostMutation = useMutation({
    mutationFn: async (postId) => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/savepost`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onError: (res) => {
      toast.error("Post failed to be created");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isSaved"] });
      navigator("/");
    },
  });

  const featurePostOrUnFeaturePost = useMutation({
    mutationFn: async (postId) => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onError: (res) => {
      toast.error("Post failed to be featured");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postData"] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId) => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  return (
    <div className="">
      <h1 className="mt-8 mb-2 text-sm font-medium">Actions</h1>
      <div
        className="flex items-center gap-2 py-2 text-sm cursor-pointer"
        onClick={() => saveorUnsavePostMutation.mutate(post._id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="20px"
          height="20px"
        >
          <path
            d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
            stroke="black"
            fill={isSaved ? "black" : "none"}
            strokeWidth="2"
          />
        </svg>
        <span>{isPending ? "Is pending..." : "Save this post"}</span>
      </div>

      {(user?.id === post.user?.clerkId || isAdmin) && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={() => {
            deletePostMutation.mutate(post._id);
          }}
        >
          <svg
            height="20px"
            width="20px"
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 408.483 408.483"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316 H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293 c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329 c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355 c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356 c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"></path>{" "}
                  <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916 c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
          <span>Delete this post</span>
        </div>
      )}

      {(user?.id === post.user?.clerkId || isAdmin) && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={() => {
            featurePostOrUnFeaturePost.mutate(post._id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="black"
              fill={post.isFeatured ? "black" : "none"}
              strokeWidth="2"
            />
          </svg>

          <span>Feature This Post</span>
        </div>
      )}
    </div>
  );
}

export default PostMenuActions;
