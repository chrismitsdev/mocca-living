function HoneyPot() {
  return (
    <div
      aria-hidden='true'
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}
    >
      <label htmlFor='company_website'>Website</label>
      <input
        id='company_website'
        name='company_website'
        type='text'
        tabIndex={-1}
        autoComplete='off'
      />
    </div>
  )
}

HoneyPot.displayName = 'HoneyPot'

export {HoneyPot}
