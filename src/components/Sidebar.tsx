import React, { useState } from "react";
import { Search, Image, Smile, Zap } from "lucide-react";
import { MemeTemplate, SparkyCharacter } from "../types";
import {
  backgroundTemplates,
  memeTemplates,
  sparkyCharacters,
} from "../utils/mockData";

interface SidebarProps {
  templates: MemeTemplate[];
  characters: SparkyCharacter[];
  selectedTemplate: MemeTemplate | null;
  selectedCharacter: SparkyCharacter | null;
  onTemplateSelect: (template: MemeTemplate) => void;
  onCharacterSelect: (character: SparkyCharacter) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedTemplate,
  selectedCharacter,
  onTemplateSelect,
  onCharacterSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBackgrounds = backgroundTemplates.filter((bg) =>
    bg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMemes = memeTemplates.filter((meme) =>
    meme.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSparky = sparkyCharacters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ItemGrid = ({
    items,
    type,
  }: {
    items: any[];
    type: "background" | "meme" | "sparky";
  }) => (
    <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          onClick={() =>
            type === "sparky" ? onCharacterSelect(item) : onTemplateSelect(item)
          }
          className={`template-item cursor-pointer group touch-manipulation ${
            (
              type === "sparky"
                ? selectedCharacter?.id === item.id
                : selectedTemplate?.id === item.id
            )
              ? "selected"
              : ""
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={item.thumbnail}
              alt={item.name}
              className={`w-full h-16 lg:h-20 object-cover transition-transform duration-300 group-hover:scale-110 ${
                type === "sparky" ? "rounded-full" : "rounded-lg"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="mt-1 lg:mt-2 px-1">
            <p className="text-xs font-medium text-gray-200 truncate group-hover:text-white transition-colors">
              {item.name}
            </p>
            {type !== "sparky" && (
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors hidden lg:block">
                {item.width}×{item.height}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Search Bar */}
      <div className="sidebar-panel">
        <div className="relative">
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search templates, characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-dark w-full placeholder:pr-5 pr-10 pl-4 py-3 text-sm"
          />
        </div>
      </div>

      {/* Backgrounds Section */}
      <div className="animate-slide-up">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <h3 className="text-sm font-semibold text-gray-200 flex items-center">
            <Image className="w-4 h-4 mr-2 text-purple-400" />
            Backgrounds
            <span className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
              {filteredBackgrounds.length}
            </span>
          </h3>
        </div>
        <div className="custom-scrollbar max-h-48 lg:max-h-64 overflow-y-auto">
          {filteredBackgrounds.length > 0 ? (
            <ItemGrid items={filteredBackgrounds} type="background" />
          ) : (
            <div className="text-center py-6 lg:py-8">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <Image className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
              </div>
              <p className="text-xs lg:text-sm text-gray-400">
                No backgrounds found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Memes Section */}
      <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <h3 className="text-sm font-semibold text-gray-200 flex items-center">
            <Smile className="w-4 h-4 mr-2 text-purple-400" />
            Meme Templates
            <span className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
              {filteredMemes.length}
            </span>
          </h3>
        </div>
        <div className="custom-scrollbar max-h-48 lg:max-h-64 overflow-y-auto">
          {filteredMemes.length > 0 ? (
            <ItemGrid items={filteredMemes} type="meme" />
          ) : (
            <div className="text-center py-6 lg:py-8">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <Smile className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
              </div>
              <p className="text-xs lg:text-sm text-gray-400">
                No meme templates found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sparky Section */}
      <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <h3 className="text-sm font-semibold text-gray-200 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-purple-400" />
            Sparky Characters
            <span className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
              {filteredSparky.length}
            </span>
          </h3>
        </div>
        <div className="custom-scrollbar max-h-48 lg:max-h-64 overflow-y-auto">
          {filteredSparky.length > 0 ? (
            <ItemGrid items={filteredSparky} type="sparky" />
          ) : (
            <div className="text-center py-6 lg:py-8">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3">
                <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
              </div>
              <p className="text-xs lg:text-sm text-gray-400">
                No characters found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
