import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

export const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-3">
    <span className={cn("h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]")} />
    <span className={cn("h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]")} />
    <span className={cn("h-2 w-2 animate-bounce rounded-full bg-muted-foreground")} />
  </div>
);

export const ThinkingIndicator = () => (
    <div className="flex items-start gap-3 justify-start"><Bot className="h-6 w-6 text-primary flex-shrink-0" /><div className="p-1 rounded-lg bg-background border"><TypingIndicator /></div></div>
);