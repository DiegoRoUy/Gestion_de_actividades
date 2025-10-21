export const EmojiBartSerio = ({ size = 64 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Bart Simpson serio"
    >
        {/* Cabeza */}
        <rect x="8" y="8" width="48" height="48" rx="12" ry="12" fill="#FCD440" />
        {/* Pelo */}
        <polygon points="8,8 12,2 16,8 20,2 24,8 28,2 32,8 36,2 40,8 44,2 48,8 52,2 56,8" fill="#FFD800" />
        {/* Ojos */}
        <circle cx="22" cy="28" r="8" fill="#fff" />
        <circle cx="42" cy="28" r="8" fill="#fff" />
        <circle cx="22" cy="28" r="4" fill="#000" />
        <circle cx="42" cy="28" r="4" fill="#000" />
        {/* Boca recta (serio) */}
        <line
            x1="20"
            y1="44"
            x2="44"
            y2="44"
            stroke="#000"
            strokeWidth="3"
            strokeLinecap="round"
        />
    </svg>
);