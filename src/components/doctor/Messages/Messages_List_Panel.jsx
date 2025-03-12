import React, { useState } from "react";
import Messages_Filter_Bar from "./Messages_Filter_Bar";
import { Mail, Archive, Circle } from "lucide-react";

const emails = [
  { id: 1, sender: "Dr. Ahmed Hassan", subject: "Patient Report: John Doe", time: "10:30 AM", unread: true, archived: false },
  { id: 2, sender: "Lab Results", subject: "Test Reports for Sarah M.", time: "9:45 AM", unread: true, archived: false },
  { id: 3, sender: "Nurse Sara Khaled", subject: "Appointment Schedule", time: "8:20 AM", unread: false, archived: false },
  { id: 4, sender: "Pharmacy Team", subject: "Medication Stock Update", time: "12:15 PM", unread: false, archived: true },
  { id: 5, sender: "Hospital Admin", subject: "New Policy Guidelines", time: "7:30 AM", unread: false, archived: false },
  { id: 6, sender: "Dr. Laila Mostafa", subject: "Case Discussion: Cardiac Surgery", time: "5:00 PM", unread: true, archived: false },
  { id: 7, sender: "Lab Results", subject: "Test Reports for Alex B.", time: "3:40 PM", unread: false, archived: true },
  { id: 8, sender: "Dr. Mohamed Yassin", subject: "Follow-up on Cardiac Patients", time: "6:20 AM", unread: true, archived: false },
  { id: 9, sender: "Dr. Noor Hamed", subject: "Urgent: Patient Case Review", time: "2:10 PM", unread: true, archived: false },

  // Patient Messages
  { id: 10, sender: "Mr. John Doe", subject: "Concern: Chest Pain Symptoms", time: "4:15 PM", unread: true, archived: false },
  { id: 11, sender: "Mrs. Sarah Williams", subject: "Follow-up: Post-Surgery Recovery", time: "11:00 AM", unread: false, archived: false },
  { id: 12, sender: "Mr. Ahmed Kamal", subject: "Request: Urgent Appointment", time: "9:30 AM", unread: true, archived: false },
  { id: 13, sender: "Ms. Lisa Carter", subject: "Question: New Medication Side Effects", time: "7:45 AM", unread: false, archived: false },
  { id: 14, sender: "Mr. Omar Hafez", subject: "Inquiry: Test Results & Next Steps", time: "1:20 PM", unread: true, archived: true },
  { id: 15, sender: "Mrs. Fatima Ibrahim", subject: "Emergency: Irregular Heartbeat", time: "3:00 AM", unread: true, archived: false },
  { id: 16, sender: "Mr. George Benson", subject: "Thanks: Successful Treatment!", time: "5:30 PM", unread: false, archived: false },
  { id: 17, sender: "Ms. Julia Roberts", subject: "Diet Plan for Heart Health?", time: "10:10 AM", unread: false, archived: true },
  { id: 18, sender: "Mr. Liam O'Connor", subject: "New Symptoms: What Should I Do?", time: "6:50 AM", unread: true, archived: false },
];

export const Messages_List_Panel = ({ onMessageSelect }) => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState("all");

  // Filter emails based on selected filter
  const filteredEmails = emails.filter((email) => {
    if (filter === "unread") return email.unread && !email.archived;
    if (filter === "archive") return email.archived;
    return !email.archived; // Default (all non-archived emails)
  });

  const unreadCount = emails.filter(email => email.unread && !email.archived).length;

  const handleEmailClick = (emailId) => {
    setSelectedEmail(emailId);
    onMessageSelect && onMessageSelect(emailId);
  };

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm bg-white h-[calc(100vh_-_180px)] flex flex-col">
      <Messages_Filter_Bar filter={filter} setFilter={setFilter} unreadCount={unreadCount} />
      <main className="flex-1 overflow-y-auto p-4 bg-white">
        <div className="space-y-2">
          {filteredEmails.length > 0 ? (
            filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email.id)}
                className={`flex justify-between p-3 rounded-lg cursor-pointer border ${
                  email.unread ? "border-green-500" : "border-gray-300"
                } ${selectedEmail === email.id ? "bg-gray-200" : "hover:bg-gray-100"}`}
              >
                <div>
                  <h3 className={`font-medium ${email.unread ? "text-black" : "text-gray-600"}`}>
                    {email.sender}
                  </h3>
                  <p className="text-sm text-gray-500">{email.subject}</p>
                </div>
                <p className="text-xs text-gray-400">{email.time}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages found.</p>
          )}
        </div>
      </main>
    </div>
  );
};
