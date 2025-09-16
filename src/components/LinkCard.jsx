import {
  Edit,
  Trash2,
  Clipboard,
  ClipboardCheck,
  QrCode,
  X,
} from "lucide-react";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Tooltip from "@mui/material/Tooltip";

function LinkCard({ link, onDelete, onEdit }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const qrRef = useRef();

  function handleCopy(link) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => console.log(err));
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
    <>
      {/* Link Card */}
      <div className="relative flex flex-col w-full bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-in-out border border-gray-100/50 hover:border-emerald-500/90 overflow-hidden">
        {/* Subtle Glassmorphism Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 to-gray-50/40 opacity-90"></div>

        {/* Header Section: Emoji, Title, and Link */}
        <div className="flex flex-col gap-3 relative z-10">
          <div className="flex items-center gap-4">
            <span className="text-4xl transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-400">
              {link.emoji}
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-sans font-bold text-gray-900 text-2xl md:text-3xl tracking-tight leading-tight">
                {link.title}
              </h2>
              <div className="flex items-center gap-3">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-800 hover:text-emerald-900 font-medium truncate max-w-lg transition-colors duration-300"
                >
                  {link.url}
                </a>
                <Tooltip title={isCopied ? "Link copied" : "Copy link"} arrow>
                  <button
                    onClick={() => handleCopy(link.url)}
                    className="flex items-center justify-center p-2 bg-emerald-100/90 text-emerald-800 rounded-full hover:bg-emerald-200/90 transition-all duration-300 transform hover:scale-110"
                  >
                    {isCopied ? (
                      <ClipboardCheck
                        size={18}
                        className="transition-transform duration-300"
                      />
                    ) : (
                      <Clipboard
                        size={18}
                        className="transition-transform duration-300"
                      />
                    )}
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          {link.tags?.length > 0 && (
            <div className="flex flex-wrap gap- mt-2">
              {link.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-emerald-100/70 text-emerald-900 px-3 py-1.5 rounded-full font-medium border border-emerald-200/50 hover:bg-emerald-200/80 hover:scale-105 transition-all duration-300"
                >
                  #{typeof tag === "string" ? tag : tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons Section */}
        <div className="flex items-center justify-between mt-5 relative z-10">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
          >
            <span>Open Link</span>
          </a>

          <div className="flex items-center gap-3">
            <Tooltip title="View QR Code" arrow>
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="flex items-center justify-center p-2.5 bg-purple-100/80 text-purple-800 rounded-full hover:bg-purple-200/80 transition-all duration-300 transform hover:scale-110"
              >
                <QrCode size={20} />
              </button>
            </Tooltip>
            <Tooltip title="Edit link" arrow>
              <button
                onClick={() => onEdit(link.id)}
                className="flex items-center justify-center p-2.5 bg-gray-100/80 text-gray-800 rounded-full hover:bg-gray-200/80 transition-all duration-300 transform hover:scale-110"
              >
                <Edit size={20} />
              </button>
            </Tooltip>
            <Tooltip title="Delete link" arrow>
              <button
                onClick={() => onDelete(link.id)}
                className="flex items-center justify-center p-2.5 bg-red-100/80 text-red-800 rounded-full hover:bg-red-200/80 transition-all duration-300 transform hover:scale-110"
              >
                <Trash2 size={20} />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* QR Code Modal (Outside Card) */}
      {isQRModalOpen && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 transition-opacity duration-500">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-md w-full relative">
            <button
              onClick={() => setIsQRModalOpen(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-6">
              <h3 className="font-sans font-bold text-xl text-gray-900 tracking-tight text-center">
                {link.title}
              </h3>
              <div className="flex items-center gap-3 w-full">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-800 hover:text-emerald-900 font-medium truncate flex-1"
                >
                  {link.url}
                </a>
                <Tooltip title={isCopied ? "Link copied" : "Copy link"} arrow>
                  <button
                    onClick={() => handleCopy(link.url)}
                    className="flex items-center justify-center p-2 bg-emerald-100/90 text-emerald-800 rounded-full hover:bg-emerald-200/90 transition-all duration-300 transform hover:scale-110"
                  >
                    {isCopied ? (
                      <ClipboardCheck
                        size={18}
                        className="transition-transform duration-300"
                      />
                    ) : (
                      <Clipboard
                        size={18}
                        className="transition-transform duration-300"
                      />
                    )}
                  </button>
                </Tooltip>
              </div>
              <div ref={qrRef} className="p-4 bg-white rounded-xl shadow-inner">
                <QRCodeCanvas value={link.url} size={180} />
              </div>
              <button
                onClick={handleDownloadQR}
                className="bg-gradient-to-r from-green-700 to-green-800 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
              >
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LinkCard;
