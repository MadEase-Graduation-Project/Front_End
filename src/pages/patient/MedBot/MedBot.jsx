import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Stethoscope,
  Activity,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { startChatBotSession } from "@/store/slices/chatbotSlice";
import {
  selectChatbotError,
  selectChatbotSessionStart,
} from "@/store/selectors/chatbotSelectors";
import Chatbot from "./components/Chatbot";
import Popup from "@/components/shared/Popup";

export default function MedBot() {
  const dispatch = useDispatch();
  // states ---------------------
  const [sessionStarted, setSessionStarted] = useState(false);
  const [popup, setPopup] = useState(false);
  const [errorAtStart, setErrorAtStart] = useState(false);
  // ---------------------------------

  // selectors -------------
  const success = useSelector(selectChatbotSessionStart);
  const errorStart = useSelector(selectChatbotError);
  // ----------------------

  useEffect(() => {
    if (errorStart) setErrorAtStart(true);
  }, [errorStart]);

  // Wait for session to be available before allowing chat
  const handleStartSession = async () => {
    dispatch(startChatBotSession());
  };

  useEffect(() => {
    if (success) setSessionStarted(true);
    else if (errorAtStart) setPopup(true);
  }, [errorAtStart, success]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 relative overflow-hidden">
      {/* Animated Medical Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Medical Icons */}
        <div
          className="absolute top-20 left-10 text-blue-200 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        >
          <Heart className="h-8 w-8" />
        </div>
        <div
          className="absolute top-40 right-20 text-green-200 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        >
          <Stethoscope className="h-10 w-10" />
        </div>
        <div
          className="absolute bottom-40 left-20 text-teal-200 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        >
          <Activity className="h-6 w-6" />
        </div>
        <div
          className="absolute top-60 left-1/2 text-blue-300 animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
        >
          <Shield className="h-7 w-7" />
        </div>

        {/* Pulse Circles */}
        <div
          className="absolute top-32 right-10 w-20 h-20 bg-blue-100 rounded-full animate-ping opacity-20"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 right-32 w-16 h-16 bg-green-100 rounded-full animate-ping opacity-20"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-10 w-12 h-12 bg-teal-100 rounded-full animate-ping opacity-20"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="mx-auto max-w-4xl relative z-10">
        {!sessionStarted ? (
          // Start Session Screen
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="mb-8">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white shadow-2xl animate-pulse">
                <div className="relative">
                  <Heart
                    className="h-12 w-12 animate-pulse"
                    style={{ animationDuration: "1.5s" }}
                  />
                  <div className="absolute inset-0 animate-ping">
                    <Heart className="h-12 w-12 opacity-30" />
                  </div>
                </div>
              </div>
              <h1 className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-5xl font-bold text-transparent mb-4">
                MedBot Assistant
              </h1>
              <p className="text-xl text-gray-600 mb-4 max-w-2xl">
                Your trusted AI medical companion for health guidance, symptom
                analysis, and medical information support.
              </p>
            </div>

            <Card className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm max-w-md w-full">
              <div className="space-y-6">
                <Button
                  onClick={handleStartSession}
                  className="w-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-8 py-4 text-lg font-semibold hover:from-blue-600 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-300 h-auto group"
                >
                  <Heart className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  Start Medical Consultation
                </Button>

                <div className="space-y-4 px-5">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Symptom analysis and health guidance</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div
                      className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span>Medical information and explanations</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <span>Health monitoring support</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div
                      className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    ></div>
                    <span>Wellness recommendations</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Medical Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mt-8">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span className="font-semibold text-amber-800">
                  Important Medical Disclaimer
                </span>
              </div>
              <p className="text-sm text-amber-700">
                This AI assistant provides general health information only.
                Always consult qualified healthcare professionals for medical
                advice, diagnosis, or treatment. In emergencies, contact
                emergency services immediately.
              </p>
            </div>

            <div className="mt-12 flex gap-3 flex-wrap justify-center">
              <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer">
                <Activity className="inline h-4 w-4 mr-1" />
                Symptom Check
              </div>
              <div className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium hover:bg-teal-200 transition-colors cursor-pointer">
                <Stethoscope className="inline h-4 w-4 mr-1" />
                Health Info
              </div>
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors cursor-pointer">
                <Heart className="inline h-4 w-4 mr-1" />
                Wellness Tips
              </div>
              <div className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-300 transition-colors cursor-pointer">
                <Shield className="inline h-4 w-4 mr-1" />
                Prevention
              </div>
            </div>
          </div>
        ) : (
          <Chatbot />
        )}
      </div>
      <Popup
        open={popup}
        onClose={() => {
          setPopup(false);
          setErrorAtStart(false);
        }}
      />
    </div>
  );
}
