// Loader.jsx
export default function Loader({ width, borderWidth }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-${width || 6} h-${width || 6} border-${
          borderWidth || 2
        } border-gray-300 border-t-emerald-600 rounded-full animate-spin`}
      ></div>
    </div>
  );
}
