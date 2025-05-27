import { TextElement, ImageElement } from "../types";

export const downloadCanvasAsDataURL = (
  dataURL: string,
  filename: string = "meme"
) => {
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const createImageElement = (
  imageUrl: string,
  x: number = 0,
  y: number = 0,
  width: number = 200,
  height: number = 200
): ImageElement => ({
  id: `image-${Date.now()}`,
  imageUrl,
  x,
  y,
  width,
  height,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  opacity: 1,
});

export const createTextElement = (
  text: string = "Sample Text",
  x: number = 100,
  y: number = 100,
  fontSize: number = 32
): TextElement => ({
  id: `text-${Date.now()}`,
  text,
  x,
  y,
  fontSize,
  fontFamily: "Impact",
  color: "#ffffff",
  strokeColor: "#000000",
  strokeWidth: 2,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  textAlign: "center",
  fontWeight: "bold",
  fontStyle: "normal",
});

export const getCanvasCenter = (canvasWidth: number, canvasHeight: number) => ({
  x: canvasWidth / 2,
  y: canvasHeight / 2,
});

export const fitImageToCanvas = (
  imageWidth: number,
  imageHeight: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  const scaleX = canvasWidth / imageWidth;
  const scaleY = canvasHeight / imageHeight;
  const scale = Math.min(scaleX, scaleY);

  return {
    width: imageWidth * scale,
    height: imageHeight * scale,
    scale,
  };
};
