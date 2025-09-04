import { useState } from "react";

export default function AddLinkModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [emoji, setEmoji] = useState("");
  const [tags, setTags] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({
      id: crypto.randomUUID(),
      name,
      url,
      emoji,
      tags: tags.split(",").map((t) => t.trim()),
    });
    onClose();
  }

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          placeholder="Emoji"
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />

        <button type="submit">Add</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
