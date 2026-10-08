// 24px line icons for the menu tiles (white on #081014), matching the Figma tile style.

const paths = {
  assistant: (
    <>
      <path d="M4 5.5h16v10H9.5L5.5 19v-3.5H4z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  research: (
    <>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="M14.5 14.5L20 20M8.5 10.5h4M10.5 8.5v4" />
    </>
  ),
  caseLaw: (
    <>
      <path d="M12 4v15M7 19h10M5 7h14" />
      <path d="M7 7l-2.5 6a2.5 2.5 0 005 0zM17 7l-2.5 6a2.5 2.5 0 005 0z" />
    </>
  ),
  legislation: (
    <>
      <path d="M5 4.5h10.5L19 8v11.5H5z" />
      <path d="M15 4.5V8h4M8.5 11h7M8.5 14h7M8.5 17h4" />
    </>
  ),
  contract: (
    <>
      <path d="M14 4.5H5v15h14v-6" />
      <path d="M8 9h5M8 12h3M16.5 4.5l3 3-6 6H10.5v-3z" />
    </>
  ),
  workflow: (
    <>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
      <path d="M7 10v4.5a2.5 2.5 0 002.5 2.5H14M17 14V9.5A2.5 2.5 0 0014.5 7H10" />
    </>
  ),
  lawFirm: (
    <>
      <rect x="4" y="8" width="16" height="11" />
      <path d="M9 8V5h6v3M4 13h16M11 13v2h2v-2" />
    </>
  ),
  government: (
    <>
      <path d="M4 9.5L12 5l8 4.5zM5 19.5h14M6.5 10v7M10 10v7M14 10v7M17.5 10v7" />
    </>
  ),
  business: (
    <>
      <path d="M5 19.5V5h9v14.5M14 10h5v9.5M3.5 19.5h17" />
      <path d="M8 8.5h3M8 11.5h3M8 14.5h3M16.5 13h0M16.5 16h0" />
    </>
  ),
  education: (
    <>
      <path d="M3 9.5L12 5l9 4.5-9 4.5z" />
      <path d="M7 11.5v4c1.5 1.5 3 2 5 2s3.5-.5 5-2v-4M21 9.5V14" />
    </>
  ),
  verification: (
    <>
      <path d="M5 4.5h10.5L19 8v11.5H5z" />
      <path d="M8.5 13l2.5 2.5 4.5-5" />
    </>
  ),
  security: (
    <>
      <path d="M12 3.5l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9v-5z" />
      <rect x="9" y="10.5" width="6" height="5" />
      <path d="M10.5 10.5V9a1.5 1.5 0 013 0v1.5" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
