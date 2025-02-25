import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { urlMap } from '@/lib/redis';

export default async function ShortUrlRedirect({ params }: { params: { code: string } }) {
  const { code } = params;
  const originalUrl = await urlMap.get(code);
  
  if (!originalUrl) {
    notFound();
  }
  
  redirect(originalUrl as string);
} 