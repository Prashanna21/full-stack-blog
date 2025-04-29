import React, { useEffect, useRef } from "react";
import SingleComment from "./SingleComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";
const fetchComment = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comment/${postId}`
  );
  return res.data;
};

function Comments({ postId }) {
  const queryClient = useQueryClient();
  const inputRef = useRef(null);
  const { getToken } = useAuth();
  const { user } = useUser();

  const addCommentMutation = useMutation({
    mutationFn: async (newComment) => {
      toast("Your Comment is being posted", {
        autoClose: 2000,
      });
      const token = await getToken({ forceRefresh: true });
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comment/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSettled: (res) => {
      toast.success("Your Comment Has been created");
      console.log(res);
      queryClient.invalidateQueries(["fetchComment", postId]);
    },

    onError: (res) => {
      console.log(res);
      toast.error("Post failed to be created");
    },
  });

  const handleSendComment = () => {
    if (inputRef.current.value === "") {
      return "can't be empty";
    }
    const commentBody = { desc: inputRef.current.value };
    addCommentMutation.mutate(commentBody);
    inputRef.current.value = "";
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["fetchComment", postId],
    queryFn: () => fetchComment(postId),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col gap-4 w-full lg:w-4/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <div className="flex items-center justify-between gap-8 w-full ">
        <input
          ref={inputRef}
          placeholder="Write a comment"
          className="w-full rounded-xl p-4 focus:outline-none"
        />
        <button
          onClick={handleSendComment}
          className={`bg-blue-800 px-4 py-3 ${
            addCommentMutation.isPending ? "disabled" : ""
          } text-white font-medium rounded-xl `}
        >
          {addCommentMutation.isPending ? "Sending...." : "Send"}
        </button>
      </div>
      {data?.map((comment) => {
        return (
          <SingleComment
            key={comment._id}
            commentData={comment}
            userId={user?.id}
          />
        );
      })}
    </div>
  );
}

export default Comments;
