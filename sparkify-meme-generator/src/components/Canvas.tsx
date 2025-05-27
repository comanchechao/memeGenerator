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
  onCanvasStateChange,
  currentMode,
  selectedTemplate,
  selectedCharacter,
}) => {
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [sparkyImage, setSparkyImage] = useState<HTMLImageElement | null>(null);
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

  // Load background image when template is selected
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

  // Load sparky image when character is selected
  useEffect(() => {
    if (selectedCharacter) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setSparkyImage(img);
      };
      img.src = selectedCharacter.imageUrl;
    }
  }, [selectedCharacter]);

  // Handle selection
  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleDeselect = () => {
    setSelectedId(null);
  };

  // Handle stage click
  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  // Add text element
  const addText = () => {
    const newText = {
      id: `text-${Date.now()}`,
      text: "Double click to edit",
      x: canvasState.width / 2 - 100,
      y: canvasState.height / 2,
      fontSize: 32,
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 2,
    };
    setTextElements([...textElements, newText]);
    setSelectedId(newText.id);
  };

  // Update text
  const updateText = (id: string, newText: string) => {
    setTextElements(
      textElements.map((text) =>
        text.id === id ? { ...text, text: newText } : text
      )
    );
  };

  // Delete selected element
  const deleteSelected = () => {
    if (selectedId) {
      if (selectedId === "sparky") {
        setSparkyImage(null);
      } else if (selectedId.startsWith("text-")) {
        setTextElements(textElements.filter((text) => text.id !== selectedId));
      }
      setSelectedId(null);
    }
  };

  // Download canvas as image
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

  // Clear canvas
  const clearCanvas = () => {
    setBackgroundImage(null);
    setSparkyImage(null);
    setTextElements([]);
    setSelectedId(null);
  };

  // Update transformer when selection changes
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

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 p-4 glass-dark rounded-xl border border-white/10">
        <button
          onClick={addText}
          className="btn-primary text-sm flex items-center space-x-2"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Add Text</span>
        </button>

        <button
          onClick={deleteSelected}
          disabled={!selectedId}
          className="btn-danger text-sm flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <span>Delete</span>
        </button>

        <button
          onClick={downloadImage}
          className="btn-success text-sm flex items-center space-x-2"
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Download</span>
        </button>

        <button
          onClick={clearCanvas}
          className="btn-secondary text-sm flex items-center space-x-2"
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
          <span>Clear All</span>
        </button>
      </div>

      {/* Canvas */}
      <div className="canvas-container border border-white/20 bg-dark-800 relative shadow-dark rounded-xl overflow-hidden">
        <Stage
          ref={stageRef}
          width={canvasState.width}
          height={canvasState.height}
          onClick={handleStageClick}
          onTap={handleStageClick}
        >
          <Layer>
            {/* Background Image */}
            {backgroundImage && (
              <Image
                image={backgroundImage}
                width={canvasState.width}
                height={canvasState.height}
                listening={false}
              />
            )}

            {/* Sparky Character */}
            {sparkyImage && (
              <Image
                id="sparky"
                image={sparkyImage}
                x={canvasState.width / 2 - 100}
                y={canvasState.height / 2 - 100}
                width={200}
                height={200}
                draggable
                onClick={() => handleSelect("sparky")}
                onTap={() => handleSelect("sparky")}
              />
            )}

            {/* Text Elements */}
            {textElements.map((textEl) => (
              <Text
                key={textEl.id}
                id={textEl.id}
                text={textEl.text}
                x={textEl.x}
                y={textEl.y}
                fontSize={textEl.fontSize}
                fill={textEl.fill}
                stroke={textEl.stroke}
                strokeWidth={textEl.strokeWidth}
                fontFamily="Impact"
                fontStyle="bold"
                align="center"
                draggable
                onClick={() => handleSelect(textEl.id)}
                onTap={() => handleSelect(textEl.id)}
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
                // Limit resize
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          </Layer>
        </Stage>

        {/* Empty Canvas Placeholder */}
        {!backgroundImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 border-2 border-dashed border-purple-500/30 rounded-xl">
            <div className="text-center p-8 max-w-sm animate-fade-in">
              {/* Icon */}
              <div className="mx-auto w-20 h-20 mb-6 bg-purple-gradient rounded-full flex items-center justify-center animate-pulse-glow">
                <svg
                  className="w-10 h-10 text-white"
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
              <h3 className="text-xl font-bold gradient-text mb-3">
                Choose a Background to Start
              </h3>

              {/* Supporting text */}
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
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
          <div className="absolute top-4 right-4 glass rounded-lg px-3 py-2 border border-purple-500/50">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-purple-200 font-medium">
                {selectedId === "sparky"
                  ? "Character Selected"
                  : "Text Selected"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="glass-dark rounded-xl p-4 border border-white/10 w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              <span>
                Canvas: {canvasState.width} × {canvasState.height}px
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
              <span>Selected: {selectedId || "None"}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center sm:text-right">
            <p className="mb-1">
              <span className="text-purple-400">Click</span> to select •{" "}
              <span className="text-purple-400">Drag</span> to move •{" "}
              <span className="text-purple-400">Double-click</span> text to edit
            </p>
            <p>
              Use handles to resize/rotate •{" "}
              <span className="text-purple-400">Escape</span> to deselect
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
