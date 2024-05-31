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
          <Link href={"/"}>{title}</Link>
        </h2>
      </div>
      
      <div className="max-w-none ">{description}</div>
      <div className="flex justify-between items-center">
        <dl className=" pt-2">
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
          
          <div className="flex gap-3 pt-1">
        {tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
        </dl>
        <Link 
          href={"/" + slug}
          className={cn(buttonVariants(), "py-0")}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
