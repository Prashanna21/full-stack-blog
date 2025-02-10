import React from "react";
import Image from "./Image";
import { format } from "timeago.js";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function SingleComment({ commentData, userId }) {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const deleteCommentMuation = useMutation({
    mutationFn: async (commentId) => {
      const token = await getToken({ forceRefresh: true });

      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      toast.success("Your Comment Has been deleted");
      queryClient.invalidateQueries(["fetchComment"]);
    },

    onError: (res) => {
      console.log(res);
      toast.error("Comment failed to be deleted");
    },
  });
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4" w="40">
        {commentData.user.image ? (
          <img
            src={commentData.user.image}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <Image
            path={"userImg.jpeg"}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <span className="font-medium">{commentData.user.username}</span>
        <span className="text-sm text-gray-500">
          {format(commentData.createdAt)}
        </span>
        {userId === commentData.user.clerkId ? (
          <div
            className="flex ml-auto text-[14px] cursor-pointer text-white font-bold justify-center rounded-full px-2 py-2 items-center bg-red-500"
            onClick={() => deleteCommentMuation.mutate(commentData._id)}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
            <span>Delete Comment</span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-4">
        <p>{commentData.desc}</p>
      </div>
    </div>
  );
}

export default SingleComment;
