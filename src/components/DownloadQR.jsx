import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

function DownloadQR({link}) {
  const qrRef = useRef();

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-code-${link.title}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* الـ QR متخفي (مش لازم يبان للمستخدم) */}
      <div ref={qrRef} style={{ display: "none" }}>
        <QRCodeCanvas value={link.url} size={200} />
      </div>

      <button
        onClick={downloadQR}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Download QR Code
      </button>
    </div>
  );
}

export default DownloadQR;
