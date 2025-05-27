import React, { useState } from "react";
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
    width: 500,
    height: 500,
    backgroundColor: "#ffffff",
    elements: [],
  });

  const handleTemplateSelect = (template: MemeTemplate) => {
    setSelectedTemplate(template);
    setCanvasState((prev) => ({
      ...prev,
      width: template.width,
      height: template.height,
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
    <div className="min-h-screen bg-dark-gradient">
      {/* Header */}
      <header className="glass-dark border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container-fluid">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-gradient rounded-xl flex items-center justify-center animate-pulse-glow">
                  <span className="text-white text-xl font-bold">✨</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">
                    Sparkify Meme Generator
                  </h1>
                  <p className="text-xs text-gray-400">
                    Create stunning memes with AI
                  </p>
                </div>
              </div>
              <div className="badge badge-dark">
                <span className="status-online mr-2"></span>
                NFT Edition
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="btn-secondary text-sm">
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
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Save Project
              </button>
              <button className="btn-primary text-sm">
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export Meme
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-fluid section-padding">
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
              <div className="card-dark hover-lift">
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
                © 2024 Sparkify Meme Generator. Powered by AI.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-purple-400 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-purple-400 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-purple-400 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
