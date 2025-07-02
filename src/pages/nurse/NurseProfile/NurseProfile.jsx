import  { useState } from "react";

export default function NurseProfile() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About" },
    { id: "timeline", label: "Timeline" },
    { id: "posts", label: "Posts" },
    { id: "settings", label: "Settings" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
            <div>
              <h2 className="text-xl font-semibold mb-2">Personal Info</h2>
              <p><span className="font-medium">Full Name:</span> Sarah Johnson</p>
              <p><span className="font-medium">Email:</span> sarah.nurse@example.com</p>
              <p><span className="font-medium">Phone:</span> +20 123 456 789</p>
              <p><span className="font-medium">Address:</span> Nasr City, Cairo</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Professional Info</h2>
              <p><span className="font-medium">Specialization:</span> Pediatrics</p>
              <p><span className="font-medium">Experience:</span> 6 years</p>
              <p><span className="font-medium">Certifications:</span> BLS, PALS</p>
              <p><span className="font-medium">Languages:</span> Arabic, English</p>
            </div>
          </div>
        );
      case "timeline":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Timeline</h2>
            <ul className="space-y-4">
              <li>✅ Joined pediatric department - Jan 2020</li>
              <li>🏆 Employee of the Month - March 2021</li>
              <li>📄 Attended CPR Workshop - Nov 2023</li>
            </ul>
          </div>
        );
      case "posts":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded">📝 “Pediatric care tips every parent should know.”</div>
              <div className="p-4 border rounded">📷 Posted photo from hospital training session.</div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium">Email</label>
                <input type="email" defaultValue="sarah.nurse@example.com" className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block font-medium">Password</label>
                <input type="password" placeholder="********" className="w-full border rounded px-3 py-2" />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Cover */}
      <div className="relative h-64 bg-blue-500">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-8 flex items-center gap-4">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow-md">
              Nurse Sarah Johnson
            </h1>
            <p className="text-white font-medium drop-shadow-sm">Pediatric Nurse, Cairo</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="mt-20 px-8">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-300 pb-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-1 font-medium ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}
