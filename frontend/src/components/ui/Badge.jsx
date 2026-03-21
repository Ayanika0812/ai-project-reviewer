const colorMap = {
  green: "bg-green-900 text-green-300",
  red: "bg-red-900 text-red-300",
  yellow: "bg-yellow-900 text-yellow-300",
  blue: "bg-blue-900 text-blue-300",
  gray: "bg-gray-800 text-gray-300",
};

export default function Badge({ label, color = "gray" }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[color]}`}>
      {label}
    </span>
  );
}
