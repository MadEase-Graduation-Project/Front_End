import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChatbotLoading,
  selectChatbotMessage,
  selectChatbotSession,
} from "@/store/selectors/chatbotSelectors";
import { sendChatBotMsg } from "@/store/slices/chatbotSlice";

export default function Chatbot() {
  const dispatch = useDispatch();
  // states-------------------------
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null); // Add input ref
  // --------------------------

  // selectors -------------------------------
  // const userName = useSelector(selectMyDetails).name || null;
  // console.log(userName);
  // ------
  const sessionDetails = useSelector(selectChatbotSession);
  const session_id = sessionDetails.session_id;
  const firstChatMsg = sessionDetails.prompt;
  const firstState = sessionDetails.state;
  console.log(sessionDetails);
  // -----
  const msg = useSelector(selectChatbotMessage);
  const botMsg = msg.prompt;
  const replayOptions = msg.options;
  const state = msg.state;
  const loading = useSelector(selectChatbotLoading);
  console.log(msg);
  // --------------------------------------------

  // Auto-scroll to bottom when new messages arrive ----------
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        // Add a small delay to ensure content is rendered
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight + 100;
        }, 50);
      }
    }
  }, [messages, isTyping, dispatch]);
  //-----------------------------------------------------

  // Update isTyping based on loading
  useEffect(() => {
    setIsTyping(loading);
  }, [loading]);

  // Replace simulateResponse with actual API call
  const simulateResponse = async (userMessage) => {
    dispatch(
      sendChatBotMsg({
        session_id: session_id,
        user_input: userMessage,
      })
    );
    // isTyping is handled by loading effect above
    // Add bot message to messages when loading is false (response received)
    // This effect will run when botMsg changes
  };

  // Add bot message to messages when botMsg changes (after API response)
  useEffect(() => {
    if (!loading && (botMsg || firstChatMsg)) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-assistant",
          role: "assistant",
          content: botMsg ?? firstChatMsg ?? "again",
          timestamp: new Date(),
        },
      ]);
    }
  }, [botMsg, firstChatMsg, loading]);

  // Focus input after bot responds (when messages change and last message is from assistant)
  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].role === "assistant" &&
      inputRef.current
    ) {
      inputRef.current.focus();
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Call your API here instead of simulateResponse
    await simulateResponse(input.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    // Chat Interface (existing chat UI)
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 text-white shadow-2xl">
          <Sparkles className="h-10 w-10" />
        </div>
        <h1 className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
          AI Chat Assistant
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Your intelligent conversation partner
        </p>
      </div>

      {/* Chat Container */}
      <Card className="mx-auto h-[680px] max-w-4xl overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="h-[520px] p-6 pb-8">
          <div className="space-y-6 pb-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="mb-6 rounded-full bg-gradient-to-r from-violet-100 to-cyan-100 p-8">
                  <Bot className="h-16 w-16 text-violet-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Session Started!
                </h3>
                <p className="text-gray-600 max-w-md text-lg leading-relaxed">
                  Great! Your chat session is now active. Type a message below
                  to start our conversation.
                </p>
                <div className="mt-8 flex gap-3">
                  <div className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                    Ask me anything
                  </div>
                  <div className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                    Get creative help
                  </div>
                  <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Just chat
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="h-10 w-10 shrink-0 shadow-lg">
                  <AvatarFallback
                    className={
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "bg-gradient-to-r from-violet-500 to-purple-500 text-white"
                    }
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col  max-w-[75%]">
                  <div
                    className={`rounded-2xl px-4 py-2 shadow-lg ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white ml-auto"
                        : "bg-white border border-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                  <div
                    className={`mt-2 text-xs text-gray-500 ${
                      message.role === "user"
                        ? "text-right mr-2"
                        : "text-left ml-2"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 shrink-0 shadow-lg">
                  <AvatarFallback className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-gray-600 text-sm">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t bg-white/90 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={state ?? firstState ?? "Type your message here..."}
                disabled={isTyping}
                className="rounded-full border-gray-200 bg-gray-50/80 px-6 py-3 text-base focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 pr-12"
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-3 py-3 hover:from-violet-600 hover:to-cyan-600 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-200 h-auto"
            >
              {isTyping ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
            <p>Press Enter to send • Shift + Enter for new line</p>
            <p className="text-xs">
              {input.length > 0 && `${input.length} characters`}
            </p>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm text-gray-600 shadow-lg">
          <Sparkles className="h-4 w-4 text-violet-500" />
          <span>Session Active • Ready for your Questions</span>
        </div>
      </div>
    </>
  );
}
