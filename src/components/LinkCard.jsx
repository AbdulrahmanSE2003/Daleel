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
import { useTranslation } from "react-i18next";

function LinkCard({ link, onDelete, onEdit }) {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const qrRef = useRef();

  function handleCopy(linkUrl) {
    navigator.clipboard
        .writeText(linkUrl)
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
        <div
            className="relative flex flex-col h-full bg-white/70 backdrop-blur-md
        border border-gray-200 rounded-2xl shadow-md
        hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 flex flex-col gap-2 flex-grow">
            <div className="flex items-center gap-3">
              <span className="text-xl">{link.emoji || "🔗"}</span>
              <h2 className="text-lg font-semibold text-gray-900 truncate capitalize">
                {link.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-emerald-800 transition-colors duration-300 truncate max-w-[180px]"
              >
                {link.url}
              </a>
              <Tooltip
                  title={
                    isCopied ? t("linkCard.linkCopied") : t("linkCard.copyLink")
                  }
                  arrow
              >
                <button
                    onClick={() => handleCopy(link.url)}
                    className="flex items-center justify-center p-2 bg-gray-200/90 text-gray-600 rounded-full hover:bg-gray-300/90 transition-all duration-300 transform hover:scale-110"
                >
                  {isCopied ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
                </button>
              </Tooltip>
            </div>

            {/* Tags */}
            {link.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {link.tags
                      ?.filter((tag) => tag) // remove null/undefined
                      .map((tag, idx) => {
                        const tagName = typeof tag === "string" ? tag : tag.name;
                        return (
                            <span
                                key={idx}
                                className="text-xs bg-emerald-100 text-emerald-900 px-2 py-1 rounded-full border border-emerald-100 capitalize "
                            >
                      #{tagName}
                    </span>
                        );
                      })}
                </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/60">
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0c8f63] hover:bg-[#0a7a54] text-white text-sm px-4 py-2 rounded-lg font-medium transition-all"
            >
              {t("linkCard.open")}
            </a>

            <div className="flex items-center gap-2">
              <Tooltip title={t("linkCard.qrCode")} arrow>
                <button
                    onClick={() => setIsQRModalOpen(true)}
                    className="p-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-all"
                >
                  <QrCode size={18} />
                </button>
              </Tooltip>
              <Tooltip title={t("linkCard.edit")} arrow>
                <button
                    onClick={() => onEdit(link.id)}
                    className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-all"
                >
                  <Edit size={18} />
                </button>
              </Tooltip>
              <Tooltip title={t("linkCard.delete")} arrow>
                <button
                    onClick={() => onDelete(link.id)}
                    className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* QR Code Modal */}
        {isQRModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-500">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-md w-full relative">
                <button
                    onClick={() => setIsQRModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors duration-300"
                >
                  <X size={24} />
                </button>
                <div className="flex flex-col items-center gap-6">
                  <h4 className="font-sans font-bold text-xl text-gray-900 tracking-tight text-center">
                    {link.title}
                  </h4>
                  <div className="flex items-center gap-3 w-full">
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-700 hover:text-emerald-900 font-medium transition-colors duration-300 truncate flex-1"
                    >
                      {link.url}
                    </a>
                    <Tooltip
                        title={
                          isCopied ? t("linkCard.linkCopied") : t("linkCard.copyLink")
                        }
                        arrow
                    >
                      <button
                          onClick={() => handleCopy(link.url)}
                          className="flex items-center justify-center p-2 bg-gray-100/90 text-gray-600 rounded-full hover:bg-gray-200/90 transition-all duration-300 transform hover:scale-110"
                      >
                        {isCopied ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
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
                    {t("linkCard.downloadQR")}
                  </button>
                </div>
              </div>
            </div>
        )}
      </>
  );
}

export default LinkCard;
