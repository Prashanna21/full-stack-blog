import React from "react";
import PostListItem from "./PostListItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios, { all } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam = 1, searchParams) => {
  console.log(Object.fromEntries([...searchParams]));
  const searchParamsObj = Object.fromEntries([...searchParams]);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, ...searchParamsObj },
  });
  return res;
};

function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", Object.fromEntries([...searchParams])],
    queryFn: ({ pageParam }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.hasMore ? pages.length + 1 : undefined;
    },
  });
  const allPosts = data?.pages?.flatMap((page) => page.data.posts) || [];

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;
  return (
    <InfiniteScroll
      dataLength={allPosts.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more post...</h4>}
      endMessage={
        <p>
          <b>All Post Loaded</b>
        </p>
      }
    >
      {allPosts?.map((post, index) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
}

export default PostList;
