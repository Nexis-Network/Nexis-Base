import type React from "react"

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 size-full">
      <svg
        className="size-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Background SVG</title>

        <rect width="1440" height="900" fill="black" />
        <path
          d="M12 17C12 14.2386 14.2386 12 17 12H1423C1425.76 12 1428 14.2386 1428 17V883C1428 885.761 1425.76 888 1423 888H17C14.2386 888 12 885.761 12 883V17Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M12 17C12 14.2386 14.2386 12 17 12H1423C1425.76 12 1428 14.2386 1428 17V883C1428 885.761 1425.76 888 1423 888H17C14.2386 888 12 885.761 12 883V17Z"
          stroke="#343434"
          strokeWidth="2"
        />
        <rect x="15" y="15" width="1414" height="874" fill="#1C1718" />
        <g opacity="0.01">
          <rect x="15" y="15" width="1414" height="874" fill="url(#pattern0)" />
        </g>
        <g opacity="0.75">
          <path
            d="M15.5 15.5H1428.5V888.5H15.5V15.5Z"
            fill="url(#paint1_radial)"
          />
          <path d="M15.5 15.5H1428.5V888.5H15.5V15.5Z" stroke="#292929" />
          <rect
            x="1366"
            y="15"
            width="100%"
            height="100%"
            fill="url(#pattern1)"
          />
          {/* Include all other paths and shapes here, converting attributes as needed */}
          {/* ... */}
        </g>
        {/* Additional paths and elements */}
        {/* ... */}
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0"
              transform="matrix(0.000257544 0 0 0.000416667 0.190948 0)"
            />
          </pattern>
          <pattern
            id="pattern1"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image1" transform="scale(0.01 0.004)" />
          </pattern>
          <linearGradient
            id="paint0_linear"
            x1="720"
            y1="11"
            x2="720"
            y2="889"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.2754" stopColor="#11140C" />
            <stop offset="1" stopColor="#252B1B" />
          </linearGradient>
          <radialGradient
            id="paint1_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(722 452) rotate(31.7204) scale(831.155 743.445)"
          >
            <stop stopColor="#151515" />
            <stop offset="1" stopColor="#000000" />
          </radialGradient>
          <image
            id="image0"
            width="100%"
            height="100%"
            xlinkHref="data:image/png;base64,..." // Include base64 data if applicable
          />
          <image
            id="image1"
            width="100%"
            height="100%"
            xlinkHref="data:image/png;base64,..." // Include base64 data if applicable
          />
        </defs>
      </svg>
    </div>
  )
}

export default Background
