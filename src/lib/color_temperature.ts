import { Color, addColors, scaleColor } from './color';
export type ColorTemp = [number, Color];

export function temperatureToRGB(kelvin: number): Color {
  const leftSide = Array.from(ColorTemps).reverse().find(targetColorTemp => targetColorTemp[0] <= kelvin) || MinColorTemp;
  const rightSide = Array.from(ColorTemps).find(targetColorTemp => targetColorTemp[0] > kelvin) || MaxColorTemp;
  if (leftSide === rightSide) return leftSide[1];

  const progressFromLeftToRight = (kelvin - leftSide[0]) / (rightSide[0] - leftSide[0]);
  const interpolated = addColors(scaleColor(leftSide[1], (1 - progressFromLeftToRight)), scaleColor(rightSide[1], progressFromLeftToRight));

  return interpolated;
}

// TODO: use color function to make these shorter. define inline with list.
const K_1000: Color = {
  red: 255,
  green: 56,
  blue: 0,
} as const;
const K_2000: Color = {
  red: 255,
  green: 147,
  blue: 44
} as const;
const K_3300: Color = {
  red: 255,
  green: 190,
  blue: 126,
} as const;
const K_4000: Color = {
  red: 255,
  green: 209,
  blue: 163,
} as const;
const K_5500: Color = {
 red: 255,
 green: 236,
 blue: 224,
} as const;
const K_7000: Color = {
  red: 245,
  green: 243,
  blue: 255,
} as const;
const K_10000: Color = {
  red: 207,
  green: 218,
  blue: 255,
} as const;

const ColorTemps = [
  [1000, K_1000],
  [2000, K_2000],
  [3300, K_3300],
  [4000, K_4000],
  [5500, K_5500],
  [7000, K_7000],
  [10000, K_10000],
] as const;

const MinColorTemp = ColorTemps[0];
const MaxColorTemp = ColorTemps[ColorTemps.length - 1];
