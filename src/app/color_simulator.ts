import { scaleColor, filterColor, colorString } from '../lib/color'
import { temperatureToRGB } from '../lib/color_temperature';
import {
  White,
  Black,
  Red,
  Green,
  Blue,
  Yellow,
  Magenta,
  Cyan,
 } from '../lib/colors';

const DEFAULT_FILTER_STRENGTH: number = 1.0;
const DEFAULT_BRIGHTNESS: number = 1.0;
const DEFAULT_COLOR_TEMPERATURE: number = 4000;

function draw(brightness: number = 0.5, colorTemperature: number = DEFAULT_COLOR_TEMPERATURE, filterStrength: number = 1.0) {
  const CANVAS_HEIGHT = 200;
  const CANVAS_WIDTH = 1000;
  const BAR_HEIGHT = 100;
  const BAR_MARGIN = 25;

  const canvas = getCanvas("canvas");
  if (!canvas) return;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const context = canvas.getContext("2d");
  if (!context) return;

  const pureColors = [
    White,
    Black,
    Red,
    Green,
    Blue,
    Yellow,
    Magenta,
    Cyan,
  ];
  const lightSource = scaleColor(temperatureToRGB(colorTemperature), brightness);
  const barWidth: number = (CANVAS_WIDTH - (BAR_MARGIN * pureColors.length)) / pureColors.length;
  const accentHeight = BAR_HEIGHT * 0.75;
  const accentWidth = barWidth * 0.75;
  const subAccentWidth = accentWidth / 2;
  const subAccentHeight = accentHeight / 2;
  const squareSizeWithMargin = barWidth + BAR_MARGIN;

  let x = BAR_MARGIN, y = 0;
  const colorRows = [pureColors];
  colorRows.forEach(colorList => {
    colorList.forEach(color => {
      const main = scaleColor(filterColor(lightSource, scaleColor(color, 1.5), filterStrength), 1.0);
      const brighter = scaleColor(filterColor(lightSource, scaleColor(color, 1.75), filterStrength * 0.7), 1.2);
      const brightest = scaleColor(filterColor(lightSource, scaleColor(color, 2.0), filterStrength * 0.2), 1.4);
      context.fillStyle = colorString(main);
      context.fillRect(x, y, barWidth, BAR_HEIGHT);
      context.fillStyle = colorString(brighter);
      context.fillRect(x + (0.5 * barWidth) - (0.5 * accentWidth), y + (0.5 * BAR_HEIGHT) - (accentHeight * 0.5), accentWidth, accentHeight);
      context.fillStyle = colorString(brightest);
      context.fillRect(x + (0.5 * barWidth) - (0.5 * accentWidth - (0.5 * subAccentWidth)), y + (0.5 * BAR_HEIGHT) - (accentHeight * 0.5 - (0.5 * subAccentHeight)), subAccentWidth, subAccentHeight);

      x += squareSizeWithMargin;
    });
    y += squareSizeWithMargin;
    x = BAR_MARGIN;
  });
}

function getCanvas(canvasName: string): HTMLCanvasElement | undefined {
  const canvas = document.getElementById(canvasName);
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    throw new Error(`Cannot find canvas with id ${canvasName}`); }

  return canvas;
}


function setHooks(): void {
  let brightness: number = DEFAULT_BRIGHTNESS;
  let filterStrength: number = DEFAULT_FILTER_STRENGTH;
  let colorTemperature: number = DEFAULT_COLOR_TEMPERATURE;

  const brightnessInput = document.getElementById("brightness");
  if (!brightnessInput || !(brightnessInput instanceof HTMLInputElement)) {
    throw new Error("Brightness slider not found.");
  }

  const filterStrengthInput = document.getElementById("filter_strength");
  if (!filterStrengthInput || !(filterStrengthInput instanceof HTMLInputElement)) {
    throw new Error("Filter strength slider not found.");
  }

  const colorTemperatureInput = document.getElementById("color_temperature");
  if (!colorTemperatureInput || !(colorTemperatureInput instanceof HTMLInputElement)) {
    throw new Error("Color temperature slider not found.");
  }

  const refresh = () => {
    draw(brightness, colorTemperature, filterStrength);
  }

  brightnessInput.oninput = ((event: Event) => {
    brightness = +brightnessInput.value;
    refresh();
  });

  filterStrengthInput.oninput = ((event: Event) => {
    filterStrength = +filterStrengthInput.value;
    refresh();
  });

  colorTemperatureInput.oninput = ((event: Event) => {
    colorTemperature = +colorTemperatureInput.value;
    refresh();
  });
}

setHooks();

draw(
  DEFAULT_BRIGHTNESS,
  DEFAULT_COLOR_TEMPERATURE,
  DEFAULT_FILTER_STRENGTH,
);
