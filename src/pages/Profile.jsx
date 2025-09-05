import { useState } from "react";
import { User, Lock, Pencil, LogOut, Undo2, Menu, X } from "lucide-react";

function Profile() {
  const [activeTab, setActiveTab] = useState("info");
  const [edit, setEdit] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside
        className={`${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md p-6 flex flex-col justify-between transition-transform duration-300 z-20`}
      >
        <div>
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src="https://i.pravatar.cc/150"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-emerald-500 shadow"
            />
            <h2 className="mt-4 font-bold text-lg">Abdulrahman Saad</h2>
            <p className="text-gray-500 text-sm">Frontend Developer</p>
          </div>

          <nav className="flex flex-col gap-3">
            <button
              onClick={() => {
                setActiveTab("info");
                setMenuOpen(false);
              }}
              className={`flex items-center gap-2 p-3 rounded-lg ${
                activeTab === "info"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-700 hover:bg-gray-200 transition duration-300"
              }`}
            >
              <User size={18} /> Profile Info
            </button>
            <button
              onClick={() => {
                setActiveTab("security");
                setMenuOpen(false);
              }}
              className={`flex items-center gap-2 p-3 rounded-lg ${
                activeTab === "security"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-700 hover:bg-gray-200 transition duration-300"
              }`}
            >
              <Lock size={18} /> Security
            </button>
          </nav>
        </div>

        <div className="flex flex-col self-start gap-6">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition duration-300">
            <Undo2 size={18} /> Back
          </button>
          <button className="flex items-center gap-2 text-red-600 hover:text-red-800 transition duration-300">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Mobile topbar */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h1 className="text-xl font-bold">Profile</h1>
          <button
            className="p-2 rounded-md bg-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {activeTab === "info" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Profile Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-1">Name</label>
                <input
                  disabled={!edit}
                  type="text"
                  defaultValue="Abdulrahman Saad"
                  className={`w-full p-3 border rounded-lg ${
                    edit ? "" : "opacity-50"
                  }`}
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  disabled={!edit}
                  type="email"
                  defaultValue="abdulrahman@email.com"
                  className={`w-full p-3 border rounded-lg ${
                    edit ? "" : "opacity-50"
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="mt-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50">
                Save Changes
              </button>
              <button
                onClick={() => setEdit((prev) => !prev)}
                className="mt-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                <Pencil />
                <span>Edit</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Password</label>
                <input
                  disabled={!edit}
                  type="password"
                  defaultValue="password123"
                  className={`w-full p-3 border rounded-lg ${
                    edit ? "" : "opacity-50"
                  }`}
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="mt-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50">
                  Save Changes
                </button>
                <button
                  onClick={() => setEdit((prev) => !prev)}
                  className="mt-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  <Pencil />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;
