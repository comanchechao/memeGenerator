import React, { useState } from "react";
import {
  MemeTemplate,
  SparkyCharacter,
  CanvasState,
  CanvasMode,
} from "./types";
import { mockTemplates, mockSparkyCharacters } from "./utils/mockData";
import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import "./App.css";

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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-sparky-600">
                ✨ Sparkify Meme Generator
              </h1>
              <span className="ml-3 px-2 py-1 bg-sparky-100 text-sparky-800 text-xs font-medium rounded-full">
                NFT Edition
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                Save Project
              </button>
              <button className="px-4 py-2 bg-sparky-500 text-white rounded-md hover:bg-sparky-600 transition-colors">
                Export Meme
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <Sidebar
              templates={mockTemplates}
              characters={mockSparkyCharacters}
              selectedTemplate={selectedTemplate}
              selectedCharacter={selectedCharacter}
              onTemplateSelect={handleTemplateSelect}
              onCharacterSelect={handleCharacterSelect}
            />
          </div>

          {/* Main Canvas Area */}
          <div className="col-span-9">
            <div className="space-y-4">
              {/* Toolbar */}
              <Toolbar
                currentMode={currentMode}
                onModeChange={handleModeChange}
                canvasState={canvasState}
              />

              {/* Canvas */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <Canvas
                  canvasState={canvasState}
                  onCanvasStateChange={setCanvasState}
                  currentMode={currentMode}
                  selectedTemplate={selectedTemplate}
                  selectedCharacter={selectedCharacter}
                />
              </div>

              {/* Status Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span>
                      Canvas: {canvasState.width} × {canvasState.height}px
                    </span>
                    <span>Mode: {currentMode}</span>
                    <span>Elements: {canvasState.elements.length}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedTemplate && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        Template: {selectedTemplate.name}
                      </span>
                    )}
                    {selectedCharacter && (
                      <span className="px-2 py-1 bg-sparky-100 text-sparky-800 rounded text-xs">
                        Character: {selectedCharacter.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
