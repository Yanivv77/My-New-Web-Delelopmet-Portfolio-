import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Tag } from "./tag";
import { formatDate } from "@/utils/utils";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
}: PostItemProps) {
  return (
<article className="flex flex-col gap-2 border-border border-b py-3">
  <div>
    <h2 className="text-2xl font-bold">
      <Link href={"/" + slug}>{title}</Link>
    </h2>
  </div>
  <div className="max-w-none ">{description}</div>
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
    <dl className=" pt-2">
      <dt className="sr-only">Published On</dt>
      <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        <time dateTime={date}>{formatDate(date)}</time>
      </dd>
    </dl>
    <div className="flex flex-wrap gap-3 pt-1">
      {tags?.map((tag) => (
        <Tag tag={tag} key={tag} />
      ))}
    </div>
    <Link 
      href={"/" + slug}
      className={cn(buttonVariants(), "py-0 mt-2 sm:mt-0", "text-sm sm:text-base")}
    >
      Read more →
    </Link>
  </div>
</article>
  );
}
