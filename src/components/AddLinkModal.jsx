import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

function AddLinkModal({ onClose, setLinks, links }) {
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTags, setLinkTags] = useState([]);
  const [emoji, setEmoji] = useState("🔗");
  const [showPicker, setShowPicker] = useState(false);
  const [tagInput, setTagInput] = useState("");

  function handleAdd() {
    const newLink = {
      id: crypto.randomUUID(),
      name: linkName,
      url: linkUrl,
      emoji: emoji,
      tags: linkTags,
    };

    setLinks([...links, newLink]);
    onClose(false);
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
      setLinkTags([...linkTags, tagInput.trim()]);
      setTagInput("");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Link</h2>

        <div className="flex flex-col gap-4 relative">
          <div className="relative">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg p-2 pr-10 focus:border-emerald-600 outline-none"
              placeholder="Link name..."
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-xl cursor-not-allowed"
              onClick={() => setShowPicker((prev) => !prev)}
            >
              {emoji}
            </button>
            {showPicker && (
              <div className="absolute -top-20 right-0 z-50 shadow-lg">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          {/* Input الرابط */}
          <div>
            <label className="block text-gray-700 mb-1">URL</label>
            <input
              type="url"
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:border-emerald-600 outline-none"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 border-2 border-gray-300 rounded-lg p-2 focus-within:border-emerald-600">
              {linkTags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-xs text-red-500 hover:text-red-700"
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
                  className="flex-1 outline-none p-1 text-sm"
                  placeholder="Type tag & press Enter"
                />
              )}
            </div>
          </div>

          <button
            type="button"
            disabled={!linkName && !linkUrl}
            className={`bg-emerald-700 text-white py-2 rounded-lg font-semibold ${
              linkName && linkUrl ? "" : "cursor-not-allowed opacity-50"
            } `}
            onClick={handleAdd}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddLinkModal;
