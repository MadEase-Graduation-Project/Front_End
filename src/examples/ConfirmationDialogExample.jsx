import { useState } from "react";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

export default function ConfirmationDialogExample() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("delete");
  const [result, setResult] = useState("");

  // Open dialog with different configurations
  const openDialog = (type) => {
    setActionType(type);
    setIsDialogOpen(true);
  };

  // Handle confirmation
  const handleConfirm = () => {
    setResult(`${actionType} action was confirmed at ${new Date().toLocaleTimeString()}`);
    // Here you would typically perform the actual action (delete, approve, etc.)
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Confirmation Dialog Examples</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => openDialog("delete")}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Item
        </button>

        <button
          onClick={() => openDialog("approve")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Approve Request
        </button>

        <button
          onClick={() => openDialog("cancel")}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Cancel Subscription
        </button>
      </div>

      {result && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded mb-8">
          <p className="text-blue-800">{result}</p>
        </div>
      )}

      {/* Confirmation Dialog with dynamic content based on action type */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
        title={
          actionType === "delete"
            ? "Confirm Deletion"
            : actionType === "approve"
            ? "Confirm Approval"
            : "Confirm Cancellation"
        }
        message={
          actionType === "delete"
            ? "Are you sure you want to delete this item? This action cannot be undone."
            : actionType === "approve"
            ? "Are you sure you want to approve this request? This will notify the requester."
            : "Are you sure you want to cancel your subscription? You will lose access to premium features."
        }
        confirmText={
          actionType === "delete"
            ? "Delete"
            : actionType === "approve"
            ? "Approve"
            : "Cancel Subscription"
        }
        cancelText="Go Back"
        confirmButtonClass={
          actionType === "delete"
            ? "bg-red-600 hover:bg-red-700"
            : actionType === "approve"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-yellow-600 hover:bg-yellow-700"
        }
      />

      <div className="mt-8 p-4 border border-gray-200 rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">How to Use</h2>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
          {`import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

// In your component:
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [itemToDelete, setItemToDelete] = useState(null);

const handleDelete = (item) => {
  setItemToDelete(item);
  setIsDialogOpen(true);
};

const confirmDelete = () => {
  // Perform delete action
  console.log("Deleting:", itemToDelete);
};

// In your JSX:
<ConfirmationDialog
  isOpen={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  onConfirm={confirmDelete}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  confirmText="Delete"
  cancelText="Cancel"
  confirmButtonClass="bg-red-600 hover:bg-red-700"
/>`}
        </pre>
      </div>
    </div>
  );
}
