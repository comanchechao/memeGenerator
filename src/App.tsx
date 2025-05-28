import { useState, useRef, useEffect } from "react";
import {
  MemeTemplate,
  SparkyCharacter,
  CanvasState,
  CanvasMode,
} from "./types";
import {
  backgroundTemplates,
  memeTemplates,
  sparkyCharacters,
} from "./utils/mockData";
import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import "./index.css";

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(
    null
  );
  const [selectedCharacter, setSelectedCharacter] =
    useState<SparkyCharacter | null>(null);
  const [currentMode, setCurrentMode] = useState<CanvasMode>("select");
  const [canvasState, setCanvasState] = useState<CanvasState>({
    width: 800,
    height: 400,
    backgroundColor: "#ffffff",
    elements: [],
  });

  // New state for canvas elements
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

  // History for undo/redo
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Image upload state
  const [uploadedImages, setUploadedImages] = useState<
    Array<{
      id: string;
      image: HTMLImageElement;
      x: number;
      y: number;
      width: number;
      height: number;
    }>
  >([]);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const stageRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize history with initial state
  useEffect(() => {
    const initialState = {
      textElements: [],
      sparkyPosition: { x: 0, y: 0 },
      sparkyImage: null,
      selectedId: null,
      backgroundImage: null,
      selectedTemplate: null,
      selectedCharacter: null,
    };
    setHistory([initialState]);
    setHistoryIndex(0);
  }, []);

  const handleTemplateSelect = (template: MemeTemplate) => {
    setSelectedTemplate(template);
    setCanvasState((prev) => ({
      ...prev,
      backgroundImage: template.imageUrl,
    }));

    // Load background image
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setBackgroundImage(img);
    };
    img.src = template.imageUrl;
  };

  const handleCharacterSelect = (character: SparkyCharacter) => {
    setSelectedCharacter(character);

    // Load sparky image
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setSparkyImage(img);
      setSparkyPosition({
        x: canvasState.width / 2 - 75,
        y: canvasState.height / 2 - 75,
      });
    };
    img.src = character.imageUrl;
  };

  const handleModeChange = (mode: CanvasMode) => {
    setCurrentMode(mode);
    if (mode === "image") {
      triggerImageUpload();
    }
  };

  // Image upload functions
  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setIsImageLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          try {
            // If no background template is selected, make this image the background
            if (!selectedTemplate && !backgroundImage) {
              setBackgroundImage(img);
              // Update canvas state with the image dimensions
              setCanvasState((prev) => ({
                ...prev,
                width: Math.min(img.width, 800), // Cap at 800px width
                height: Math.min(img.height, 600), // Cap at 600px height
                backgroundImage: e.target?.result as string,
              }));
              // Create a mock template object for consistency
              const imageTemplate = {
                id: `uploaded-bg-${Date.now()}`,
                name: "Uploaded Background",
                imageUrl: e.target?.result as string,
                thumbnail: e.target?.result as string,
                category: "uploaded",
                width: img.width,
                height: img.height,
              };
              setSelectedTemplate(imageTemplate);
              setCurrentMode("select");
            } else {
              // If background exists, add as a layered image on top
              const newImage = {
                id: `image-${Date.now()}`,
                image: img,
                x: canvasState.width / 2 - img.width / 4,
                y: canvasState.height / 2 - img.height / 4,
                width: img.width / 2, // Scale down to 50%
                height: img.height / 2,
              };
              setUploadedImages([...uploadedImages, newImage]);
              setSelectedId(newImage.id);
              setCurrentMode("select");
            }
          } catch (error) {
            console.error("Error processing image:", error);
          } finally {
            setIsImageLoading(false);
          }
        };
        img.onerror = () => {
          console.error("Error loading image");
          setIsImageLoading(false);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setIsImageLoading(false);
      };
      reader.readAsDataURL(file);
    }
    // Reset the input value so the same file can be selected again
    event.target.value = "";
  };

  // Canvas action functions
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
    setCurrentMode("text");
  };

  const deleteSelected = () => {
    if (selectedId) {
      if (selectedId === "sparky") {
        setSparkyImage(null);
        setSparkyPosition({ x: 0, y: 0 });
      } else if (selectedId.startsWith("text-")) {
        setTextElements(textElements.filter((text) => text.id !== selectedId));
      } else if (selectedId.startsWith("image-")) {
        setUploadedImages(
          uploadedImages.filter((img) => img.id !== selectedId)
        );
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
    setUploadedImages([]);
    setSelectedId(null);
    setSparkyPosition({ x: 0, y: 0 });
    setSelectedTemplate(null);
    setSelectedCharacter(null);
    // Reset canvas to default dimensions
    setCanvasState((prev) => ({
      ...prev,
      width: 800,
      height: 400,
      backgroundColor: "#ffffff",
      backgroundImage: undefined,
    }));
  };

  const alignLeft = () => {
    if (selectedId) {
      if (selectedId.startsWith("text-")) {
        setTextElements(
          textElements.map((text) =>
            text.id === selectedId ? { ...text, x: 50 } : text
          )
        );
      } else if (selectedId === "sparky") {
        setSparkyPosition({ ...sparkyPosition, x: 50 });
      } else if (selectedId.startsWith("image-")) {
        setUploadedImages(
          uploadedImages.map((img) =>
            img.id === selectedId ? { ...img, x: 50 } : img
          )
        );
      }
    }
  };

  const alignCenter = () => {
    if (selectedId) {
      if (selectedId.startsWith("text-")) {
        setTextElements(
          textElements.map((text) =>
            text.id === selectedId
              ? { ...text, x: canvasState.width / 2 - 80 }
              : text
          )
        );
      } else if (selectedId === "sparky") {
        setSparkyPosition({ ...sparkyPosition, x: canvasState.width / 2 - 75 });
      } else if (selectedId.startsWith("image-")) {
        setUploadedImages(
          uploadedImages.map((img) =>
            img.id === selectedId
              ? { ...img, x: canvasState.width / 2 - img.width / 2 }
              : img
          )
        );
      }
    }
  };

  const alignRight = () => {
    if (selectedId) {
      if (selectedId.startsWith("text-")) {
        setTextElements(
          textElements.map((text) =>
            text.id === selectedId
              ? { ...text, x: canvasState.width - 160 }
              : text
          )
        );
      } else if (selectedId === "sparky") {
        setSparkyPosition({ ...sparkyPosition, x: canvasState.width - 150 });
      } else if (selectedId.startsWith("image-")) {
        setUploadedImages(
          uploadedImages.map((img) =>
            img.id === selectedId
              ? { ...img, x: canvasState.width - img.width - 50 }
              : img
          )
        );
      }
    }
  };

  // Track state changes and save to history
  useEffect(() => {
    // Don't save initial state or during undo/redo operations
    if (history.length === 0) return;

    const currentState = {
      textElements: [...textElements],
      sparkyPosition: { ...sparkyPosition },
      sparkyImage: sparkyImage,
      uploadedImages: [...uploadedImages],
      selectedId,
      backgroundImage,
      selectedTemplate,
      selectedCharacter,
    };

    // Check if state actually changed
    const lastState = history[historyIndex];
    if (
      lastState &&
      JSON.stringify(currentState) !== JSON.stringify(lastState)
    ) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(currentState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [
    textElements,
    sparkyPosition,
    sparkyImage,
    uploadedImages,
    backgroundImage,
    selectedTemplate,
    selectedCharacter,
  ]);

  const saveState = () => {
    const state = {
      textElements: [...textElements],
      sparkyPosition: { ...sparkyPosition },
      sparkyImage: sparkyImage,
      uploadedImages: [...uploadedImages],
      selectedId,
      backgroundImage,
      selectedTemplate,
      selectedCharacter,
    };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setTextElements(prevState.textElements);
      setSparkyPosition(prevState.sparkyPosition);
      setSparkyImage(prevState.sparkyImage);
      setUploadedImages(prevState.uploadedImages || []);
      setSelectedId(prevState.selectedId);
      setBackgroundImage(prevState.backgroundImage);
      setSelectedTemplate(prevState.selectedTemplate);
      setSelectedCharacter(prevState.selectedCharacter);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setTextElements(nextState.textElements);
      setSparkyPosition(nextState.sparkyPosition);
      setSparkyImage(nextState.sparkyImage);
      setUploadedImages(nextState.uploadedImages || []);
      setSelectedId(nextState.selectedId);
      setBackgroundImage(nextState.backgroundImage);
      setSelectedTemplate(nextState.selectedTemplate);
      setSelectedCharacter(nextState.selectedCharacter);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="min-h-screen bg-[#0A0E18]">
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <header className="glass-dark border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container-fluid">
          <div className="flex justify-between items-center h-16 px-10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-0 lg:p-1 bg-transparent lg:bg-purple-gradient rounded-xl flex items-center justify-center lg:animate-pulse-glow">
                  <span className="text-white text-xl font-bold">✨</span>
                </div>
                <div>
                  <h1 className="md:text-2xl text-sm font-bold gradient-text">
                    Sparkify Meme Generator
                  </h1>
                  <p className="text-xs text-gray-400">Create stunning memes</p>
                </div>
              </div>
              <div className="badge text-xs badge-dark">
                <span className="status-online mr-2"></span>
                NFT Edition
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 section-padding">
        <div className="block lg:hidden">
          <div className="space-y-6 animate-slide-up">
            <div className="toolbar">
              <Toolbar
                currentMode={currentMode}
                onModeChange={handleModeChange}
                canvasState={canvasState}
                onAddText={addText}
                onUndo={undo}
                onRedo={redo}
                onAlignLeft={alignLeft}
                onAlignCenter={alignCenter}
                onAlignRight={alignRight}
                onDelete={deleteSelected}
                onDownload={downloadImage}
                onReset={clearCanvas}
                canUndo={canUndo}
                canRedo={canRedo}
                isImageLoading={isImageLoading}
              />
            </div>

            <div className="card-dark">
              <div className="canvas-container">
                <Canvas
                  canvasState={canvasState}
                  onCanvasStateChange={setCanvasState}
                  currentMode={currentMode}
                  selectedTemplate={selectedTemplate}
                  selectedCharacter={selectedCharacter}
                  stageRef={stageRef}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  backgroundImage={backgroundImage}
                  sparkyImage={sparkyImage}
                  zoom={zoom}
                  setZoom={setZoom}
                  sparkyPosition={sparkyPosition}
                  setSparkyPosition={setSparkyPosition}
                  textElements={textElements}
                  setTextElements={setTextElements}
                  uploadedImages={uploadedImages}
                  setUploadedImages={setUploadedImages}
                  isImageLoading={isImageLoading}
                  addText={addText}
                  deleteSelected={deleteSelected}
                  downloadImage={downloadImage}
                  clearCanvas={clearCanvas}
                />
                <div className="canvas-overlay"></div>
              </div>
            </div>

            <div className="animate-fade-in">
              <Sidebar
                templates={[...backgroundTemplates, ...memeTemplates]}
                characters={sparkyCharacters}
                selectedTemplate={selectedTemplate}
                selectedCharacter={selectedCharacter}
                onTemplateSelect={handleTemplateSelect}
                onCharacterSelect={handleCharacterSelect}
              />
            </div>

            <div className="glass-dark rounded-xl p-3 border border-white/10">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-3 h-3 text-purple-400"
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
                      {canvasState.width} × {canvasState.height}px
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-3 h-3 text-purple-400"
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
                    <span className="text-purple-400 capitalize">
                      {currentMode}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-3 h-3 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <span>{canvasState.elements.length} elements</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {selectedTemplate && (
                    <div className="badge badge-dark text-xs">
                      <svg
                        className="w-2.5 h-2.5 mr-1 text-accent-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {selectedTemplate.name}
                    </div>
                  )}
                  {selectedCharacter && (
                    <div className="badge badge-dark text-xs">
                      <svg
                        className="w-2.5 h-2.5 mr-1 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {selectedCharacter.name}
                    </div>
                  )}
                  {!selectedTemplate && !selectedCharacter && (
                    <div className="text-xs text-gray-500 italic">
                      Select a template below
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <div className="animate-fade-in">
                <Sidebar
                  templates={[...backgroundTemplates, ...memeTemplates]}
                  characters={sparkyCharacters}
                  selectedTemplate={selectedTemplate}
                  selectedCharacter={selectedCharacter}
                  onTemplateSelect={handleTemplateSelect}
                  onCharacterSelect={handleCharacterSelect}
                />
              </div>
            </div>

            <div className="col-span-9">
              <div className="space-y-6 animate-slide-up">
                <div className="toolbar">
                  <Toolbar
                    currentMode={currentMode}
                    onModeChange={handleModeChange}
                    canvasState={canvasState}
                    onAddText={addText}
                    onUndo={undo}
                    onRedo={redo}
                    onAlignLeft={alignLeft}
                    onAlignCenter={alignCenter}
                    onAlignRight={alignRight}
                    onDelete={deleteSelected}
                    onDownload={downloadImage}
                    onReset={clearCanvas}
                    canUndo={canUndo}
                    canRedo={canRedo}
                    isImageLoading={isImageLoading}
                  />
                </div>

                <div className="card-dark">
                  <div className="canvas-container">
                    <Canvas
                      canvasState={canvasState}
                      onCanvasStateChange={setCanvasState}
                      currentMode={currentMode}
                      selectedTemplate={selectedTemplate}
                      selectedCharacter={selectedCharacter}
                      stageRef={stageRef}
                      selectedId={selectedId}
                      setSelectedId={setSelectedId}
                      backgroundImage={backgroundImage}
                      sparkyImage={sparkyImage}
                      zoom={zoom}
                      setZoom={setZoom}
                      sparkyPosition={sparkyPosition}
                      setSparkyPosition={setSparkyPosition}
                      textElements={textElements}
                      setTextElements={setTextElements}
                      uploadedImages={uploadedImages}
                      setUploadedImages={setUploadedImages}
                      isImageLoading={isImageLoading}
                      addText={addText}
                      deleteSelected={deleteSelected}
                      downloadImage={downloadImage}
                      clearCanvas={clearCanvas}
                    />
                    <div className="canvas-overlay"></div>
                  </div>
                </div>

                <div className="glass-dark rounded-xl p-4 border border-white/10">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
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
                        <span>
                          Mode:{" "}
                          <span className="text-purple-400 capitalize">
                            {currentMode}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {selectedTemplate && (
                        <div className="badge badge-dark">
                          <svg
                            className="w-3 h-3 mr-1.5 text-accent-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Template: {selectedTemplate.name}
                        </div>
                      )}
                      {selectedCharacter && (
                        <div className="badge badge-dark">
                          <svg
                            className="w-3 h-3 mr-1.5 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Character: {selectedCharacter.name}
                        </div>
                      )}
                      {!selectedTemplate && !selectedCharacter && (
                        <div className="text-xs text-gray-500 italic">
                          Select a template to get started
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="glass-dark border-t border-white/10 mt-12">
        <div className="container-fluid">
          <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-400">
                © 2025 Sparkify Meme Generator.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
