import { Post } from "../api/post";

interface Props {
  posts: Post[];
}

export function Posts({ posts }: Props) {
  return (
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
