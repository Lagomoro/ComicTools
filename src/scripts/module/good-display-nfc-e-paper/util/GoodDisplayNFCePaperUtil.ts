// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------
import { Color } from 'src/scripts/common/graphics';
import {
  E_PAPER_ALGORITHM_COLOR_SET,
  EPaperAlgorithm
} from 'src/scripts/module/good-display-nfc-e-paper/interface/common';
// ================================================================================

// ================================================================================
//# region MathUtil
// --------------------------------------------------------------------------------
export class MathUtil {
  // ------------------------------------------------------------------------------
  // * Function
  // ------------------------------------------------------------------------------
  //# region Dithering
  // ------------------------------------------------------------------------------
  private static _getNearestColor(colorSet: Color[], source: Color): Color {
    const output = new Color(0, 0, 0);
    output.setColor(colorSet[0]);

    for(const color of colorSet){
      if(color.distanceColor(source) < output.distanceColor(source)){
        output.setColor(color);
      }
    }

    return output;
  };

  public static applyDithering(imageData: ImageData, algorithm: EPaperAlgorithm): Color {
    const colorSet: Color[] = E_PAPER_ALGORITHM_COLOR_SET[algorithm];

    switch (algorithm) {
      case EPaperAlgorithm.BlackWhite:
      case EPaperAlgorithm.ThreeColors:
      case EPaperAlgorithm.FourColors:
      case EPaperAlgorithm.SixColors:
      case EPaperAlgorithm.FourGrey:
      case EPaperAlgorithm.SixteenGrey:
        return _applyErrorDiffusionDithering(imageData, colorSet);
      case EPaperAlgorithm.BlueNoise:
        return _applyBlueNoiseDithering(imageData, colorSet);
      case EPaperAlgorithm.FloydSteinberg:
        return _applyFloydSteinbergDithering(imageData, colorSet);
      case EPaperAlgorithm.Atkinson:
        return _applyAtkinsonDithering(imageData, colorSet);
      default:
        return _applyErrorDiffusionDithering(imageData, colorSet);
    }
  };

  private static _applyDithering(imageData: ImageData, colorSet: Color[], (source: ImageData, target: ImageData, colorSet: Color[]) => ImageData): ImageData {
    const target = new ImageData(Uint8ClampedArray.from(Array.from(imageData.data)), imageData.width, imageData.height, { colorSpace: imageData.colorSpace });

    const width = imageData.width;
    const height = imageData.height;
    const data = output.data;

    const buffer = Uint8ClampedArray.from(Array.from(imageData.data));
  }


