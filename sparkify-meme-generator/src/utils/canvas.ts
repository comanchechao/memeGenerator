import { fabric } from "fabric";
import { CanvasState, TextElement, ImageElement } from "../types";

export const createCanvas = (
  canvasElement: HTMLCanvasElement,
  width: number,
  height: number
): fabric.Canvas => {
  const canvas = new fabric.Canvas(canvasElement, {
    width,
    height,
    backgroundColor: "#ffffff",
    preserveObjectStacking: true,
  });

  // Enable object controls
  canvas.selection = true;
  canvas.hoverCursor = "pointer";
  canvas.moveCursor = "pointer";

  return canvas;
};

export const addTextToCanvas = (
  canvas: fabric.Canvas,
  textElement: TextElement
): fabric.Text => {
  const text = new fabric.Text(textElement.text, {
    left: textElement.x,
    top: textElement.y,
    fontSize: textElement.fontSize,
    fontFamily: textElement.fontFamily,
    fill: textElement.color,
    stroke: textElement.strokeColor,
    strokeWidth: textElement.strokeWidth,
    angle: textElement.rotation,
    scaleX: textElement.scaleX,
    scaleY: textElement.scaleY,
    textAlign: textElement.textAlign,
    fontWeight: textElement.fontWeight,
    fontStyle: textElement.fontStyle,
    selectable: true,
    editable: true,
    hasControls: true,
    hasBorders: true,
  });

  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();

  return text;
};

export const addImageToCanvas = (
  canvas: fabric.Canvas,
  imageElement: ImageElement
): Promise<fabric.Image> => {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(
      imageElement.imageUrl,
      (img) => {
        if (!img) {
          reject(new Error("Failed to load image"));
          return;
        }

        img.set({
          left: imageElement.x,
          top: imageElement.y,
          scaleX: imageElement.scaleX,
          scaleY: imageElement.scaleY,
          angle: imageElement.rotation,
          opacity: imageElement.opacity,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();

        resolve(img);
      },
      {
        crossOrigin: "anonymous",
      }
    );
  });
};

export const exportCanvasAsImage = (
  canvas: fabric.Canvas,
  format: "png" | "jpeg" = "png",
  quality: number = 1
): string => {
  return canvas.toDataURL({
    format,
    quality,
    multiplier: 1,
  });
};

export const exportCanvasAsBlob = (
  canvas: fabric.Canvas,
  format: "png" | "jpeg" = "png",
  quality: number = 1
): Promise<Blob> => {
  return new Promise((resolve) => {
    canvas.toCanvasElement().toBlob(
      (blob) => {
        resolve(blob!);
      },
      `image/${format}`,
      quality
    );
  });
};

export const downloadCanvasAsImage = async (
  canvas: fabric.Canvas,
  filename: string = "meme",
  format: "png" | "jpeg" = "png"
) => {
  const blob = await exportCanvasAsBlob(canvas, format);
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export const clearCanvas = (canvas: fabric.Canvas): void => {
  canvas.clear();
  canvas.backgroundColor = "#ffffff";
  canvas.renderAll();
};

export const deleteSelectedObject = (canvas: fabric.Canvas): void => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
    canvas.renderAll();
  }
};

export const duplicateSelectedObject = (canvas: fabric.Canvas): void => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.clone((cloned: fabric.Object) => {
      cloned.set({
        left: (cloned.left || 0) + 10,
        top: (cloned.top || 0) + 10,
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
    });
  }
};

export const bringToFront = (canvas: fabric.Canvas): void => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.bringToFront(activeObject);
    canvas.renderAll();
  }
};

export const sendToBack = (canvas: fabric.Canvas): void => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.sendToBack(activeObject);
    canvas.renderAll();
  }
};

export const centerObject = (canvas: fabric.Canvas): void => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.centerObject(activeObject);
    canvas.renderAll();
  }
};
