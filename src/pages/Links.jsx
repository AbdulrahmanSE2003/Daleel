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

      <div className="min-h-screen app p-6 md:p-14 mt-12 md:mt-0 flex flex-col gap-8 bg-gray-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
          <h3 className="font-normal md:font-light text-3xl md:text-4xl my-2 relative">
            Welcome Back <span className="text-emerald-800">!</span>
          </h3>
          <div className="bg-white p-4 md:p-5 rounded-xl w-full md:w-auto text-center shadow-lg total-links">
            <p className="text-gray-500 text-sm">Total Links</p>
            <p className="text-xl md:text-2xl font-semibold text-emerald-700">
              {totalLinks}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="control w-full flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 md:gap-6">
          <input
            type="text"
            name="searchLink"
            id="searchLink"
            placeholder="Search..."
            value={query}
            onChange={search}
            className="w-full md:w-4/6 border-2 border-gray-300 outline-none focus:border-emerald-700 transition duration-300 py-2 px-4 rounded-xl"
          />
          <button
            className="bg-emerald-700 text-white font-medium rounded-xl py-3 px-6 hover:bg-emerald-800 transition duration-300"
            onClick={() => setShowAddModal((prev) => !prev)}
          >
            Add Link +
          </button>
        </div>

        {/* Links List */}
        <div className="mt-6 md:mt-10 flex flex-col gap-4 w-full">
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
