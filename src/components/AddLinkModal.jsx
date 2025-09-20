import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import ErrorToast from "./ErrorToast.jsx";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";
const token = localStorage.getItem("token");

function AddLinkModal({onClose, setLinks, links}) {
    const {t} = useTranslation();
    const [linkName, setLinkName] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [linkTags, setLinkTags] = useState([]); // [{name: "work"}]
    const [emoji, setEmoji] = useState("🔗");
    const [showPicker, setShowPicker] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    async function handleAdd() {
        if (!isValidUrl(linkUrl)) {
            setError("Please enter a valid URL.");
            setShowError(true);

            setTimeout(() => {
                setError("");
                setShowError(false);
            }, 3000);
            return;
        }

        const newLink = {
            title: linkName,
            url: linkUrl,
            emoji,
            tags: linkTags, // [{name: "..."}]
        };

        // setLinks([...links, newLink]);   Cancel optimistic ui
        onClose(false);

        try {
            const res = await axios.post(
                `${BASE_API}links`,
                {
                    title: linkName,
                    url: linkUrl,
                    tags: linkTags.map((tag) => tag.name), // ✅ backend بياخد strings
                    emoji: emoji,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // ✅ نخزن الـ tags كـ objects تاني
            console.log(res.data)
            setLinks(prev => [...prev, res.data])
        } catch (error) {
            console.error("Failed to save link:", error);
        }
    }

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    }

    function onEmojiClick(emojiData) {
        setShowPicker(false);
        setEmoji(emojiData.emoji);
    }

    function removeTag(index) {
        setLinkTags(linkTags.filter((_, i) => i !== index));
    }

    function handleTagKeyDown(e) {
        if (e.key === "Enter" && tagInput.trim() && linkTags.length < 3) {
            setLinkTags([...linkTags, {name: tagInput.trim()}]); // ✅ object
            setTagInput("");
        }
    }

    return (
        <>
            {showError && error && (
                <ErrorToast message={error} onClose={() => setShowError(false)}/>
            )}
            <div className="fixed inset-0 bg-black/40 p-5 bg-opacity-50 flex justify-center items-center z-50">
                <div
                    className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-gray-100/50 animate-slide-in">
                    <button
                        onClick={() => onClose(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:scale-110 transition-transform duration-300"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight">
                        {t("addLink.title")}
                    </h2>

                    <div className="flex flex-col gap-5 relative">
                        {/* Name Input */}
                        <div className="relative">
                            <label className="block text-gray-700 text-sm font-medium mb-1.5">
                                {t("addLink.labels.name")}
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full border-2 border-gray-200 rounded-lg p-2.5 pr-12 bg-white/50 focus:border-[#0c8f63] focus:ring-2 focus:ring-[#0c8f63]/30 outline-none transition-all duration-300"
                                    placeholder={t("addLink.placeholders.name")}
                                    value={linkName}
                                    onChange={(e) => setLinkName(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:scale-110 transition-transform duration-300"
                                    onClick={() => setShowPicker((prev) => !prev)}
                                >
                                    {emoji}
                                </button>
                                {showPicker && (
                                    <div
                                        className="absolute top-[-8rem] right-0 z-50 shadow-xl rounded-lg bg-white/95 backdrop-blur-sm p-2 animate-fade-in">
                                        <EmojiPicker onEmojiClick={onEmojiClick}/>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* URL Input */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1.5">
                                {t("addLink.labels.url")}
                            </label>
                            <input
                                type="url"
                                className="w-full border-2 border-gray-200 rounded-lg p-2.5 bg-white/50 focus:border-[#0c8f63] focus:ring-2 focus:ring-[#0c8f63]/30 outline-none transition-all duration-300"
                                placeholder={t("addLink.placeholders.url")}
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1.5">
                                {t("addLink.labels.tags")}
                            </label>
                            <div
                                className="flex flex-wrap gap-2 border-2 border-gray-200 rounded-lg p-2.5 bg-white/50 focus-within:border-[#0c8f63] focus-within:ring-2 focus-within:ring-[#0c8f63]/30 transition-all duration-300">
                                {linkTags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="group bg-[#0c8f63]/10 text-[#0c8f63] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 hover:bg-[#0c8f63]/20 transition-all duration-300"
                                    >
                    {tag.name}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            className="text-xs text-red-500 hover:text-red-700 group-hover:scale-110 transition-transform duration-300"
                                        >
                      ✕
                    </button>
                  </span>
                                ))}
                                {linkTags.length < 3 && (
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        className="flex-1 outline-none p-1 text-sm bg-transparent placeholder-gray-400"
                                        placeholder={t("addLink.placeholders.tags")}
                                    />
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={!linkName && !linkUrl}
                            onClick={handleAdd}
                            className={`relative bg-[#0c8f63] text-white py-2.5 px-6 rounded-lg font-semibold hover:bg-[#0a7a54] hover:shadow-[0_0_15px_rgba(12,143,99,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 group ${
                                linkName && linkUrl ? "" : "cursor-not-allowed opacity-50"
                            }`}
                        >
                            <span className="relative z-10">{t("addLink.buttons.save")}</span>
                            <div
                                className="absolute inset-0 bg-[#0c8f63]/30 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddLinkModal;
