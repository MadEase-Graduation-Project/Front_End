import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

export default function ProfileInfo({ details, loading }) {
  const [editedValues, setEditedValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setEditedValues({
      name: details.name || "",
      email: details.email || "",
      phone: details.phone || "",
      address: details.city || "",
    });
  }, [details]);

  const handleUpdate = () => {
    // Handle update logic here
    console.log("Name:", editedValues.name);
    console.log("Email:", editedValues.email);
    console.log("Phone:", editedValues.phone);
    console.log("Address:", editedValues.address);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="profile flex justify-center">
        <button className="flex w-fit mb-4  relative rounded-full text-center group">
          <Avatar className="w-28 h-28">
            <AvatarImage
              src={"https://github.com/shadcn.png"}
              alt="User avatar"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div
            className="flex justify-center items-center absolute top-1/2 right-1/2 translate-x-1/2  w-28 h-14 bg-slate-100
        opacity-0 group-hover:opacity-70 transition-all duration-300 ease-in-out rounded-b-full"
          >
            <FaEdit size={20} />
          </div>
        </button>
      </div>
      <InputText
        type="text"
        label="name"
        value={editedValues.name}
        onChange={(e) =>
          setEditedValues({ ...editedValues, name: e.target.value })
        }
      />
      <InputText
        type="email"
        label="email"
        value={editedValues.email}
        onChange={(e) =>
          setEditedValues({ ...editedValues, email: e.target.value })
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
        value={editedValues.address}
        onChange={(e) =>
          setEditedValues({ ...editedValues, address: e.target.value })
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
