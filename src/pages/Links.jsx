import { useState } from "react";
import Navbar from "../components/Navbar";
import LinkCard from "../components/LinkCard";
import AddLinkModal from "../components/AddLinkModal";
import EditLinkModal from "../components/EditLinkModal";

function Links() {
  const [links, setLinks] = useState([
    {
      id: 1,
      name: "OpenAI",
      url: "https://openai.com",
      emoji: "🤖",
      tags: ["AI", "Research", "ChatGPT"],
    },
    {
      id: 2,
      name: "GitHub",
      url: "https://github.com",
      emoji: "🐙",
      tags: ["Code", "Collaboration", "OpenSource"],
    },
    {
      id: 3,
      name: "Tailwind CSS",
      url: "https://tailwindcss.com",
      emoji: "🎨",
      tags: ["CSS", "Frontend", "Design"],
    },
  ]);
  const [linksToShow, setLinksToShow] = useState([]);
  const [query, setQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [linkToEdit, setLinkToEdit] = useState({});

  let totalLinks = links.length;

  function handleDelete(id) {
    setLinks(links.filter((link) => link.id !== id));
  }
  function handleEdit(id) {
    const temp = links.find((link) => link.id === id);
    setLinkToEdit(temp);
    setShowEditModal(true);
  }

  function search(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 2) {
      setLinksToShow(
        links.filter((link) =>
          link.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setLinksToShow([]);
    }
  }

  return (
    <>
      <Navbar />

      {showAddModal && (
        <AddLinkModal
          onClose={setShowAddModal}
          setLinks={setLinks}
          links={links}
        />
      )}

      {showEditModal && (
        <EditLinkModal
          link={linkToEdit}
          onClose={setShowEditModal}
          setLinks={setLinks}
          links={links}
        />
      )}

      <div className="min-h-screen app p-20 px-14 flex flex-col gap-12 justify-start items-start bg-gray-100">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-light text-4xl my-4 relative">
            Welcome Back <span className="text-emerald-800">!</span>
          </h3>
          <div className="bg-white p-5 rounded-xl px-10 text-center shadow-lg total-links">
            <p className="text-gray-500 text-sm ">Total Links</p>
            <p className="text-2xl font-semibold text-emerald-700">
              {totalLinks}
            </p>
          </div>
        </div>

        <div className="control w-full flex justify-between items-center gap-6">
          <input
            type="text"
            name="searchLink"
            id="searchLink"
            placeholder="Search..."
            value={query}
            onChange={search}
            className="w-4/6 border-2 border-gray-300 outline-none focus:border-emerald-700 transition duration-300 py-2 px-4 rounded-xl"
          />
          {/* زرار الإضافة شكلي بس دلوقتي */}
          <button
            className="bg-emerald-700 text-white font-medium rounded-xl py-3 px-6 mb-[6px] hover:bg-emerald-800 transition duration-300 "
            onClick={() => setShowAddModal((prev) => !prev)}
          >
            Add Link +
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-4 w-full">
          {(query.length >= 2 ? linksToShow : links).map((link) => (
            <LinkCard
              link={link}
              onDelete={handleDelete}
              key={link.id}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Links;
