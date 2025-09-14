// Loader.jsx
export default function Loader({ width = 6, borderWidth = 2 }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-${width} h-${width} border-${borderWidth} border-gray-300 border-t-emerald-600 rounded-full animate-spin`}
      ></div>
    </div>
  );
}
