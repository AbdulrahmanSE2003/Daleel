// Loader.jsx
export default function Loader({ width, borderWidth}) {

    const widthClass = width || 6; // Width of the loader (in Tailwind units)
    const borderClass = borderWidth || 2; // Border width of the loader (in Tailwind units)

  return (
    <div className="flex justify-center items-center">
      <div
          style={{width:`${widthClass *4}px`,height: `${widthClass *4}px`, borderWidth:`${borderClass}px`}}
        className="border-2 border-gray-300 border-t-emerald-600 rounded-full animate-spin"
      ></div>
    </div>
  );
}
