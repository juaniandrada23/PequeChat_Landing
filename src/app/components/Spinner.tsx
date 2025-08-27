interface SpinnerProps {
  sizeClass?: string;
  colorClass?: string;
}

export default function Spinner({ 
  sizeClass = "w-8 h-8", 
  colorClass = "border-t-azul3" 
}: SpinnerProps) {
  return (
    <div
      className={`${sizeClass} border-4 border-gray-200 ${colorClass} rounded-full animate-spin`}
      role="status"
      aria-label="Cargando"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
