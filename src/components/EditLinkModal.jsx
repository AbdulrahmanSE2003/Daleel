import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";

const BASE_API = "https://dalil-backend-production.up.railway.app/api/";
const token = localStorage.getItem("token");

export default function EditLinkModal({ link, onClose, links, setLinks }) {
  const { id, title, url, emoji, tags } = link;

  const [linkName, setLinkName] = useState(title);
  const [linkUrl, setLinkUrl] = useState(url);
  const [linkTags, setLinkTags] = useState(tags?.map((t) => t.name) || []);
  const [linkEmoji, setEmoji] = useState(emoji);
  const [showPicker, setShowPicker] = useState(false);
  const [tagInput, setTagInput] = useState("");

  function removeTag(index) {
    setLinkTags(linkTags.filter((_, i) => i !== index));
  }

  function handleTagKeyDown(e) {
    if (e.key === "Enter" && tagInput.trim() && linkTags.length < 3) {
      setLinkTags([...linkTags, tagInput.trim()]);
      setTagInput("");
    }
  }

  function onEmojiClick(emojiData) {
    setShowPicker(false);
    setEmoji(emojiData.emoji);
  }

  async function handleUpdate() {
    const newLink = {
      id: id,
      title: linkName,
      url: linkUrl,
      emoji: linkEmoji,
      tags: linkTags,
    };

    setLinks(links.map((link) => (link.id === id ? newLink : link)));
    onClose(false);

    try {
      const res = await axios.put(
        `${BASE_API}links/${id}`,
        {
          title: linkName,
          url: linkUrl,
          tags: linkTags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLinks((prev) =>
        prev.map((link) =>
          link.id === id ? { ...res.data, tags: newLink.tags } : link
        )
      );
    } catch (error) {
      console.log("couldn't update link ", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 p-5  flex items-center justify-center pointer-events-auto z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md p-6 relative z-50 border border-gray-100/50 animate-slide-in">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight">
          Edit Link
        </h2>

        <div className="flex flex-col gap-5">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              Name
            </label>
            <input
              type="text"
              placeholder="Link name..."
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg p-2.5 bg-white/50 focus:border-[#0c8f63] focus:ring-2 focus:ring-[#0c8f63]/30 outline-none transition-all duration-300"
            />
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              URL
            </label>
            <input
              type="text"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg p-2.5 bg-white/50 focus:border-[#0c8f63] focus:ring-2 focus:ring-[#0c8f63]/30 outline-none transition-all duration-300"
            />
          </div>

          {/* Emoji Input */}
          <div className="relative">
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              Emoji
            </label>
            <input
              type="text"
              placeholder="Select an emoji..."
              value={linkEmoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg p-2.5 pr-12 bg-white/50 focus:border-[#0c8f63] focus:ring-2 focus:ring-[#0c8f63]/30 outline-none transition-all duration-300"
              disabled
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-xl hover:scale-110 transition-transform duration-300"
              onClick={() => setShowPicker((prev) => !prev)}
            >
              {linkEmoji}
            </button>
            {showPicker && (
              <div className="absolute top-[-18rem] right-0 z-50 shadow-xl rounded-lg bg-white/95 backdrop-blur-sm p-2 animate-fade-in">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 border-2 border-gray-200 rounded-lg p-2.5 bg-white/50 focus-within:border-[#0c8f63] focus-within:ring-2 focus-within:ring-[#0c8f63]/30 transition-all duration-300">
              {linkTags?.map((tag, index) => (
                <span
                  key={index}
                  className="group bg-[#0c8f63]/10 text-[#0c8f63] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 hover:bg-[#0c8f63]/20 transition-all duration-300"
                >
                  {tag}
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
                  placeholder="Type tag & press Enter"
                />
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => onClose(false)}
              className="relative bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-300 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="relative bg-[#0c8f63] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#0a7a54] hover:shadow-[0_0_15px_rgba(12,143,99,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <span className="relative z-10">Save</span>
              <div className="absolute inset-0 bg-[#0c8f63]/30 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
