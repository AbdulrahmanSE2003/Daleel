import { Edit, Trash2 } from "lucide-react";
function LinkCard({ link, onDelete, onEdit }) {
  return (
    <div className="flex w-full items-center justify-between bg-white shadow-md rounded-2xl p-4 border gap-8 border-gray-200">
      <div className="flex flex-col gap-2">
        {/* اسم و ايموجي */}
        <div className="flex items-center gap-4">
          <span className="text-3xl">{link.emoji}</span>
          <p className="font-medium text-gray-800">{link.name}</p>
        </div>

        {/* التاجز */}
        {link.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 ml-11">
            {link.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition"
        >
          Open
        </a>
        <button
          className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition flex items-center gap-1"
          onClick={() => onEdit(link.id)}
        >
          <Edit size={16} /> Edit
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-1"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}

export default LinkCard;
