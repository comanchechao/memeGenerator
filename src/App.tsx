import { useState } from "react";
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

  const handleTemplateSelect = (template: MemeTemplate) => {
    setSelectedTemplate(template);
    setCanvasState((prev) => ({
      ...prev,
      backgroundImage: template.imageUrl,
    }));
  };

  const handleCharacterSelect = (character: SparkyCharacter) => {
    setSelectedCharacter(character);
  };

  const handleModeChange = (mode: CanvasMode) => {
    setCurrentMode(mode);
  };

  return (
    <div className="min-h-screen bg-[#0A0E18]">
      {/* Header */}
      <header className="glass-dark border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container-fluid">
          <div className="flex justify-between items-center h-16 px-10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-gradient rounded-xl flex items-center justify-center animate-pulse-glow">
                  <span className="text-white text-xl font-bold">✨</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">
                    Sparkify Meme Generator
                  </h1>
                  <p className="text-xs text-gray-400">Create stunning memes</p>
                </div>
              </div>
              <div className="badge badge-dark">
                <span className="status-online mr-2"></span>
                NFT Edition
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full   xl:w-full mx-auto px-4 sm:px-6 lg:px-8 section-padding">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
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

          {/* Main Canvas Area */}
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-6 animate-slide-up">
              {/* Toolbar */}
              <div className="toolbar">
                <Toolbar
                  currentMode={currentMode}
                  onModeChange={handleModeChange}
                  canvasState={canvasState}
                />
              </div>

              {/* Canvas */}
              <div className="card-dark  ">
                <div className="canvas-container">
                  <Canvas
                    canvasState={canvasState}
                    onCanvasStateChange={setCanvasState}
                    currentMode={currentMode}
                    selectedTemplate={selectedTemplate}
                    selectedCharacter={selectedCharacter}
                  />
                  <div className="canvas-overlay"></div>
                </div>
              </div>

              {/* Status Bar */}
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
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <span>Elements: {canvasState.elements.length}</span>
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

      {/* Footer */}
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
