import { Edit, Trash2, Clipboard, ClipboardCheck,QrCode   } from "lucide-react";
import {useState, useRef} from "react";
import { QRCodeCanvas } from "qrcode.react";
import Tooltip from "@mui/material/Tooltip";

function LinkCard({ link, onDelete, onEdit }) {
  const [isCopied, setIsCopied] = useState(false);
  const qrRef = useRef();

  function handleCopy(link){
    navigator.clipboard.writeText(link).then(() => {
        setIsCopied(true);

        setTimeout(() =>{setIsCopied(false)}, 3000)
    }).catch(err => console.log(err))
  }

  function handleDownloadQR() {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-code-${link.title}.png`;
    downloadLink.click();
  }

  return (
    <div className="group relative flex flex-col md:flex-row w-full items-start md:items-center justify-between bg-white/95 backdrop-blur-sm shadow-lg rounded-2xl p-6 py-3  hover:shadow-xl  transition-all duration-500 ease-in-out animate-glow-in overflow-hidden border-2 border-transparent hover:border-emerald-500 ">
      <div className="flex flex-col gap-4 w-full relative z-10">
        <div className="flex items-center gap-4">
          <span className="text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-400">
            {link.emoji}
          </span>
          <p className="font-sans font-semibold text-gray-900 text-xl md:text-2xl tracking-tight  transition-colors duration-500">
            {link.title}
          </p>
        </div>

        {link.tags?.length > 0 ? (
          <div className="flex flex-wrap gap-2 ml-12 md:ml-14">
            {link.tags.map((tag, idx) => (
              <span
                key={idx}
                className="relative text-xs bg-[#0c5563]/5 text-emerald-800 px-3 py-1.5 rounded-full font-medium border border-[#0c8f63]/30 hover:bg-[#0c8f63]/15 hover:scale-105 transition-all duration-300 group/tag"
              >
                #{typeof tag === "string" ? tag : tag.name}
                <div className="absolute inset-0 bg-[#0c8f63]/10 rounded-full group-hover/tag:blur-xs transition-all duration-300"></div>
              </span>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-col md:flex-row md:max-h-11 gap-3 w-full md:w-auto mt-4 md:mt-0 relative z-10">

          <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-[#0c8f63] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#0a7a54] transition-all duration-300 transform hover:-translate-y-0.5 group text-center overflow-hidden"
          >
            <span className="relative z-10">Open</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c8f63]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

        {/* Copy */}
        <Tooltip title={isCopied ? "Link copied" : "Copy link"} arrow>
          <button
              onClick={() => handleCopy(link.url)}
              className="relative bg-yellow-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-yellow-600  transition-all duration-300 flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 group"
          >
            {isCopied ? (
                <>
                  <ClipboardCheck size={18} className="group-hover:scale-105 transition-transform" />
                  <span className="relative z-10">Copied</span>
                </>
            ) : (
                <>
                  <Clipboard size={18} className="group-hover:scale-105 transition-transform" />
                  <span className="relative z-10">Copy</span>
                </>
            )}
            <div className="absolute inset-0 bg-yellow-600/10 rounded-lg transition-all duration-300"></div>
          </button>
        </Tooltip>

        {/* QR */}
        <div ref={qrRef} className="hidden">
          <QRCodeCanvas value={link.url} size={200} />
        </div>
        <Tooltip title="Share via QR" arrow>
          <button
              onClick={handleDownloadQR}
              className="relative bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 group leading-[1.1]"
          >
            <QrCode size={18} />
            <span>QR</span>
          </button>
        </Tooltip>

          <button
              onClick={() => onEdit(link.id)}
              className="relative bg-gray-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 group"
          >
            <Edit size={18} className="group-hover:scale-105 transition-transform" />
            <span className="relative z-10">Edit</span>
            <div className="absolute inset-0 bg-gray-600/40 rounded-lg transition-all duration-300"></div>
          </button>

          <button
              onClick={() => onDelete(link.id)}
              className="relative bg-red-500 hover:bg-red-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 group"
          >
            <Trash2 size={18} className="group-hover:scale-105 transition-transform" />
            <span className="relative z-10">Delete</span>
            <div className="absolute inset-0 bg-red-600/40 rounded-lg transition-all duration-300"></div>
          </button>
      </div>
    </div>
  );
}

export default LinkCard;
