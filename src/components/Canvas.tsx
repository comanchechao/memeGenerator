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
}

const Canvas: React.FC<CanvasProps> = ({
  canvasState,
  selectedTemplate,
  selectedCharacter,
}) => {
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [sparkyImage, setSparkyImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState<number>(100);
  const [sparkyPosition, setSparkyPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [textElements, setTextElements] = useState<
    Array<{
      id: string;
      text: string;
      x: number;
      y: number;
      fontSize: number;
      fill: string;
      stroke: string;
      strokeWidth: number;
    }>
  >([]);

  useEffect(() => {
    if (selectedTemplate) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setBackgroundImage(img);
      };
      img.src = selectedTemplate.imageUrl;
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (selectedCharacter) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setSparkyImage(img);
        setSparkyPosition({
          x: canvasState.width / 2 - 75,
          y: canvasState.height / 2 - 75,
        });
      };
      img.src = selectedCharacter.imageUrl;
    }
  }, [selectedCharacter, canvasState.width, canvasState.height]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const addText = () => {
    const newText = {
      id: `text-${Date.now()}`,
      text: "Double click to edit",
      x: canvasState.width / 2 - 80,
      y: canvasState.height / 2,
      fontSize: 28,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 2,
    };
    setTextElements([...textElements, newText]);
    setSelectedId(newText.id);
  };

  const updateText = (id: string, newText: string) => {
    setTextElements(
      textElements.map((text) =>
        text.id === id ? { ...text, text: newText } : text
      )
    );
  };

  const deleteSelected = () => {
    if (selectedId) {
      if (selectedId === "sparky") {
        setSparkyImage(null);
        setSparkyPosition({ x: 0, y: 0 });
      } else if (selectedId.startsWith("text-")) {
        setTextElements(textElements.filter((text) => text.id !== selectedId));
      }
      setSelectedId(null);
    }
  };

  const downloadImage = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      const link = document.createElement("a");
      link.download = "sparkify-meme.png";
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearCanvas = () => {
    setBackgroundImage(null);
    setSparkyImage(null);
    setTextElements([]);
    setSelectedId(null);
    setSparkyPosition({ x: 0, y: 0 });
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
    <div className="flex flex-col items-center space-y-6 p-8">
      {/* Controls */}
      <div className="flex items-center gap-2 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
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

        {/* Zoom Controls */}
        <div className="flex items-center gap-3 px-3 py-2">
          <svg
            className="w-4 h-4 text-gray-300"
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
            className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((zoom - 25) / (200 - 25)) * 100}%, #4b5563 ${((zoom - 25) / (200 - 25)) * 100}%, #4b5563 100%)`,
            }}
          />

          <span className="text-xs text-gray-300 font-medium min-w-[3rem] text-center">
            {zoom}%
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="canvas-container border border-white/20 bg-dark-800 relative shadow-dark rounded-xl overflow-hidden">
        <div
          className="canvas-wrapper overflow-auto"
          style={{
            width: canvasState.width * (zoom / 100),
            height: canvasState.height * (zoom / 100),
            maxWidth: "100%",
            maxHeight: "70vh",
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
              {/* Background Image */}
              {backgroundImage && (
                <Image
                  image={backgroundImage}
                  width={canvasState.width * (zoom / 100)}
                  height={canvasState.height * (zoom / 100)}
                  listening={false}
                />
              )}

              {/* Sparky Character */}
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

              {/* Text Elements */}
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

              {/* Transformer */}
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

        {/* Empty Canvas Placeholder */}
        {!backgroundImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-dashed border-purple-500/30 rounded-xl">
            <div className="text-center p-6 max-w-md animate-fade-in">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 mb-4 bg-purple-gradient rounded-full flex items-center justify-center animate-pulse-glow">
                <svg
                  className="w-8 h-8 text-white"
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

              {/* Main message */}
              <h3 className="text-lg font-bold gradient-text mb-2">
                Choose a Background to Start
              </h3>

              {/* Supporting text */}
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Select a meme template from the sidebar to begin creating your
                masterpiece. Add text, characters, and make it uniquely yours!
              </p>

              {/* Visual indicator */}
              <div className="flex items-center justify-center text-xs text-purple-400 animate-float">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Browse templates on the left
              </div>
            </div>
          </div>
        )}

        {/* Selection Indicator */}
        {selectedId && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white border border-white/20">
            {selectedId === "sparky" ? "Character" : "Text"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