  private static _applyErrorDiffusionDithering(imageData: ImageData, colorSet: Color[]) {
    const width = imageData.width;
    const height = imageData.height;
    const pixels = imageData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const oldPixel = {
          r: pixels[index],
          g: pixels[index + 1],
          b: pixels[index + 2]
        };
        const newPixel = findNearestColor(oldPixel, colorSet);

        // Set new pixel color
        pixels[index] = newPixel.r;
        pixels[index + 1] = newPixel.g;
        pixels[index + 2] = newPixel.b;

        // Apply error diffusion to neighboring pixels
        distributeError(pixels, canvas.width, canvas.height, x, y, oldPixel, newPixel);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  private static _distributeError(pixels, width, height, x, y, oldPixel, newPixel) {
    const quantError = {
      r: oldPixel.r - newPixel.r,
      g: oldPixel.g - newPixel.g,
      b: oldPixel.b - newPixel.b
    };

    const errorWeight1 = 7 / 16;
    const errorWeight2 = 3 / 16;
    const errorWeight3 = 5 / 16;
    const errorWeight4 = 1 / 16;

    // Right neighbor
    if (x + 1 < width) {
      applyError(pixels, width, height, x + 1, y, quantError, errorWeight1);
    }
    // Bottom-left neighbor
    if (x > 0 && y + 1 < height) {
      applyError(pixels, width, height, x - 1, y + 1, quantError, errorWeight2);
    }
    // Bottom neighbor
    if (y + 1 < height) {
      applyError(pixels, width, height, x, y + 1, quantError, errorWeight3);
    }
    // Bottom-right neighbor
    if (x + 1 < width && y + 1 < height) {
      applyError(pixels, width, height, x + 1, y + 1, quantError, errorWeight4);
    }
  }




  function applyDithering() {
    const option = ditherOptions.value;
    const colors = getColors(option);

    if (option === 'blue-noise-black-white') {
      applyBlueNoiseDithering(colors);
    } else if (option === 'floyd-steinberg') {
      applyFloydSteinbergDithering(colors);
    } else if (option === 'atkinson') {
      applyAtkinsonDithering(colors);
    } else {
      applyErrorDiffusionDithering(colors);
    }
  }

  function getColors(option) {
    switch (option) {
      case 'black-white':
        return [
          { r: 0, g: 0, b: 0 },       // 榛戣壊 0x000000
          { r: 255, g: 255, b: 255 }  // 鐧借壊 0xffffff
        ];
      case 'black-white-red':
        return [
          { r: 0, g: 0, b: 0 },       // 榛戣壊 0x000000
          { r: 255, g: 255, b: 255 }, // 鐧借壊 0xffffff
          { r: 255, g: 0, b: 0 }      // 绾㈣壊 0xff0000
        ];
      case 'black-white-red-yellow':
        return [
          { r: 0, g: 0, b: 0 },       // 榛戣壊 0x000000
          { r: 255, g: 255, b: 255 }, // 鐧借壊 0xffffff
          { r: 255, g: 0, b: 0 },     // 绾㈣壊 0xff0000
          { r: 255, g: 255, b: 0 }    // 榛勮壊 0xffff00
        ];
      case '6-colors':
        return [
          { r: 0, g: 0, b: 0 },       // 榛戣壊 0x000000
          { r: 255, g: 255, b: 255 }, // 鐧借壊 0xffffff
          { r: 255, g: 255, b: 0 },   // 榛勮壊 0xffff00
          { r: 255, g: 0, b: 0 },     // 绾㈣壊 0xff0000
          { r: 0, g: 255, b: 0 },     // 缁胯壊 0x00ff00
          { r: 0, g: 0, b: 255 }      // 钃濊壊 0x0000ff
        ];
      case '4-gray':
        return [
          { r: 0, g: 0, b: 0 },       // 榛戣壊
          { r: 85, g: 85, b: 85 },    // 娣辩伆
          { r: 170, g: 170, b: 170 }, // 娴呯伆
          { r: 255, g: 255, b: 255 }  // 鐧借壊
        ];
      case '16-gray':
        return [
          { r: 0, g: 0, b: 0 },       // 榛戣壊
          { r: 17, g: 17, b: 17 },    // 娣辩伆1
          { r: 34, g: 34, b: 34 },    // 娣辩伆2
          { r: 51, g: 51, b: 51 },    // 娣辩伆3
          { r: 68, g: 68, b: 68 },    // 娣辩伆4
          { r: 85, g: 85, b: 85 },    // 娣辩伆5
          { r: 102, g: 102, b: 102 }, // 娣辩伆6
          { r: 119, g: 119, b: 119 }, // 娣辩伆7
          { r: 136, g: 136, b: 136 }, // 娴呯伆1
          { r: 153, g: 153, b: 153 }, // 娴呯伆2
          { r: 170, g: 170, b: 170 }, // 娴呯伆3
          { r: 187, g: 187, b: 187 }, // 娴呯伆4
          { r: 204, g: 204, b: 204 }, // 娴呯伆5
          { r: 221, g: 221, b: 221 }, // 娴呯伆6
          { r: 238, g: 238, b: 238 }, // 娴呯伆7
          { r: 255, g: 255, b: 255 }  // 鐧借壊
        ];
      case 'blue-noise-black-white':
        return [
          { r: 0, g: 0, b: 0 },       // 榛戣壊
          { r: 255, g: 255, b: 255 }  // 鐧借壊
        ];
      default:
        return [
          { r: 0, g: 0, b: 0 },       // 榛戣壊 0x000000
          { r: 255, g: 255, b: 255 }  // 鐧借壊
        ];
    }
  }

  function findNearestColor(pixel, colors) {
    let nearestColor = colors[0];
    let minDistance = colorDistance(pixel, colors[0]);
    for (let i = 1; i < colors.length; i++) {
      const distance = colorDistance(pixel, colors[i]);
      if (distance < minDistance) {
        minDistance = distance;
        nearestColor = colors[i];
      }
    }
    return nearestColor;
  }

  function colorDistance(c1, c2) {
    return Math.sqrt(
      Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
    );
  }

  function applyErrorDiffusionDithering(colors) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const oldPixel = {
          r: pixels[index],
          g: pixels[index + 1],
          b: pixels[index + 2]
        };
        const newPixel = findNearestColor(oldPixel, colors);

        // Set new pixel color
        pixels[index] = newPixel.r;
        pixels[index + 1] = newPixel.g;
        pixels[index + 2] = newPixel.b;

        // Apply error diffusion to neighboring pixels
        distributeError(pixels, canvas.width, canvas.height, x, y, oldPixel, newPixel);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function distributeError(pixels, width, height, x, y, oldPixel, newPixel) {
    const quantError = {
      r: oldPixel.r - newPixel.r,
      g: oldPixel.g - newPixel.g,
      b: oldPixel.b - newPixel.b
    };

    const errorWeight1 = 7 / 16;
    const errorWeight2 = 3 / 16;
    const errorWeight3 = 5 / 16;
    const errorWeight4 = 1 / 16;

    // Right neighbor
    if (x + 1 < width) {
      applyError(pixels, width, height, x + 1, y, quantError, errorWeight1);
    }
    // Bottom-left neighbor
    if (x > 0 && y + 1 < height) {
      applyError(pixels, width, height, x - 1, y + 1, quantError, errorWeight2);
    }
    // Bottom neighbor
    if (y + 1 < height) {
      applyError(pixels, width, height, x, y + 1, quantError, errorWeight3);
    }
    // Bottom-right neighbor
    if (x + 1 < width && y + 1 < height) {
      applyError(pixels, width, height, x + 1, y + 1, quantError, errorWeight4);
    }
  }

  function applyError(pixels, width, height, x, y, quantError, weight) {
    const index = (y * width + x) * 4;
    pixels[index] = clamp(pixels[index] + quantError.r * weight);
    pixels[index + 1] = clamp(pixels[index + 1] + quantError.g * weight);
    pixels[index + 2] = clamp(pixels[index + 2] + quantError.b * weight);
  }

  function applyBlueNoiseDithering(colors) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const noise = generateBlueNoise(canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const threshold = noise[y][x];

        // Convert RGB to grayscale
        const grayscale = pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114;

        // Thresholding
        const newColor = grayscale + threshold > 255 ? 255 : 0;

        // Set new pixel color
        pixels[index] = newColor;
        pixels[index + 1] = newColor;
        pixels[index + 2] = newColor;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function generateBlueNoise(width, height) {
    const noise = new Array(height);
    for (let y = 0; y < height; y++) {
      noise[y] = new Array(width);
      for (let x = 0; x < width; x++) {
        noise[y][x] = Math.random() * 255;
      }
    }
    return noise;
  }

  function applyFloydSteinbergDithering(colors) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const oldPixel = {
          r: pixels[index],
          g: pixels[index + 1],
          b: pixels[index + 2]
        };
        const newPixel = findNearestColor(oldPixel, colors);

        // Set new pixel color
        pixels[index] = newPixel.r;
        pixels[index + 1] = newPixel.g;
        pixels[index + 2] = newPixel.b;

        // Calculate quantization error
        const quantErrorR = oldPixel.r - newPixel.r;
        const quantErrorG = oldPixel.g - newPixel.g;
        const quantErrorB = oldPixel.b - newPixel.b;

        // Apply error diffusion
        distributeFloydSteinbergError(pixels, canvas.width, canvas.height, x, y, quantErrorR, quantErrorG, quantErrorB);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function distributeFloydSteinbergError(pixels, width, height, x, y, quantErrorR, quantErrorG, quantErrorB) {
    // Floyd-Steinberg weights
    const errorWeight1 = 7 / 16;
    const errorWeight2 = 3 / 16;
    const errorWeight3 = 5 / 16;
    const errorWeight4 = 1 / 16;

    // Right neighbor
    if (x + 1 < width) {
      applyFSError(pixels, width, height, x + 1, y, quantErrorR, quantErrorG, quantErrorB, errorWeight1);
    }
    // Bottom-left neighbor
    if (x > 0 && y + 1 < height) {
      applyFSError(pixels, width, height, x - 1, y + 1, quantErrorR, quantErrorG, quantErrorB, errorWeight2);
    }
    // Bottom neighbor
    if (y + 1 < height) {
      applyFSError(pixels, width, height, x, y + 1, quantErrorR, quantErrorG, quantErrorB, errorWeight3);
    }
    // Bottom-right neighbor
    if (x + 1 < width && y + 1 < height) {
      applyFSError(pixels, width, height, x + 1, y + 1, quantErrorR, quantErrorG, quantErrorB, errorWeight4);
    }
  }

  function applyFSError(pixels, width, height, x, y, quantErrorR, quantErrorG, quantErrorB, weight) {
    const index = (y * width + x) * 4;
    pixels[index] = clamp(pixels[index] + quantErrorR * weight);
    pixels[index + 1] = clamp(pixels[index + 1] + quantErrorG * weight);
    pixels[index + 2] = clamp(pixels[index + 2] + quantErrorB * weight);
  }

  function applyAtkinsonDithering(colors) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const oldPixel = {
          r: pixels[index],
          g: pixels[index + 1],
          b: pixels[index + 2]
        };
        const newPixel = findNearestColor(oldPixel, colors);

        // Set new pixel color
        pixels[index] = newPixel.r;
        pixels[index + 1] = newPixel.g;
        pixels[index + 2] = newPixel.b;

        // Calculate quantization error
        const quantErrorR = oldPixel.r - newPixel.r;
        const quantErrorG = oldPixel.g - newPixel.g;
        const quantErrorB = oldPixel.b - newPixel.b;

        // Apply error diffusion
        distributeFloydSteinbergError(pixels, canvas.width, canvas.height, x, y, quantErrorR, quantErrorG, quantErrorB);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function distributeFloydSteinbergError(pixels, width, height, x, y, quantErrorR, quantErrorG, quantErrorB) {
    // Floyd-Steinberg weights
    const errorWeight1 = 7 / 16;
    const errorWeight2 = 3 / 16;
    const errorWeight3 = 5 / 16;
    const errorWeight4 = 1 / 16;

    // Right neighbor
    if (x + 1 < width) {
      applyFSError(pixels, width, height, x + 1, y, quantErrorR, quantErrorG, quantErrorB, errorWeight1);
    }
    // Bottom-left neighbor
    if (x > 0 && y + 1 < height) {
      applyFSError(pixels, width, height, x - 1, y + 1, quantErrorR, quantErrorG, quantErrorB, errorWeight2);
    }
    // Bottom neighbor
    if (y + 1 < height) {
      applyFSError(pixels, width, height, x, y + 1, quantErrorR, quantErrorG, quantErrorB, errorWeight3);
    }
    // Bottom-right neighbor
    if (x + 1 < width && y + 1 < height) {
      applyFSError(pixels, width, height, x + 1, y + 1, quantErrorR, quantErrorG, quantErrorB, errorWeight4);
    }
  }

  function applyFSError(pixels, width, height, x, y, quantErrorR, quantErrorG, quantErrorB, weight) {
    const index = (y * width + x) * 4;
    pixels[index] = clamp(pixels[index] + quantErrorR * weight);
    pixels[index + 1] = clamp(pixels[index + 1] + quantErrorG * weight);
    pixels[index + 2] = clamp(pixels[index + 2] + quantErrorB * weight);
  }

  function applyAtkinsonDithering(colors) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const oldPixel = {
          r: pixels[index],
          g: pixels[index + 1],
          b: pixels[index + 2]
        };
        const newPixel = findNearestColor(oldPixel, colors);

        // Set new pixel color
        pixels[index] = newPixel.r;
        pixels[index + 1] = newPixel.g;
        pixels[index + 2] = newPixel.b;

        // Calculate quantization error
        const quantErrorR = oldPixel.r - newPixel.r;
        const quantErrorG = oldPixel.g - newPixel.g;
        const quantErrorB = oldPixel.b - newPixel.b;

        // Apply error diffusion
        distributeAtkinsonError(pixels, canvas.width, canvas.height, x, y, quantErrorR, quantErrorG, quantErrorB);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function distributeAtkinsonError(pixels, width, height, x, y, quantErrorR, quantErrorG, quantErrorB) {
    // Atkinson weights
    const errorWeight1 = 1 / 8;
    const errorWeight2 = 1 / 8;
    const errorWeight3 = 1 / 8;
    const errorWeight4 = 1 / 8;
    const errorWeight5 = 1 / 8;
    const errorWeight6 = 1 / 8;
    const errorWeight7 = 1 / 8;

    // Right neighbor
    if (x + 1 < width) {
      applyAtkinsonError(pixels, width, height, x + 1, y, quantErrorR, quantErrorG, quantErrorB, errorWeight1);
    }
    // Right-right neighbor
    if (x + 2 < width) {
      applyAtkinsonError(pixels, width, height, x + 2, y, quantErrorR, quantErrorG, quantErrorB, errorWeight2);
    }
    // Bottom-left neighbor
    if (x > 0 && y + 1 < height) {
      applyAtkinsonError(pixels, width, height, x - 1, y + 1, quantErrorR, quantErrorG, quantErrorB, errorWeight3);
    }
    // Bottom neighbor
    if (y + 1 < height) {
      applyAtkinsonError(pixels, width, height, x, y + 1, quantErrorR, quantErrorG, quantErrorB, errorWeight4);
    }
    // Bottom-right neighbor
    if (x + 1 < width && y + 1 < height) {
      applyAtkinsonError(pixels, width, height, x + 1, y + 1, quantErrorR, quantErrorG, quantErrorB, errorWeight5);
    }
    // Bottom-right-right neighbor
    if (x + 2 < width && y + 1 < height) {
      applyAtkinsonError(pixels, width, height, x + 2, y + 1, quantErrorR, quantErrorG, quantErrorB, errorWeight6);
    }
    // Bottom-bottom neighbor
    if (y + 2 < height) {
      applyAtkinsonError(pixels, width, height, x, y + 2, quantErrorR, quantErrorG, quantErrorB, errorWeight7);
    }
  }

  function applyAtkinsonError(pixels, width, height, x, y, quantErrorR, quantErrorG, quantErrorB, weight) {
    const index = (y * width + x) * 4;
    pixels[index] = clamp(pixels[index] + quantErrorR * weight);
    pixels[index + 1] = clamp(pixels[index + 1] + quantErrorG * weight);
    pixels[index + 2] = clamp(pixels[index + 2] + quantErrorB * weight);
  }

  function clamp(value, min = 0, max = 255) {
    return Math.max(min, Math.min(value, max));
  }


  public static toInkScreen(imageData: ImageData, colorSet: Color[]): ImageData {
    const output = new ImageData(Uint8ClampedArray.from(Array.from(imageData.data)), imageData.width, imageData.height, { colorSpace: imageData.colorSpace });

    const width = imageData.width;
    const height = imageData.height;
    const data = output.data;

    const buffer = Uint8ClampedArray.from(Array.from(imageData.data));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;

        // 获取当前像素原始值
        const oldR = buffer[idx];
        const oldG = buffer[idx+1];
        const oldB = buffer[idx+2];

        // 寻找最近颜色[1,3](@ref)
        let minDist = Infinity;
        let closest = colorSet[0];
        for (const color of colorSet) {
          const dist = color.distance(oldR, oldG, oldB);
          if (dist < minDist) {
            minDist = dist;
            closest = color;
          }
        }

        // 计算量化误差[3,4](@ref)
        const errR = oldR - closest.r;
        const errG = oldG - closest.g;
        const errB = oldB - closest.b;

        // 更新目标像素值
        data[idx] = closest.r;
        data[idx+1] = closest.g;
        data[idx+2] = closest.b;

        // 误差扩散（Floyd-Steinberg系数）[1,3](@ref)
        const propagate = (dx: number, dy: number, factor: number) => {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nIdx = (ny * width + nx) * 4;
            buffer[nIdx] += errR * factor;
            buffer[nIdx+1] += errG * factor;
            buffer[nIdx+2] += errB * factor;
          }
        };

        propagate(1, 0, 7/16);  // 右侧像素
        propagate(-1, 1, 3/16); // 左下像素
        propagate(0, 1, 5/16);  // 正下像素
        propagate(1, 1, 1/16);  // 右下像素
      }
    }

