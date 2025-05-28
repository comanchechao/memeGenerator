import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image, Text, Transformer } from "react-konva";
import Konva from "konva";
import {
  CanvasState,
  CanvasMode,
  MemeTemplate,
  SparkyCharacter,
} from "../types";

interface CanvasProps {
  canvasState: CanvasState;
  onCanvasStateChange: (state: CanvasState) => void;
  currentMode: CanvasMode;
  selectedTemplate: MemeTemplate | null;
  selectedCharacter: SparkyCharacter | null;
  stageRef: React.RefObject<Konva.Stage>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  backgroundImage: HTMLImageElement | null;
  sparkyImage: HTMLImageElement | null;
  zoom: number;
  setZoom: (zoom: number) => void;
  sparkyPosition: { x: number; y: number };
  setSparkyPosition: (position: { x: number; y: number }) => void;
  textElements: Array<{
    id: string;
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
  }>;
  setTextElements: (
    elements: Array<{
      id: string;
      text: string;
      x: number;
      y: number;
      fontSize: number;
      fill: string;
      stroke: string;
      strokeWidth: number;
    }>
  ) => void;
  uploadedImages: Array<{
    id: string;
    image: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  setUploadedImages: (
    images: Array<{
      id: string;
      image: HTMLImageElement;
      x: number;
      y: number;
      width: number;
      height: number;
    }>
  ) => void;
  isImageLoading: boolean;
  addText: () => void;
  deleteSelected: () => void;
  downloadImage: () => void;
  clearCanvas: () => void;
}

const Canvas: React.FC<CanvasProps> = ({
  canvasState,
  selectedTemplate,
  selectedCharacter,
  stageRef,
  selectedId,
  setSelectedId,
  backgroundImage,
  sparkyImage,
  zoom,
  setZoom,
  sparkyPosition,
  setSparkyPosition,
  textElements,
  setTextElements,
  uploadedImages,
  setUploadedImages,
  isImageLoading,
  addText,
  deleteSelected,
  downloadImage,
  clearCanvas,
}) => {
  const transformerRef = useRef<Konva.Transformer>(null);

  const updateText = (id: string, newText: string) => {
    setTextElements(
      textElements.map((text) =>
        text.id === id ? { ...text, text: newText } : text
      )
    );
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  useEffect(() => {
    if (transformerRef.current) {
      const stage = stageRef.current;
      if (selectedId && stage) {
        const selectedNode = stage.findOne(`#${selectedId}`);
        if (selectedNode) {
          transformerRef.current.nodes([selectedNode]);
          transformerRef.current.getLayer()?.batchDraw();
        }
      } else {
        transformerRef.current.nodes([]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }
  }, [selectedId]);

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  return (
    <div className="flex flex-col items-center space-y-4 lg:space-y-6 p-4 lg:p-8">
      <div className="flex flex-wrap items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 w-full max-w-4xl">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={addText}
            className="flex items-center gap-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-md transition-colors text-sm font-medium touch-manipulation"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">Text</span>
          </button>

          <button
            onClick={deleteSelected}
            disabled={!selectedId}
            className="flex items-center gap-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-md transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="hidden sm:inline">Delete</span>
          </button>

          <button
            onClick={downloadImage}
            className="flex items-center gap-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-200 rounded-md transition-colors text-sm font-medium touch-manipulation"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={clearCanvas}
            className="flex items-center gap-1 px-3 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-200 rounded-md transition-colors text-sm font-medium touch-manipulation"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={addText}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-md transition-colors text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Text
          </button>

          <button
            onClick={deleteSelected}
            disabled={!selectedId}
            className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-md transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Delete
          </button>

          <div className="w-px h-6 bg-white/20"></div>

          <button
            onClick={downloadImage}
            className="flex items-center gap-2 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-200 rounded-md transition-colors text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Save
          </button>

          <button
            onClick={clearCanvas}
            className="flex items-center gap-2 px-3 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-200 rounded-md transition-colors text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear
          </button>

          <div className="w-px h-6 bg-white/20"></div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 ml-auto">
          <svg
            className="w-3 h-3 lg:w-4 lg:h-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10h-3m-3 0h3m0 0V7m0 3v3"
            />
          </svg>

          <input
            type="range"
            min="25"
            max="200"
            value={zoom}
            onChange={(e) => handleZoomChange(Number(e.target.value))}
            className="w-16 lg:w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((zoom - 25) / (200 - 25)) * 100}%, #4b5563 ${((zoom - 25) / (200 - 25)) * 100}%, #4b5563 100%)`,
            }}
          />

          <span className="text-xs text-gray-300 font-medium min-w-[2.5rem] lg:min-w-[3rem] text-center">
            {zoom}%
          </span>
        </div>
      </div>

      <div className="canvas-container border border-white/20 bg-dark-800 relative shadow-dark rounded-xl overflow-hidden w-full max-w-4xl">
        <div
          className="canvas-wrapper overflow-auto touch-pan-x touch-pan-y"
          style={{
            width: canvasState.width * (zoom / 100),
            height: canvasState.height * (zoom / 100),
            maxWidth: "100%",
            maxHeight: "60vh",
            minHeight: "300px",
          }}
        >
          <Stage
            ref={stageRef}
            width={canvasState.width * (zoom / 100)}
            height={canvasState.height * (zoom / 100)}
            onClick={handleStageClick}
            onTap={handleStageClick}
          >
            <Layer>
              {backgroundImage && (
                <Image
                  image={backgroundImage}
                  width={canvasState.width * (zoom / 100)}
                  height={canvasState.height * (zoom / 100)}
                  listening={false}
                />
              )}

              {sparkyImage && (
                <Image
                  id="sparky"
                  image={sparkyImage}
                  x={sparkyPosition.x * (zoom / 100)}
                  y={sparkyPosition.y * (zoom / 100)}
                  width={150 * (zoom / 100)}
                  height={150 * (zoom / 100)}
                  draggable
                  onClick={() => handleSelect("sparky")}
                  onTap={() => handleSelect("sparky")}
                  onDragEnd={(e) => {
                    const newX = e.target.x() / (zoom / 100);
                    const newY = e.target.y() / (zoom / 100);
                    setSparkyPosition({ x: newX, y: newY });
                  }}
                />
              )}

              {textElements.map((textEl) => (
                <Text
                  key={textEl.id}
                  id={textEl.id}
                  text={textEl.text}
                  x={textEl.x * (zoom / 100)}
                  y={textEl.y * (zoom / 100)}
                  fontSize={textEl.fontSize * (zoom / 100)}
                  fill={textEl.fill}
                  stroke={textEl.stroke}
                  strokeWidth={textEl.strokeWidth * (zoom / 100)}
                  fontFamily="Impact"
                  fontStyle="bold"
                  align="center"
                  draggable
                  onClick={() => handleSelect(textEl.id)}
                  onTap={() => handleSelect(textEl.id)}
                  onDragEnd={(e) => {
                    const newX = e.target.x() / (zoom / 100);
                    const newY = e.target.y() / (zoom / 100);
                    setTextElements(
                      textElements.map((text) =>
                        text.id === textEl.id
                          ? { ...text, x: newX, y: newY }
                          : text
                      )
                    );
                  }}
                  onDblClick={(e) => {
                    const textNode = e.target as any;
                    textNode.hide();

                    const textarea = document.createElement("textarea");
                    document.body.appendChild(textarea);

                    const stage = textNode.getStage();
                    const stageBox = stage?.container().getBoundingClientRect();
                    const areaPosition = {
                      x: (stageBox?.left || 0) + textNode.x(),
                      y: (stageBox?.top || 0) + textNode.y(),
                    };

                    textarea.value = textNode.text();
                    textarea.style.position = "absolute";
                    textarea.style.top = areaPosition.y + "px";
                    textarea.style.left = areaPosition.x + "px";
                    textarea.style.width = textNode.width() + "px";
                    textarea.style.height = textNode.height() + "px";
                    textarea.style.fontSize = textNode.fontSize() + "px";
                    textarea.style.border = "none";
                    textarea.style.padding = "0px";
                    textarea.style.margin = "0px";
                    textarea.style.overflow = "hidden";
                    textarea.style.background = "none";
                    textarea.style.outline = "none";
                    textarea.style.resize = "none";
                    textarea.style.lineHeight = "1";
                    textarea.style.fontFamily = "Impact";
                    textarea.style.transformOrigin = "left top";
                    textarea.style.textAlign = "center";
                    textarea.style.color = textEl.fill;

                    textarea.focus();

                    const removeTextarea = () => {
                      textarea.parentNode?.removeChild(textarea);
                      textNode.show();
                      updateText(textEl.id, textarea.value);
                    };

                    textarea.addEventListener("keydown", (e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        removeTextarea();
                      }
                      if (e.key === "Escape") {
                        removeTextarea();
                      }
                    });

                    textarea.addEventListener("blur", removeTextarea);
                  }}
                />
              ))}

              {uploadedImages.map((imageEl) => (
                <Image
                  key={imageEl.id}
                  id={imageEl.id}
                  image={imageEl.image}
                  x={imageEl.x * (zoom / 100)}
                  y={imageEl.y * (zoom / 100)}
                  width={imageEl.width * (zoom / 100)}
                  height={imageEl.height * (zoom / 100)}
                  draggable
                  onClick={() => handleSelect(imageEl.id)}
                  onTap={() => handleSelect(imageEl.id)}
                  onDragEnd={(e) => {
                    const newX = e.target.x() / (zoom / 100);
                    const newY = e.target.y() / (zoom / 100);
                    setUploadedImages(
                      uploadedImages.map((img) =>
                        img.id === imageEl.id
                          ? { ...img, x: newX, y: newY }
                          : img
                      )
                    );
                  }}
                />
              ))}

              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (newBox.width < 5 || newBox.height < 5) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            </Layer>
          </Stage>
        </div>

        {!backgroundImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-dashed border-purple-500/30 rounded-xl">
            <div className="text-center p-4 lg:p-6 max-w-md animate-fade-in">
              <div className="mx-auto w-12 h-12 lg:w-16 lg:h-16 mb-3 lg:mb-4 bg-purple-gradient rounded-full flex items-center justify-center animate-pulse-glow">
                <svg
                  className="w-6 h-6 lg:w-8 lg:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h3 className="text-base lg:text-lg font-bold gradient-text mb-2">
                Choose a Background to Start
              </h3>

              <p className="text-xs lg:text-sm text-gray-400 mb-3 lg:mb-4 leading-relaxed">
                Select a meme template <span className="lg:hidden">below</span>
                <span className="hidden lg:inline">from the sidebar</span> to
                begin creating your masterpiece. Add text, characters, and make
                it uniquely yours!
              </p>

              <div className="flex items-center justify-center text-xs text-purple-400 animate-float">
                <svg
                  className="w-3 h-3 lg:w-4 lg:h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <span className="lg:hidden">Browse templates below</span>
                <span className="hidden lg:inline">
                  Browse templates on the left
                </span>
              </div>
            </div>
          </div>
        )}

        {selectedId && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white border border-white/20">
            {selectedId === "sparky"
              ? "Character"
              : selectedId.startsWith("image-")
                ? "Image"
                : "Text"}
          </div>
        )}

        {isImageLoading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-50">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <div className="text-center">
                <p className="text-white font-medium text-sm">
                  Processing Image...
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  Please wait while we load your image
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
