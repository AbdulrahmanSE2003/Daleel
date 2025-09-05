import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
export default function EditLinkModal({ link, onClose, links, setLinks }) {
  const { id, name, url, emoji, tags } = link;

  const [linkName, setLinkName] = useState(name);
  const [linkUrl, setLinkUrl] = useState(url);
  const [linkTags, setLinkTags] = useState(tags);
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

  function handleUpdate() {
    const newLink = {
      id: id,
      name: linkName,
      url: linkUrl,
      emoji: linkEmoji,
      tags: linkTags,
    };

    setLinks(links.map((link) => (link.id === id ? newLink : link)));
    onClose(false);
  }

  return (
    <div className="fixed inset-0 bg-black  flex items-center justify-center pointer-events-auto z-50">
      <div className="p-6 bg-white rounded-2xl shadow-md w-[400px] relative z-50">
        <h2 className="text-xl font-semibold mb-4">Edit Link</h2>
        <input
          type="text"
          placeholder="Name"
          value={linkName}
          onChange={(e) => setLinkName(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-3"
        />
        <input
          type="text"
          placeholder="URL"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-3"
        />
        <div className="relative">
          <input
            type="text"
            placeholder="Emoji"
            value={linkEmoji}
            onChange={(e) => setEmoji(e.target.value)}
            className="w-full border rounded-md px-3 py-2 mb-4"
            disabled
          />

          <button
            type="button"
            className="absolute right-3 top-2 text-xl cursor-not-allowed"
            onClick={() => setShowPicker((prev) => !prev)}
          >
            {linkEmoji}
          </button>
          {showPicker && (
            <div className="absolute -top-40 right-0 z-50 shadow-lg">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap gap-2 border rounded-lg p-2 focus-within:border-emerald-600 mb-4">
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

        <div className="flex justify-end gap-2">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 rounded-md bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-md bg-green-500 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
