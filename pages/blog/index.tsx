import BlogLayout from '@/layouts/BlogLayout';
import React from 'react';

const BlogMainPage: React.FC = () => {
  return (
    <BlogLayout>
      <h1>Welcome to My Blog</h1>
      <p>Check out my latest posts here.</p>
    </BlogLayout>
  );
};

export default BlogMainPage;