'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Volume2, ArrowRight, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: 'he', name: 'Hebrew', rtl: true },
  { code: 'ru', name: 'Russian', rtl: false },
  { code: 'pl', name: 'Polish', rtl: false },
  { code: 'en', name: 'English', rtl: false },
];

export default function Translator() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('he');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isRTL, setIsRTL] = useState(true);
  const [inputRTL, setInputRTL] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    setSpeechSupported('speechSynthesis' in window);
  }, []);
  
  // Update RTL state when target language changes
  useEffect(() => {
    const selectedLang = languages.find(lang => lang.code === targetLanguage);
    setIsRTL(selectedLang?.rtl || false);
  }, [targetLanguage]);
  
  // Detect if input text is RTL
  useEffect(() => {
    const rtlRegex = /[\u0590-\u05FF\u0600-\u06FF]/;
    setInputRTL(rtlRegex.test(text));
  }, [text]);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          target: targetLanguage,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Translation failed');
      }
      
      const data = await response.json();
      setTranslatedText(data.data.translations[0].translatedText);
    } catch (err) {
      console.error('Translation error:', err);
      setError('Failed to translate text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (textToSpeak: string) => {
    if (!speechSupported) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    switch(targetLanguage) {
      case 'he':
        utterance.lang = 'he-IL';
        break;
      case 'ru':
        utterance.lang = 'ru-RU';
        break;
      case 'pl':
        utterance.lang = 'pl-PL';
        break;
      case 'en':
        utterance.lang = 'en-US';
        break;
      default:
        utterance.lang = 'en-US';
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      setError('Speech synthesis failed');
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="py-16" id="translator">
      <h2 className="heading text-white mb-8 text-center">
        <span className="text-purple">Translation</span> Tool
      </h2>
          
      <div className="transition-all duration-300">
        <Card className="w-full max-w-3xl mx-auto backdrop-blur-sm bg-opacity-90 border-zinc-700/50 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center ">
              Google API Translator
            </CardTitle>
            <CardDescription className="text-center text-zinc-400">
              Translate text between multiple languages with text-to-speech support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="relative">
                <Textarea
                  placeholder="Enter text to translate..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={cn(
                    "min-h-[120px] transition-all duration-200 focus:border-purple-500 focus:ring-purple-500/20 resize-none p-4",
                    inputRTL && "text-right"
                  )}
                  dir={inputRTL ? "rtl" : "ltr"}
                />
                {text && (
                  <div className="absolute top-2 right-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setText('')}
                      className="h-6 w-6 rounded-full p-0 text-zinc-400 hover:text-zinc-100"
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleTranslate} 
                  disabled={isLoading || !text.trim()}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      Translate
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm p-3 bg-red-500/10 rounded-md border border-red-500/20 transition-opacity duration-300">
                  {error}
                </div>
              )}
              
              {translatedText && (
                <div className="mt-2 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-zinc-200">Translation:</h3>
                    <div className="flex gap-2">
                      {speechSupported && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => speakText(translatedText)}
                          disabled={isSpeaking}
                          className="flex items-center gap-1 border-zinc-700 hover:bg-zinc-800"
                        >
                          <Volume2 className="h-4 w-4" />
                          {isSpeaking ? 'Speaking...' : 'Speak'}
                        </Button>
                      )}
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
                  </div>
                  <div 
                    className={cn(
                      "p-4 bg-zinc-800/50 rounded-md border border-zinc-700/50 transition-all duration-200", 
                      isRTL && "text-right"
                    )}
                    dir={isRTL ? "rtl" : "ltr"}
                  >
                    {translatedText}
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