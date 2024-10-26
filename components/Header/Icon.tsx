import React from "react"

interface IconProps {
  icon: string
  className?: string
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
  const aspectRatio = 526 / 526 // Original aspect ratio
  const maxSize = Math.min(32, 32)
  const calculatedWidth = Math.min(maxSize, 32)
  const calculatedHeight = Math.min(maxSize, calculatedWidth / aspectRatio)

  return (
    <div
      style={{
        width: calculatedWidth,
        height: calculatedHeight,
        border: "2px solid #242424",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 526 526"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <g filter="url(#filter0_d_96_1298)">
          <rect
            x="7"
            y="3"
            width="512"
            height="512"
            rx="256"
            fill="url(#paint0_linear_96_1298)"
            shapeRendering="crispEdges"
          />
          <rect
            x="5.5"
            y="1.5"
            width="515"
            height="515"
            rx="257.5"
            stroke="#242424"
            strokeWidth="3"
            shapeRendering="crispEdges"
          />
          <rect
            x="7"
            y="3"
            width="512"
            height="512"
            rx="256"
            fill="url(#paint1_linear_96_1298)"
          />
          <path
            d="M187.805 339.446C187.813 339.446 187.821 339.449 187.827 339.455C187.874 339.503 187.924 339.551 187.974 339.599C188.211 339.826 188.6 339.788 188.788 339.519L196.045 329.154C196.104 329.069 196.158 328.98 196.205 328.887C202.542 316.316 205.012 304.841 205.085 295.07C204.987 289.825 204.255 284.627 202.939 279.576C202.012 276.537 201.329 273.398 200.89 270.236C200.89 270.211 200.89 270.162 200.89 270.113C200.597 268.005 200.402 265.847 200.305 263.69C198.965 228.981 225.753 199.233 260.159 197.186C260.22 197.182 260.248 197.107 260.202 197.066V197.066C260.157 197.025 260.182 196.95 260.243 196.946C268.456 196.464 280.34 198.238 290.323 195.607C300.737 192.641 310.199 186.879 317.711 178.936C317.984 178.644 318.283 178.379 318.6 178.141C318.814 177.98 319.009 177.794 319.162 177.575L324.746 169.62C325.439 168.632 325.199 167.267 324.196 166.597C294.818 146.967 256.6 141.822 221.474 156.258C165.185 179.353 138.212 243.978 161.21 300.562C166.966 314.709 175.282 327.016 185.428 337.142C186.205 337.923 186.983 338.68 187.785 339.438C187.79 339.443 187.798 339.446 187.805 339.446V339.446Z"
            fill="#1E1E1E"
          />
          <path
            d="M331.35 186.714C331.228 186.889 331.132 187.081 331.062 187.283C330.915 187.702 330.742 188.128 330.507 188.522C323.849 201.05 321.02 219.977 321.629 227.454C322.624 239.814 326.367 247.859 325.258 257.301C325.246 257.408 325.24 257.517 325.243 257.625C326.033 292.029 299.268 321.223 265.133 323.14C265.093 323.142 265.053 323.143 265.013 323.143C265.008 323.143 265.003 323.143 265 323.143C257.463 323.632 256.586 322.897 249.684 323.216C235.49 323.851 220.352 329.793 209.82 340.899C209.747 340.976 209.68 341.058 209.62 341.145L203.941 349.264C203.24 350.266 203.5 351.65 204.53 352.311C205.944 353.22 207.371 354.105 208.809 354.989C209.76 355.529 210.711 356.044 211.662 356.558C239.489 371.317 273.365 374.038 304.752 361.143C361.041 338.024 388.015 273.398 365.016 216.814C359.059 202.168 350.325 189.477 339.684 179.137C338.736 178.216 337.196 178.38 336.437 179.462L331.35 186.714Z"
            fill="#1E1E1E"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_96_1298"
            x="0"
            y="0"
            width="526"
            height="526"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_96_1298"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_96_1298"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_96_1298"
            x1="505.391"
            y1="3.00002"
            x2="20.6088"
            y2="515"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1E1E1E" />
            <stop offset="1" stopColor="#3F3D3D" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_96_1298"
            x1="519"
            y1="9.90563"
            x2="7.00003"
            y2="508.094"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E1FF69" />
            <stop offset="0.5" stopColor="#E0FF25" />
            <stop offset="1" stopColor="#D5FF3C" />
          </linearGradient>
        </defs>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: "1px solid hsla(0, 0%, 100%, 0.1)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}

export default Icon
