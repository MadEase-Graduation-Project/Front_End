import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Lock, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Popup({ open, onClose }) {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md border-0 p-0 overflow-hidden">
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Login Required
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You need to be logged in to interact with this content. Join our
                community to like, comment, and share amazing posts!
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={navigateToLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <User className="w-5 h-5 mr-2" />
                Go to Login Page
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full text-gray-600 hover:text-gray-800 hover:bg-white/50"
              >
                Maybe Later
              </Button>
            </div>
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/20 rounded-full"></div>
              <div className="absolute top-8 right-8 w-4 h-4 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-4 left-8 w-6 h-6 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
