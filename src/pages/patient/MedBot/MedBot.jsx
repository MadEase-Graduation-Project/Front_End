import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { startChatBotSession } from "@/store/slices/chatbotSlice";
import {
  selectChatbotError,
  selectChatbotSessionStart,
} from "@/store/selectors/chatbotSelectors";
import Chatbot from "./components/Chatbot";
import Popup from "@/components/shared/Popup";
import { selectMyDetails } from "@/store/selectors";

export default function MedBot() {
  const dispatch = useDispatch();
  // states ---------------------
  const [sessionStarted, setSessionStarted] = useState(false);
  const [popup, setPopup] = useState(false);

  // ---------------------------------

  // selectors -------------
  const success = useSelector(selectChatbotSessionStart);
  const errorStart = useSelector(selectChatbotError);
  // ----------------------

  // Wait for session to be available before allowing chat
  const handleStartSession = async () => {
    dispatch(startChatBotSession());
  };

  useEffect(() => {
    if (success) setSessionStarted(true);
    else if (errorStart) setPopup(true);
  }, [errorStart, success]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-4">
      <div className="mx-auto max-w-4xl">
        {!sessionStarted ? (
          // Start Session Screen
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="mb-8">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 text-white shadow-2xl animate-pulse">
                <Sparkles className="h-12 w-12" />
              </div>
              <h1 className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-5xl font-bold text-transparent mb-4">
                AI Chat Assistant
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Welcome to your intelligent conversation partner. Ready to help
                with questions, creative tasks, and friendly conversations.
              </p>
            </div>

            <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm max-w-md w-full">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span>Instant responses powered by AI</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Creative assistance and problem solving</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span>Friendly and helpful conversations</span>
                  </div>
                </div>

                <Button
                  onClick={handleStartSession}
                  className="w-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-4 text-lg font-semibold hover:from-violet-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-200 h-auto"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start New Session
                </Button>

                <p className="text-sm text-gray-500">
                  Click to begin your AI-powered conversation
                </p>
              </div>
            </Card>

            <div className="mt-12 flex gap-3 flex-wrap justify-center">
              <div className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                Ask Questions
              </div>
              <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Get Creative Help
              </div>
              <div className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                Solve Problems
              </div>
              <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Just Chat
              </div>
            </div>
          </div>
        ) : (
          <Chatbot />
        )}
      </div>
      <Popup open={popup} onClose={() => setPopup(false)} />
    </div>
  );
}
