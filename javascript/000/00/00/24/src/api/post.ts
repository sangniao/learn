export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}
