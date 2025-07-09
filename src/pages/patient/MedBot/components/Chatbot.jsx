import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Send,
  Heart,
  User,
  Loader2,
  Stethoscope,
  Activity,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChatbotLoading,
  selectChatbotMessage,
  selectChatbotSession,
} from "@/store/selectors/chatbotSelectors";
import { sendChatBotMsg } from "@/store/slices/chatbotSlice";
import { underscoreToSpace } from "@/utils/stringUtils";

export default function Chatbot() {
  const dispatch = useDispatch();
  // states-------------------------
  const [started, setStarted] = useState(false);
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
  // -----
  const msg = useSelector(selectChatbotMessage);
  const botMsg = msg.prompt;
  const replayOptions = msg.options;
  const state = msg.state;
  const loading = useSelector(selectChatbotLoading);
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
  };

  // Add bot message to messages when botMsg changes (after API response)
  useEffect(() => {
    if (!loading && started) {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        const isDup = last?.role === "assistant";
        if (isDup) return prev;

        return [
          ...prev,
          {
            id: Date.now().toString() + "-assistant",
            role: "assistant",
            content: botMsg ?? firstChatMsg ?? "again",
            timestamp: new Date(),
          },
        ];
      });
    }
  }, [botMsg, firstChatMsg, loading, started]);

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
    // Chat Interface with Medical Theme
    <div className="relative">
      {/* Animated Medical Background Elements for Chat */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div
          className="absolute top-10 right-10 text-blue-100 animate-pulse"
          style={{ animationDelay: "0s", animationDuration: "4s" }}
        >
          <Activity className="h-6 w-6" />
        </div>
        <div
          className="absolute bottom-20 left-10 text-green-100 animate-pulse"
          style={{ animationDelay: "2s", animationDuration: "3s" }}
        >
          <Heart className="h-5 w-5" />
        </div>
        <div
          className="absolute top-1/2 right-20 text-teal-100 animate-pulse"
          style={{ animationDelay: "1s", animationDuration: "5s" }}
        >
          <Stethoscope className="h-7 w-7" />
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 text-center relative z-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white shadow-2xl">
          <div className="relative">
            <Heart
              className="h-10 w-10 animate-pulse"
              style={{ animationDuration: "2s" }}
            />
            <div className="absolute inset-0 animate-ping opacity-50">
              <Heart className="h-10 w-10" />
            </div>
          </div>
        </div>
        <h1 className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-4xl font-bold text-transparent">
          MedBot Assistant
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Your trusted medical AI companion
        </p>
      </div>

      {/* Chat Container */}
      <Card className="mx-auto max-h-[680px] max-w-5xl overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm relative z-10">
        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="h-[520px] p-6">
          <div className="flex flex-col justify-end min-h-[520px] mb-6">
            <div className="space-y-6 flex flex-col">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-8 mb-auto">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Medical Consultation Started!
                  </h3>
                  <p className="text-gray-600 max-w-md text-lg leading-relaxed mb-6">
                    Hello! I`m your MedBot assistant. I`m here to help with
                    health questions, symptom analysis, and medical information.
                    How can I assist you today?
                  </p>

                  {/* Medical Disclaimer in Chat */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 max-w-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-800 text-sm">
                        Medical Disclaimer
                      </span>
                    </div>
                    <p className="text-xs text-amber-700">
                      I provide general health information only. For medical
                      emergencies, contact emergency services immediately.
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3 flex-wrap justify-center">
                    <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      <Activity className="inline h-3 w-3 mr-1" />
                      Symptom analysis
                    </div>
                    <div className="px-3 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                      <Stethoscope className="inline h-3 w-3 mr-1" />
                      Health guidance
                    </div>
                    <div className="px-3 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <Heart className="inline h-3 w-3 mr-1" />
                      Wellness tips
                    </div>
                  </div>
                  <Button className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-3 py-3 hover:from-blue-600 hover:to-green-600 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-200 h-auto mt-10">
                    <button onClick={() => setStarted(true)}>start</button>
                  </Button>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex  items-start gap-4 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="h-10 w-10 shrink-0 shadow-lg">
                    <AvatarFallback
                      className={
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                          : "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                      }
                    >
                      {message.role === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Heart className="h-5 w-5" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col max-w-[75%]">
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-lg ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white ml-auto"
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

              {/* Medical Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 shrink-0 shadow-lg">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                      <Heart className="h-5 w-5 animate-pulse" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-gray-600 text-sm">
                        MedBot is analyzing...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        {started && (
          <div className="border-t bg-white/95 backdrop-blur-sm p-4">
            <form onSubmit={handleSubmit} className="flex gap-3 items-center">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    state
                      ? underscoreToSpace(state)
                      : firstState
                      ? underscoreToSpace(firstState)
                      : "Describe your symptoms or ask a health question..."
                  }
                  disabled={isTyping}
                  className="rounded-full border-gray-200 bg-gray-50/80 px-6 py-3 text-base focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                />
              </div>
              <Button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-3 py-3 hover:from-blue-600 hover:to-green-600 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-200 h-auto group"
              >
                {isTyping ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5 group-hover:scale-110 transition-transform" />
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
        )}
      </Card>

      {/* Medical Footer */}
      <div className="mt-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm text-gray-600 shadow-lg">
          <Heart className="h-4 w-4 text-blue-500 animate-pulse" />
          <span>
            Medical Session Active • Ask about symptoms, health, or wellness
          </span>
        </div>
        <div className="mt-4 text-xs text-gray-500 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-amber-500" />
            <span className="font-medium">Emergency Notice:</span>
          </div>
          <p>
            For medical emergencies, call emergency services immediately. This
            AI provides general information only and is not a substitute for
            professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
