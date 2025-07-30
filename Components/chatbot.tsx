'use client';
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Send } from "lucide-react";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {

    if(!input){
      setError("Input required")
      return ;
      
    }
    const res = await fetch("/api/ask-agent", {
      method: "POST",
      body: JSON.stringify({ question: input }),
    });
    const data = await res.json();
    setMessages([...messages, `You: ${input}`, `AI: ${data.answer}`]);
    setInput("");
  };

  return (
    <Card className="p-6 max-w-xl mx-auto ">
       
       <CardTitle className="text-2xl font-bold mb-1"> Chat with AI</CardTitle>
       <CardDescription className="text-sm text-gray-500 mb-2">
        Ask about your order status by providing the order ID.
        </CardDescription>
      <div className="space-y-2">
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <Input
        className="border p-2 mt-4 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <span className="text-sm text-red-400">{error}</span>
      <Button className="bg-primary text-white p-2 mt-2" onClick={sendMessage}>
       <Send className="w-8 h-8"/> Send
      </Button>
    </Card>
  );
}
