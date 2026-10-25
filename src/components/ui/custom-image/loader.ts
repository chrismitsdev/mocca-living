export function loader(w: number, h: number) {
  const cx = w / 2
  const cy = h / 2

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${w}"
      height="${h}"
      fill="none"
    >
      <!-- Canvas background -->
      <rect width="${w}" height="${h}" fill="#c7b492" />

      <!-- Centered spinner path -->
      <g transform="translate(${cx - 12}, ${cy - 12})">
        <path
          d="M21 12a9 9 0 1 1-6.219-8.56"
          stroke="#1d130d"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  `
}
