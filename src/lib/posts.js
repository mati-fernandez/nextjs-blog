import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'src/posts');
// console.log(postsDir);

export const getAllPosts = () => {
  const fileNames = fs.readdirSync(postsDir);
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join(postsDir, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { content, data } = matter(fileContent);

    return {
      slug,
      content,
      ...data,
    };
  });
};
