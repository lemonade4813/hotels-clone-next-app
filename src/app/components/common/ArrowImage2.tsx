import React from 'react'

export default function ArrowImage2({
  fill,
  isToggled,
}: {
  fill?: string
  isToggled: boolean
}) {
  return (
    <svg
      width={20}
      height={20}
      fill={fill}
      className="uitk-icon uitk-expando-trigger-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        transform: isToggled ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
      }}
    >
      <path d="M16.44 9.146a.5.5 0 0 1 .706 0l.708.708a.5.5 0 0 1 0 .707l-5.147 5.146a1 1 0 0 1-1.414 0l-5.147-5.146a.5.5 0 0 1 0-.707l.708-.708a.5.5 0 0 1 .703-.003L12 13.586l4.44-4.44z"></path>
    </svg>
  )
}