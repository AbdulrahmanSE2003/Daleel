import { useState } from "react";
import Navbar from "../components/Navbar";
import LinkCard from "../components/LinkCard";
import AddLinkModal from "../components/AddLinkModal";
import EditLinkModal from "../components/EditLinkModal";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../components/Loader";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";
const token = localStorage.getItem("token");

function Links() {
  const [links, setLinks] = useState([]);
  const [linksToShow, setLinksToShow] = useState([]);
  const [query, setQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [linkToEdit, setLinkToEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // let totalLinks = links.length;
  /*
   
{id: 1, title: 'Google', url: 'https://google.com', created_at: '2025-09-09T17:22:45.000000Z', updated_at: '2025-09-09T17:22:45.000000Z', …}
length
: 
1
[[Prototype]]
: 
Array(0)
 */

  useEffect(() => {
    async function getLinks() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BASE_API}links`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setLinks(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getLinks();
  }, []);

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

      {isLoading ? (
        <Loader />
      ) : (
        <>
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

          <div className="min-h-screen app p-6 md:p-14 md:pt-20 mt-12 md:mt-0 flex flex-col gap-8 bg-gradient-to-br from-gray-50 to-[#0c8f63]/5">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
              <h3 className="font-normal md:font-light text-3xl md:text-4xl my-2 relative">
                Welcome Back <span className="text-emerald-800">!</span>
              </h3>
              {/* <div className="bg-white p-4 md:p-5 rounded-xl w-full md:w-auto text-center shadow-lg total-links">
              <p className="text-gray-500 text-sm">Total Links</p>
              <p className="text-xl md:text-2xl font-semibold text-emerald-700">
                {totalLinks}
              </p>
            </div> */}
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
            <div className="mt-3 flex flex-col gap-4 w-full">
              {links.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-gray-400 py-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mb-3 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16h-1v-4h-1m1-4h.01M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
                    />
                  </svg>
                  <p className="text-lg font-medium">No links yet</p>
                  <p className="text-sm">
                    Click{" "}
                    <span className="text-emerald-700 font-semibold">
                      “Add Link +”
                    </span>{" "}
                    to create your first one.
                  </p>
                </div>
              ) : (
                (query.length >= 2 ? linksToShow : links).map((link) => (
                  <LinkCard
                    link={link}
                    onDelete={handleDelete}
                    key={link.id}
                    onEdit={handleEdit}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Links;
