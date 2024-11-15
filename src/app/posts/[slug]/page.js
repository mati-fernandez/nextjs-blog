import { getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

async function fetchPosts(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await fetchPosts(slug);

  if (!post) notFound();

  const htmlConoverter = md.render(post.content);

  return (
    <article>
      <h1>{post.title}</h1>
      <p className="post-meta">{post.date}</p>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: htmlConoverter }}
      />
    </article>
  );
}
