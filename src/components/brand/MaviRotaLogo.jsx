export default function MaviRotaLogo({ className = 'h-8 w-8' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="32" height="32" rx="8" className="fill-brand-900" />
      <path
        d="M6 20c4-3 8-4 10-4s6 1 10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-brand-400"
      />
      <path
        d="M8 22c3-2 7-3 10-3s7 1 10 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-sea"
      />
      <circle
        cx="16"
        cy="13"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-brand-300"
      />
      <path
        d="M16 8v10M11 13h10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="text-brand-300"
      />
    </svg>
  )
}
