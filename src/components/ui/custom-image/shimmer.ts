export function shimmer(w: number, h: number) {
  return `
    <svg
      width='${w}'
      height='${h}'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlns:xlink='http://www.w3.org/1999/xlink'
    >
      <defs>
        <linearGradient id='g'>
          <stop stop-color='#b1a082' offset='20%' />
          <stop stop-color='#9b8c71' offset='50%' />
          <stop stop-color='#b1a082' offset='70%' />
        </linearGradient>
      </defs>
      <rect width='${w}' height='${h}' fill='#b1a082' />
      <rect id="r" width='${w}' height='${h}' fill='url(#g)' />
      <animate
        xlink:href='#r'
        attributeName='x'
        from='-${w}'
        to='${w}'
        dur='1s'
        repeatCount='indefinite'
      />
    </svg>
  `
}
