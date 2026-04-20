// Official brand SVGs (simplified, accessible).

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {/* White outer ring */}
      <circle cx="16" cy="16" r="16" fill="#FFFFFF" />
      {/* Green bubble */}
      <path
        fill="#25D366"
        d="M16 2.4C8.5 2.4 2.4 8.5 2.4 16c0 2.4.6 4.7 1.9 6.7L2.4 29.6l7.1-1.9c1.9 1.1 4.2 1.7 6.5 1.7 7.5 0 13.6-6.1 13.6-13.6S23.5 2.4 16 2.4z"
      />
      {/* Phone glyph */}
      <path
        fill="#FFFFFF"
        d="M22.6 19.2c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-1.9-1.9-2.3-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.5-.6-.7-.6h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.3 3.4 1.4 3.7c.2.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4z"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#ig-grad)" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        d="M11 8h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3z"
      />
      <circle cx="16" cy="16" r="4" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="22" cy="10" r="1.2" fill="#fff" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#1877F2" />
      <path
        fill="#fff"
        d="M21.5 20.5l.7-4.5h-4.3v-2.9c0-1.2.6-2.4 2.6-2.4h2V7.5s-1.8-.3-3.5-.3c-3.6 0-5.9 2.2-5.9 6.1V16h-4v4.5h4V32h4.8V20.5h3.6z"
      />
    </svg>
  );
}

export function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 640" className={className} aria-hidden="true">
      <rect width="640" height="640" rx="128" fill="#000000" />
      <path
        fill="#FFFFFF"
        d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z"
      />
    </svg>
  );
}
