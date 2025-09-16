import { useEffect, useState } from "react";

function ErrorToast({ message, onClose, className }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (!visible && message) {
      const timer = setTimeout(() => {
        onClose();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visible, message, onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-[100] capitalize text-md bg-red-200 border border-red-500 text-black/80 px-6 py-3 rounded-lg shadow-lg transition- duration-500 -tracking-tight ${
        visible ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"
      } ${className && className}`}
    >
      {message}
    </div>
  );
}

export default ErrorToast;
