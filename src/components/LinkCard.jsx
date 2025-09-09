import { Edit, Trash2 } from "lucide-react";

function LinkCard({ link, onDelete, onEdit }) {
  return (
    <div className="group relative flex flex-col md:flex-row w-full items-start md:items-center justify-between bg-white/95 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-transparent hover:shadow-xl transition-all duration-500 ease-in-out animate-glow-in overflow-hidden">
      {/* Animated Glow Border */}
      <div className="absolute inset-0 border-2 border-transparent rounded-2xl animate-border-glow"></div>

      <div className="flex flex-col gap-4 w-full relative z-10">
        <div className="flex items-center gap-4">
          <span className="text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-400">{link.emoji}</span>
          <p className="font-sans font-bold text-gray-900 text-xl md:text-2xl tracking-tight group-hover:text-[#0c8f63] transition-colors duration-300">
            {link.name}
          </p>
        </div>

        {link.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 ml-12 md:ml-14">
            {link.tags.map((tag, idx) => (
              <span
                key={idx}
                className="relative text-xs bg-[#0c8f63]/10 text-[#0c8f63] px-3 py-1.5 rounded-full font-medium border border-[#0c8f63]/30 hover:bg-[#0c8f63]/20 hover:scale-110 transition-all duration-300 group/tag"
              >
                #{tag}
                <div className="absolute inset-0 bg-[#0c8f63]/20 rounded-full blur-sm group-hover/tag:blur-md transition-all duration-300"></div>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0 relative z-10">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-[#0c8f63] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#0a7a54] transition-all duration-300 transform hover:-translate-y-0.5 group text-center overflow-hidden"
        >
          <span className="relative z-10">Open</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c8f63]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
        <button
          onClick={() => onEdit(link.id)}
          className="relative bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-900  transition-all duration-300 flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 group"
        >
          <Edit size={16} className="group-hover:scale-105 transition-transform" />
          <span className="relative z-10">Edit</span>
          <div className="absolute inset-0 bg-gray-800/40 rounded-lg transition-all duration-300"></div>
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="relative bg-red-500 hover:bg-red-800 text-white px-6 py-2.5 rounded-lg font-semibold  transition-all duration-300 flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 group"
        >
          <Trash2 size={16} className="group-hover:scale-105 transition-transform" />
          <span className="relative z-10">Delete</span>
          <div className="absolute inset-0 bg-red-600/40 rounded-lg  transition-all duration-300"></div>
        </button>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes glow-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes border-glow {
          0% { border-color: rgba(12, 143, 99, 0); }
          50% { border-color: rgba(12, 143, 99, 0.7); }
          100% { border-color: rgba(12, 143, 99, 0); }
        }
        .animate-glow-in {
          animation: glow-in 0.7s ease-out forwards;
        }
        .animate-border-glow {
          animation: border-glow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default LinkCard;