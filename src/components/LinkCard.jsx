import { Edit, Trash2 } from "lucide-react";

function LinkCard({ link, onDelete, onEdit }) {
  return (
    <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between bg-white shadow-md rounded-2xl p-4 border gap-6 border-gray-200">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-4">
          <span className="text-3xl">{link.emoji}</span>
          <p className="font-medium text-gray-800">{link.name}</p>
        </div>

        {link.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 ml-12 md:ml-14">
            {link.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium hover:scale-105 transition duration-300 hover:bg-emerald-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition text-center"
        >
          Open
        </a>
        <button
          onClick={() => onEdit(link.id)}
          className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition flex items-center justify-center gap-1"
        >
          <Edit size={16} /> Edit
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-1"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}

export default LinkCard;
