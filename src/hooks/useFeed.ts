import { useState, useEffect } from "react";
import { Post } from "../types";
import { MOCK_POSTS } from "../utils/feedData";

export function useFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPosts(MOCK_POSTS);
  }, []);

  function toggleLikeLocal(postId: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );
  }

  function addPost(novoPost: {
    username: string;
    style: string;
    description: string;
    imageUri: string;
  }) {
    const post: Post = {
      id: Date.now().toString(),
      username: novoPost.username,
      style: novoPost.style,
      description: novoPost.description,
      imageUri: novoPost.imageUri,
      likes: 0,
      reactions: [],
      liked: false,
      timestamp: "agora",
    };

    setPosts((prev) => [post, ...prev]);
  }

  return {
    posts,
    loading,
    toggleLikeLocal,
    addPost,
    reload: () => {},
  };
}
