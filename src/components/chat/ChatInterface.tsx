
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "system";
  timestamp: Date;
}

interface ChatInterfaceProps {
  title?: string;
  supportName?: string;
  className?: string;
}

export function ChatInterface({ 
  title = "Brew Support Chat",
  supportName = "BrewMaster AI",
  className 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you with your brewing today?",
      sender: "system",
      timestamp: new Date()
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate system response
    setTimeout(() => {
      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've received your message. Our brewing specialist will get back to you shortly.",
        sender: "system",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, systemMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={cn("flex flex-col h-[500px] shadow-lg", className)}>
      <CardHeader className="border-b bg-muted/50 px-4 py-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={cn(
                "flex items-start gap-3 max-w-[80%]",
                message.sender === "user" ? "ml-auto" : "mr-auto"
              )}
            >
              {message.sender === "system" && (
                <Avatar className="h-8 w-8 bg-primary">
                  <MessageSquare className="h-5 w-5 text-primary-foreground" />
                </Avatar>
              )}
              
              <div 
                className={cn(
                  "rounded-lg p-3",
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {message.sender === "user" && (
                <Avatar className="h-8 w-8 bg-muted">
                  <User className="h-5 w-5" />
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <CardFooter className="border-t p-3">
        <div className="flex items-center w-full gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            type="submit"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
