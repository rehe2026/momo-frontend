"use client";

import { Loader2 } from "lucide-react";

interface TransitionScreenProps {
  message: string;
}

export default function TransitionScreen({ message }: TransitionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="relative mb-6">
        <div className="w-12 h-12 bg-momo-100 rounded-2xl flex items-center justify-center">
          <span className="font-display text-lg text-momo-600">M</span>
        </div>
        <Loader2 className="absolute -top-1 -right-1 w-5 h-5 text-momo-400 animate-spin" />
      </div>
      <p className="text-gray-500 text-center text-sm">{message}</p>
      <div className="flex gap-1.5 mt-4">
        <div className="w-2 h-2 bg-momo-300 rounded-full typing-dot" />
        <div className="w-2 h-2 bg-momo-300 rounded-full typing-dot" />
        <div className="w-2 h-2 bg-momo-300 rounded-full typing-dot" />
      </div>
    </div>
  );
}
