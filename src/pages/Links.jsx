import {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import LinkCard from "../components/LinkCard";
import AddLinkModal from "../components/AddLinkModal";
import EditLinkModal from "../components/EditLinkModal";
import axios from "axios";
import Loader from "../components/Loader";
import {useTranslation} from "react-i18next";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";

function Links() {
    const {t} = useTranslation();
    const [links, setLinks] = useState([]);
    const [filteredLinks, setFilteredLinks] = useState([]);
    const [query, setQuery] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [linkToEdit, setLinkToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Fetch links on mount
    useEffect(() => {
        const token = localStorage.getItem("token");

        async function getLinks() {
            setIsLoading(true);
            try {
                const res = await axios.get(`${BASE_API}links`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setLinks(res.data || []);
                // console.log(res.data)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        getLinks();
    }, []);

    // ✅ Delete link
    async function handleDelete(id) {
        const token = localStorage.getItem("token");
        setLinks((prev) => prev.filter((link) => link.id !== id));

        try {
            await axios.delete(`${BASE_API}links/${id}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
        } catch (error) {
            console.error(error);
        }
    }

    // ✅ Open edit modal
    function handleEdit(id) {
        const temp = links.find((link) => link.id === id);
        setLinkToEdit(temp);
        setShowEditModal(true);
    }

    // ✅ Search
    function search(e) {
        const value = e.target.value;
        setQuery(value);

        if (value.trim().length >= 2) {
            setFilteredLinks(
                links.filter((link) =>
                    link.title.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            setFilteredLinks([]);
        }
    }

    const linksToRender = query.length >= 2 ? filteredLinks : links;

    return (
        <>
            <Navbar/>

            {showAddModal && (
                <AddLinkModal
                    onClose={setShowAddModal}
                    setLinks={setLinks}
                    links={links}
                />
            )}

            {showEditModal && linkToEdit && (
                <EditLinkModal
                    link={linkToEdit}
                    onClose={setShowEditModal}
                    setLinks={setLinks}
                    links={links}
                />
            )}

            <div
                className="min-h-screen app p-6 md:p-14 md:pt-20 mt-12 md:mt-0 flex flex-col gap-8 bg-gradient-to-br from-gray-50 to-[#0c8f63]/5">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
                    <h3 className="font-normal md:font-light text-3xl md:text-4xl my-2 relative">
                        {t("linksPage.welcome")}
                    </h3>
                </div>

                {/* Controls */}
                <div
                    className="w-full flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 md:gap-6">
                    <input
                        type="text"
                        name="searchLink"
                        id="searchLink"
                        placeholder={t("linksPage.search_placeholder")}
                        value={query}
                        onChange={search}
                        className="w-full md:w-4/6 border-2 border-gray-200 outline-none focus:border-[#0c8f63] focus:ring-2 focus:ring-[#0c8f63]/30 transition-all duration-300 py-2.5 px-4 rounded-xl"
                    />
                    <button
                        className="bg-[#0c8f63] hover:bg-[#0a7a54] text-white font-medium rounded-xl py-3 px-6 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
                        onClick={() => setShowAddModal(true)}
                    >
                        {t("linksPage.add_button")}
                    </button>
                </div>

                {/* Links List */}
                {isLoading ? (
                    <Loader width={12} borderWidth={4}/>
                ) : (
                    <div className="mt-3 flex flex-col gap-4 w-full">
                        {links.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-gray-400 py-12">
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
                                <p className="text-lg font-medium">
                                    {t("linksPage.empty.title")}
                                </p>
                                <p className="text-sm">{t("linksPage.empty.subtitle")}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                {linksToRender.map((link) => (
                                    <LinkCard
                                        key={link.id}
                                        link={link}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Links;
