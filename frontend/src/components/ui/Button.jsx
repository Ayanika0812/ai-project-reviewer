export default function Button({ children, onClick, disabled, variant = "primary", className = "" }) {
  const base = "px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950";
  const variants = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white focus:ring-brand-500 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98]",
    ghost: "bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
