import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateData } from "@/store/slices/userSlice";
import { useState, useEffect } from "react";
import {
  Edit2,
  Check,
  X,
  Camera,
  User,
  Phone,
  MapPin,
  Loader2,
} from "lucide-react";
import { useDispatch } from "react-redux";

// Enhanced InputText Component
function InputText({
  type = "text",
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
  disabled = false,
  icon: Icon,
  ...props
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleEditClick = () => {
    if (!disabled) {
      setIsEditing(true);
      setTempValue(value);
    }
  };

  const handleSave = () => {
    onChange({ target: { value: tempValue } });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const inputId = `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label
          className="block text-sm font-semibold text-gray-700 mb-2 capitalize"
          htmlFor={inputId}
        >
          <span className="flex items-center gap-2">
            {Icon && <Icon size={16} className="text-gray-500" />}
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </label>
      )}

      <div className="relative group">
        <input
          id={inputId}
          type={type}
          value={isEditing ? tempValue : value}
          onChange={(e) => {
            if (isEditing) {
              setTempValue(e.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={!isEditing || disabled}
          className={`
            w-full px-4 py-3 pr-14
            border border-gray-200 rounded-lg
            text-gray-900 placeholder-gray-400
            transition-all duration-200 ease-in-out
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-50 disabled:text-gray-600 disabled:cursor-not-allowed
            ${
              isEditing
                ? "shadow-lg border-blue-300 bg-white"
                : "hover:border-gray-300 bg-gray-50"
            }
            ${disabled ? "opacity-70" : ""}
          `}
          {...props}
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors"
                title="Save changes"
                disabled={disabled}
              >
                <Check size={16} />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                title="Cancel changes"
                disabled={disabled}
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEditClick}
              className={`
                p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200
                ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-0 group-hover:opacity-100"
                }
              `}
              title="Edit field"
              disabled={disabled}
            >
              <Edit2 size={16} />
            </button>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
          Press Enter to save, Escape to cancel
        </div>
      )}
    </div>
  );
}

// Enhanced Modal Component
function ImageModal({ isOpen, onClose, imageUrl, onImageUrlChange, onSave }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Camera size={24} className="text-blue-600" />
            Profile Image
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile Preview"
                className="max-h-80 max-w-full object-contain rounded-lg shadow-md"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="w-80 h-64 bg-gray-100 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Camera size={48} className="text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-500">No image available</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={onImageUrlChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave();
                onClose();
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main ProfileInfo Component
export default function ProfileInfo({ details, loading }) {
  const dispatch = useDispatch();
  const [showImageModal, setShowImageModal] = useState(false);
  const [editedValues, setEditedValues] = useState({
    ImgUrl: "",
    name: "",
    phone: "",
    city: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedValues({
      ImgUrl: details?.ImgUrl || "",
      name: details?.name || "",
      phone: details?.phone || "",
      city: details?.city || "",
    });
  }, [details]);

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      await dispatch(updateData(editedValues));
      // Optional: Add success notification here
    } catch (error) {
      // Optional: Add error notification here
      console.error("Update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setEditedValues((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-lg font-medium">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Profile Avatar Section */}
      <div className="flex justify-center mb-8">
        <button
          className="relative group"
          onClick={() => setShowImageModal(true)}
        >
          <Avatar className="w-32 h-32 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300">
            <AvatarImage src={editedValues.ImgUrl} alt="User avatar" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
              {editedValues.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full transition-all duration-300 flex items-center justify-center">
            <Camera
              size={28}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </button>
      </div>

      {/* Profile Form */}
      <div className="space-y-2">
        <InputText
          type="text"
          label="Full Name"
          value={editedValues.name}
          onChange={handleInputChange("name")}
          placeholder="Enter your full name"
          icon={User}
          required
        />

        <InputText
          type="tel"
          label="Phone Number"
          value={editedValues.phone}
          onChange={handleInputChange("phone")}
          placeholder="Enter your phone number"
          icon={Phone}
        />

        <InputText
          type="text"
          label="City"
          value={editedValues.city}
          onChange={handleInputChange("city")}
          placeholder="Enter your city"
          icon={MapPin}
        />
      </div>

      {/* Action Button */}
      <div className="flex justify-center mt-8">
        <button
          className={`
            px-8 py-3 font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg
            ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            }
          `}
          onClick={handleUpdate}
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              Updating...
            </span>
          ) : (
            "Update Profile"
          )}
        </button>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageUrl={editedValues.ImgUrl}
        onImageUrlChange={(e) => handleInputChange("ImgUrl")(e)}
        onSave={() => {
          // Image URL is already updated through onImageUrlChange
          // You can add additional logic here if needed
        }}
      />
    </div>
  );
}