    return output;
  };

//
//   public static toInkScreen(imageData: ImageData, colorSet: Color[]): ImageData {
//     const output = new ImageData(Uint8ClampedArray.from(Array.from(imageData.data)), imageData.width, imageData.height, { colorSpace: imageData.colorSpace });
//
//     const width = imageData.width;
//     const height = imageData.height;
//     const data = imageData.data;
//
//     const tempColorArray: Color[] = [];
//
//     for (let i = 0; i < data.length; i += 4) {
//       tempColorArray.push(new Color(data[i], data[i + 1], data[i + 2]));
//     }
//
//     return output;
//
// /*
//     var curPal = [new SKColor(0, 0, 0), new SKColor(255, 255, 255), new SKColor(255, 0, 0)];
//
//     var GetErr = function (r, g, b, stdCol) {
//       r -= stdCol.Red;
//       g -= stdCol.Green;
//       b -= stdCol.Blue;
//
//       return r * r + g * g + b * b;
//     }
//
//     var GetNear = function (r, g, b) {
//       var ind = 0;
//       var err = GetErr(r, g, b, curPal[0]);
//
//       for (var i = 1; i < curPal.length; i++)
//       {
//         var cur = GetErr(r, g, b, curPal[i]);
//         if (cur < err) { err = cur; ind = i; }
//       }
//
//       return ind;
//     }*/
//
//     var AddVal = function (e, i, r, g, b, k) {
//       var index = i * 3;
//       e[index] = (r * k) / 16 + e[index];
//       e[index + 1] = (g * k) / 16 + e[index + 1];
//       e[index + 2] = (b * k) / 16 + e[index + 2];
//     }
//
//     this.Dither = function (isDither,brightness, contrast, solidColor) {
//       var dstArr = [];
//
//       var index = 0;
//
//       var aInd = 0;
//       var bInd = 1;
//
//       var errArr = [];
//
//       errArr[0] = [];
//       errArr[1] = [];
//
//       var color = null;
//
//       if (solidColor != '') {
//         solidColor = solidColor.toLowerCase();
//
//         if (solidColor == 'black' || solidColor == '#000' || solidColor == '#000000') {
//           curPal = [new SKColor(0, 0, 0), new SKColor(255, 255, 255)];
//           color = new SKColor(0, 0, 0);
//         } else if (solidColor == 'red' || solidColor == '#ff0' || solidColor == '#ff0000') {
//           curPal = [new SKColor(0, 0, 0), new SKColor(255, 255, 255)];
//           color = new SKColor(255, 0, 0);
//         }
//       }
//
//       var degree_con = contrast;
//       var degree_bri = brightness;
//       var contrastF = 0;
//
//       if (degree_con != 0) {
//         if (degree_con < -100) degree_con = -100;
//         if (degree_con > 100) degree_con = 100;
//
//         contrastF = (100.0 + degree_con) / 100.0;
//         contrastF *= contrastF;
//       }
//
//       if (degree_bri != 0) {
//         if (degree_bri < -255) degree_bri = -255;
//         if (degree_bri > 255) degree_bri = 255;
//       }
//
//       for (var i = 0; i < dstW; i++)
//       {
//         errArr[bInd][3 * i] = 0;
//         errArr[bInd][3 * i + 1] = 0;
//         errArr[bInd][3 * i + 2] = 0;
//       }
//
//       for (var j = 0; j < dstH; j++)
//       {
//         if (j >= srcH) {
//           for (var i = 0; i < dstW; i++, index++)
//             dstArr[index] = curPal[(i + j) % 2 == 0 ? 1 : 0];
//
//           continue;
//         }
//
//         aInd = ((bInd = aInd) + 1) & 1;
//
//         for (var i = 0; i < dstW; i++)
//         {
//           errArr[bInd][3 * i] = 0;
//           errArr[bInd][3 * i + 1] = 0;
//           errArr[bInd][3 * i + 2] = 0;
//         }
//
//         for (var i = 0; i < dstW; i++)
//         {
//           if (i >= srcW) {
//             dstArr[index++] = curPal[(i + j) % 2 == 0 ? 1 : 0];
//             continue;
//           }
//
//           var srcPix = srcBmp[j * srcW + i];
//
//           if (degree_con != 0) {
//             var R = ((srcPix.Red / 255.0 - 0.5) * contrastF + 0.5) * 255;
//             var G = ((srcPix.Green / 255.0 - 0.5) * contrastF + 0.5) * 255;
//             var B = ((srcPix.Blue / 255.0 - 0.5) * contrastF + 0.5) * 255;
//
//             if (R < 0) R = 0;
//             if (R > 255) R = 255;
//
//             if (G < 0) G = 0;
//             if (G > 255) G = 255;
//
//             if (B < 0) B = 0;
//             if (B > 255) B = 255;
//
//             srcPix = new SKColor(R, G, B);
//           }
//
//           if (degree_bri != 0) {
//             var R = srcPix.Red + degree_bri;
//             var G = srcPix.Green + degree_bri;
//             var B = srcPix.Blue + degree_bri;
//
//             if (R < 0) R = 0;
//             if (R > 255) R = 255;
//
//             if (G < 0) G = 0;
//             if (G > 255) G = 255;
//
//             if (B < 0) B = 0;
//             if (B > 255) B = 255;
//
//             srcPix = new SKColor(R, G, B);
//           }
//
//           var r = srcPix.Red + errArr[aInd][3 * i];
//           var g = srcPix.Green + errArr[aInd][3 * i + 1];
//           var b = srcPix.Blue + errArr[aInd][3 * i + 2];
//
//           var colVal = curPal[GetNear(r, g, b)];
//
//           if (!isDither) {
//             colVal = srcPix;
//           }
//
//           dstArr[index++] = colVal;
//
//           if (isDither) {
//             r -= colVal.Red;
//             g -= colVal.Green;
//             b -= colVal.Blue;
//
//             if (i == 0) {
//               AddVal(errArr[bInd], (i), r, g, b, 7.0);
//               AddVal(errArr[bInd], (i + 1), r, g, b, 2.0);
//               AddVal(errArr[aInd], (i + 1), r, g, b, 7.0);
//             }
//             else if (i == dstW - 1) {
//               AddVal(errArr[bInd], (i - 1), r, g, b, 7.0);
//               AddVal(errArr[bInd], (i), r, g, b, 9.0);
//             } else {
//               AddVal(errArr[bInd], (i - 1), r, g, b, 3.0);
//               AddVal(errArr[bInd], (i), r, g, b, 5.0);
//               AddVal(errArr[bInd], (i + 1), r, g, b, 1.0);
//               AddVal(errArr[aInd], (i + 1), r, g, b, 7.0);
//             }
//           }
//         }
//       }
//
//       var j = 0;
//
//       for (var i = 0; i < dstArr.length * 4; i += 4) {
//         var tc = dstArr[j];
//
//         if (color != null) {
//           var gray = 0.299 * tc.Red + 0.587 * tc.Green + 0.114 * tc.Blue;
//
//           if (gray < 128) tc = color; else tc = new SKColor(255,255,255);
//         }
//
//         pixel[i] = tc.Red;
//         pixel[i + 1] = tc.Green;
//         pixel[i + 2] = tc.Blue;
//
//         j++;
//       }
//
//       ctx.putImageData(imageData, 0, 0);
//     }
//   };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
}
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================

// ================================================================================
// * Module exports
// --------------------------------------------------------------------------------
export default MathUtil;
// ================================================================================
