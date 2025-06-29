import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateData } from "@/store/slices/userSlice";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function ProfileInfo({ details, loading }) {
  const dispatch = useDispatch();

  const [showImageModal, setShowImageModal] = useState(false);
  const [editedValues, setEditedValues] = useState({
    ImgUrl: "",
    name: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    setEditedValues({
      ImgUrl: details.ImgUrl || "",
      name: details.name || "",
      phone: details.phone || "",
      city: details.city || "",
    });
  }, [details]);

  const handleUpdate = () => {
    dispatch(updateData(editedValues));
  };

  const viewImg = () => {
    setShowImageModal(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="profile flex justify-center">
        <button
          className="flex w-fit mb-4 relative rounded-full text-center group"
          onClick={viewImg}
        >
          <Avatar className="w-28 h-28">
            <AvatarImage src={editedValues.ImgUrl} alt="User avatar" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div
            className="flex justify-center items-center absolute top-1/2 right-1/2 translate-x-1/2 w-28 h-14 bg-slate-100
        opacity-0 group-hover:opacity-70 transition-all duration-300 ease-in-out rounded-b-full"
          >
            <FaEdit size={20} />
          </div>
        </button>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Profile Image</h2>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center">
              {editedValues.ImgUrl ? (
                <img
                  src={editedValues.ImgUrl}
                  alt="Profile"
                  className="max-h-96 object-contain mb-4"
                />
              ) : (
                <div className="w-64 h-64 bg-gray-200 flex items-center justify-center mb-4 rounded-lg">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}

              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editedValues.ImgUrl}
                  onChange={(e) =>
                    setEditedValues({ ...editedValues, ImgUrl: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="flex justify-end w-full mt-4">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="bg-sky-400 hover:bg-sky-500 text-black font-bold py-1 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <InputText
        type="text"
        label="name"
        value={editedValues.name}
        onChange={(e) =>
          setEditedValues({ ...editedValues, name: e.target.value })
        }
      />
      <InputText
        type="text"
        label="phone"
        value={editedValues.phone}
        onChange={(e) =>
          setEditedValues({ ...editedValues, phone: e.target.value })
        }
      />
      <InputText
        type="text"
        label="address"
        value={editedValues.city}
        onChange={(e) =>
          setEditedValues({ ...editedValues, city: e.target.value })
        }
      />
      <button
        className="bg-sky-400 hover:bg-sky-500 text-black font-bold py-1 px-4 rounded"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
}

function InputText({ type, label, value, onChange }) {
  const [edit, setEdit] = useState(true);
  return (
    <div className="mb-4 relative">
      <label
        className="block text-gray-700 font-medium mb-1 ml-1 "
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        disabled={edit}
        type={type}
        value={value}
        onChange={onChange}
      />
      <button
        className={`absolute right-1 top-2 text-gray-400 ${
          edit ? "opacity-100" : "opacity-30"
        } `}
        onClick={() => setEdit(!edit)}
      >
        <FaEdit size={15} />
      </button>
    </div>
  );
}
