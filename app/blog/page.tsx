import React from 'react';
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogLayout from "@/layouts/BlogLayout";
import { getAllTags, sortPosts, sortTagsByCount } from "@/utils/utils";
import { Metadata } from "next";
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
export const metadata: Metadata = {
  title: "My blog",
  description: "This is a description",
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);
  return (
    <BlogLayout>
<div className="max-w-7xl bg-grid-small-black/[0.1] py-6 lg:py-10 mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
      <h1 className="font-black text-4xl lg:text-5xl">Blog</h1>
    </div>
        <br />
        <div>
          <Card className="hidden sm:block col-span-12 sm:col-span-4 sm:col-start-9 sm:row-start-1 h-fit">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {sortedTags.map(tag => (
                <Tag key={tag} tag={tag} count={tags[tag]} />
              ))}
            </CardContent>

          </Card>

        </div>
        <div className="grid grid-cols-12 gap-3 mt-8">
          <div className="col-span-12 sm:col-span-9 mt-3">
            <Card className="sm:hidden block col-span-12 sm:col-span-4 sm:col-start-9 sm:row-start-1 h-fit">
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {sortedTags.map(tag => (
                  <Tag key={tag} tag={tag} count={tags[tag]} />
                ))}
              </CardContent>

            </Card>
            <hr />

            {displayPosts.length > 0 ? (
              <ul className="flex flex-col mt-2">
{displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                    />
                  </li>
                );
              })}
              </ul>
            ) : (
              <p>Nothing to see here yet</p>
            )}
            <QueryPagination totalPages={totalPages} className="justify-end mt-4" />
          </div>
          <div className="order-first sm:order-none col-span-12 sm:col-span-3 flex flex-col items-center">
            <Image
              src="https://cdn.mos.cms.futurecdn.net/EzgdmaCQuT84bgDL4fhXZS.jpg"
              alt="Jordans"
              height={400}
              width={400}
              className="object-contain"
            />
            <p className="text-base sm:text-xl text-center text-black mt-4 mb-2 dark:text-neutral-200">
              My Software Development Blog
            </p>
            <p className="text-sm text-center text-neutral-600 dark:text-neutral-400">
              This blog serves as my platform to learn and explain coding and web development concepts.
            </p>

            <div className="flex justify-center w-full pt-2">
              <Button asChild className="bg-lightblue dark:bg-darkblue">
                <Link href="/">Check out my Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </BlogLayout>
  );
}
