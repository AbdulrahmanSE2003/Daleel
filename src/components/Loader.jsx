// Loader.jsx
export default function Loader({ width, borderWidth}) {

    const widthClass = width || 6; // Width of the loader (in Tailwind units)
    const borderClass = borderWidth || 2; // Border width of the loader (in Tailwind units)

  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-${widthClass} h-${widthClass} border-${borderClass} border-gray-300 border-t-emerald-600 rounded-full animate-spin`}
      ></div>
    </div>
  );
}
