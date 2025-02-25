'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRight, Copy, Check, Link } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UrlShortener() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) return;
    
    // Basic URL validation
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL including http:// or https://');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to shorten URL');
      }
      
      setShortenedUrl(data.shortUrl);
    } catch (err) {
      console.error('URL shortening error:', err);
      setError(`Failed to shorten URL: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };
  
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="py-16" id="url-shortener">
      <h2 className="heading text-white mb-8 text-center">
        <span className="text-purple">URL</span> Shortener
      </h2>
          
      <div className="transition-all duration-300">
        <Card className="w-full max-w-3xl mx-auto backdrop-blur-sm bg-opacity-90 border-zinc-700/50 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center">
              URL Shortener
            </CardTitle>
            <CardDescription className="text-center text-zinc-400">
              Create short, shareable links from long URLs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="relative">
                <Input
                  type="url"
                  placeholder="Enter long URL (e.g., https://example.com/very/long/path)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="transition-all duration-200 focus:border-purple-500 focus:ring-purple-500/20 p-4"
                />
                {url && (
                  <div className="absolute top-2 right-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setUrl('')}
                      className="h-6 w-6 rounded-full p-0 text-zinc-400 hover:text-zinc-100"
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleShorten} 
                disabled={isLoading || !url.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Shortening...
                  </>
                ) : (
                  <>
                    Shorten URL
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              
              {error && (
                <div className="text-red-500 text-sm p-3 bg-red-500/10 rounded-md border border-red-500/20 transition-opacity duration-300">
                  {error}
                </div>
              )}
              
              {shortenedUrl && (
                <div className="mt-2 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-zinc-200">Shortened URL:</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="flex items-center gap-1 border-zinc-700 hover:bg-zinc-800"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-md border border-zinc-700/50 transition-all duration-200 flex items-center gap-2">
                    <Link className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <a 
                      href={shortenedUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors truncate"
                    >
                      {shortenedUrl}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 