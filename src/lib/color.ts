// TODO: brand type of color number
export type Color = {
  red: number,
  green: number,
  blue: number,
}

export function color(red: number, green: number, blue: number): Color {
  return {
    red,
    green,
    blue,
  }
}

export function scaleColor(color: Color, scalar: number = 1.0) {
  return {
    red: color.red * scalar,
    green: color.green * scalar,
    blue: color.blue * scalar,
  };
}

export function addColors(colorA: Color, colorB: Color) {
  return {
    red: colorA.red + colorB.red,
    green: colorA.green + colorB.green,
    blue: colorA.blue + colorB.blue,
  };
}

// Filter Strength goes from 0 to 1.
export function filterColor(input: Color, filter: Color, filterStrength: number = 0.5): Color {
  if (filterStrength < 0 || filterStrength > 1) {
    throw new Error("Filter strength must be between 0 and 1");
  }

  return {
    red: filterStrength * Math.min(input.red, filter.red) + (1 - filterStrength) * input.red,
    green: filterStrength * Math.min(input.green, filter.green) + (1 - filterStrength) * input.green,
    blue: filterStrength * Math.min(input.blue, filter.blue) + (1 - filterStrength) * input.blue,
  };
}

// Ensures colorValue is between 0 and 255.
export function clampColorValue(colorValue: number) {
  return Math.max(0, Math.min(colorValue, 255));
}

export function colorString(color: Color): string {
  return `rgb(${color.red}, ${color.green}, ${color.blue})`;
}
