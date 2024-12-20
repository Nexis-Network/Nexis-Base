// see: https://github.com/vvanghelue/github-like-avatar-generator/blob/main/index.js
import convert from "color-convert";

type GetRandomColor = {
  canBeBlank?: boolean;
  dominantColor?: number;
};

type GenerateAvatar = {
  blocks?: number;
  width?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromPixels?: any;
}

type GenerateAvatarOutput = {
  base64: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pixels: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svgElement?: any;
}

function getRandomColor({ canBeBlank = true, dominantColor }: GetRandomColor) {
  if (canBeBlank && Math.random() < 0.3) {
    return "#FFFFFFAA";
  }
  let colorValue;
  if (dominantColor) {
    const delta = Math.random() * 60 - 30;
    colorValue = Math.floor(dominantColor + delta);
    colorValue = Math.max(Math.min(colorValue, 256), 0);
  } else {
    colorValue = Math.floor(Math.random() * 256);
  }
  return "#" + convert.hsl.hex([colorValue, 100, 80]);
}

export default function generateAvatar({
  blocks = 6,
  width = 100,
  fromPixels
}: GenerateAvatar) {
  const blockSize = width / blocks;

  const dominantColor1 = Math.random() * 256;
  const dominantColor2 = Math.random() * 256;

  let pixels;

  if (fromPixels) {
    pixels = fromPixels;
  } else {
    pixels = new Array((blocks * blocks) / 2).fill(null).map((i, k) => {
      if (blocks === 4) {
        return getRandomColor({
          canBeBlank: ![4, 5, 6].includes(k),
          dominantColor: Math.random() > 0.9 ? dominantColor1 : dominantColor2
        });
      }
      if (blocks === 6) {
        return getRandomColor({
          canBeBlank: ![13, 14].includes(k),
          dominantColor: Math.random() > 0.9 ? dominantColor1 : dominantColor2
        });
      }
      return getRandomColor({});
    });
  }

  let pixelHTML = "";
  let pixelCursor = 0;
  for (let i = 0; i < blocks / 2; i++) {
    for (let j = 0; j < blocks; j++) {
      pixelHTML += `
        <rect 
          fill="${pixels[pixelCursor]}" 
          x="${blockSize * i}" 
          y="${blockSize * j}" 
          width="${blockSize}" 
          height="${blockSize}"
        ></rect>
      `;
      pixelCursor++;
    }
  }

  pixelCursor = 0;
  for (let i = blocks - 1; i > blocks / 2 - 1; i--) {
    for (let j = 0; j < blocks; j++) {
      pixelHTML += `
        <rect 
          fill="${pixels[pixelCursor]}" 
          x="${blockSize * i}" 
          y="${blockSize * j}" 
          width="${blockSize}" 
          height="${blockSize}"
        ></rect>
      `;
      pixelCursor++;
    }
  }

  const svgCode = `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="${width}" 
      height="${width}" 
      version="1.1"
    >
      <rect 
        fill="#cccccc" 
        x="0" 
        y="0" 
        width="${width}" 
        height="${width}"
      ></rect>
      
      ${pixelHTML}
    </svg>
  `;

  let base64Code
  if (typeof window === "undefined") {
    base64Code = Buffer.from(svgCode).toString('base64')
  } else {
    base64Code = btoa(svgCode)
  }

  const output: GenerateAvatarOutput = {
    base64: `data:image/svg+xml;base64,${base64Code}`,
    pixels,
  };

  // browser only
  if (typeof DOMParser !== 'undefined') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, "image/svg+xml");
    output.svgElement = doc.firstChild;
  }

  return output
}
