/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sparkles, Loader2, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import Markdown from "react-markdown";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChefAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I am your AI Chef Assistant. Want a recommendation from our menu or a tip on how to pair our artisanal ingredients? Just ask!" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const customApiKey = localStorage.getItem("manual_gemini_api_key");
      
      const response = await fetch("/api/chef-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage,
          customApiKey: customApiKey || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI response");
      }

      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (error: any) {
      console.error(error);
      toast.error("AI Error", {
        description: error.message || "Something went wrong with the AI assistant.",
      });
      // Optionally remove the last user message or add an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-20 bg-muted/20 border-y">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 bg-yellow-500/10 text-yellow-700 border-yellow-200">AI Powered</Badge>
          <h2 className="text-4xl font-serif font-bold mb-4">Meet Your Personal Chef</h2>
          <p className="text-muted-foreground">Get instant wine pairings, ingredient insights, or custom meal suggestions.</p>
        </div>

        <Card className="border-none shadow-xl bg-white overflow-hidden">
          <CardHeader className="bg-black text-white py-4 px-6 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <div>
                <CardTitle className="text-lg font-serif">Chef Assistant</CardTitle>
                <CardDescription className="text-white/60 text-xs">Always ready to inspire</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] p-6">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div 
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        msg.role === "user" 
                          ? "bg-black text-white rounded-tr-none" 
                          : "bg-muted text-foreground rounded-tl-none border"
                      }`}
                    >
                      <div className="text-sm prose prose-sm dark:prose-invert">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-none border flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="text-xs text-muted-foreground italic">Chef is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t bg-muted/30">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Ask for a wine pairing with the Wagyu Burger..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 rounded-none border-black/10 focus:border-black"
              />
              <Button onClick={sendMessage} disabled={loading} size="icon" className="rounded-none bg-black">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

// Minimal Badge for local component use
function Badge({ children, variant, className }: any) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${className}`}>
      {children}
    </span>
  );
}
