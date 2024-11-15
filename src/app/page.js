import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <h2>Matias Fernandez Blog</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.date}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            <p>{post.date}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
