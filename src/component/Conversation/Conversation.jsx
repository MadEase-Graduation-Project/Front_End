import React from "react";

const Conversation = ({
  conversation,
  currentUserId,
  doctors = [],
  patients = [],
  onClick,
}) => {
  // نحاول نعرف الـ ID التاني في المحادثة (مش المستخدم الحالي)
  const otherUserId = conversation.members.find((id) => id !== currentUserId);

  // نحاول نجيب معلومات الشخص التاني (دكتور أو مريض)
  const doctor = doctors.find((doc) => doc._id === otherUserId);
  const patient = patients.find((pat) => pat._id === otherUserId);

  // نحدّد الاسم والصورة حسب اللي قدرنا نلقاه
  const name = doctor
    ? `Dr. ${doctor.name}`
    : patient
    ? patient.name
    : "Unknown User";

  const imageUrl = doctor?.ImgUrl || patient?.ImgUrl || null;

  return (
    <div
      onClick={onClick}
      className="flex items-center p-2.5 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#f0f2f5]"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-10 h-10 rounded-full object-cover mr-2.5"
        />
      )}
      <span className="text-[16px] font-medium text-[#333]">{name}</span>
    </div>
  );
};

export default Conversation;
