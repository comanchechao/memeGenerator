import React from "react";
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Type,
  AlignCenter,
  AlignLeft,
  AlignRight,
  RotateCcw,
  Download,
  Trash2,
  MousePointer,
  Image,
  Move,
  Layers,
} from "lucide-react";
import { CanvasState, CanvasMode } from "../types";

interface ToolbarProps {
  currentMode: CanvasMode;
  onModeChange: (mode: CanvasMode) => void;
  canvasState: CanvasState;
  onUndo?: () => void;
  onRedo?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onAddText?: () => void;
  onAlignLeft?: () => void;
  onAlignCenter?: () => void;
  onAlignRight?: () => void;
  onReset?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  currentMode,
  onModeChange,
  canvasState,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onAddText,
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onReset,
  onDownload,
  onDelete,
  canUndo = false,
  canRedo = false,
}) => {
  const toolbarSections = [
    {
      title: "Selection",
      icon: MousePointer,
      tools: [
        {
          id: "select",
          icon: MousePointer,
          label: "Select",
          onClick: () => onModeChange("select"),
          isActive: currentMode === "select",
        },
        {
          id: "move",
          icon: Move,
          label: "Move",
          onClick: () => onModeChange("select"),
          isActive: false,
        },
      ],
    },
    {
      title: "History",
      icon: RotateCcw,
      tools: [
        {
          id: "undo",
          icon: Undo2,
          label: "Undo",
          onClick: onUndo,
          disabled: !canUndo,
        },
        {
          id: "redo",
          icon: Redo2,
          label: "Redo",
          onClick: onRedo,
          disabled: !canRedo,
        },
      ],
    },

    {
      title: "Add Content",
      icon: Layers,
      tools: [
        {
          id: "add-text",
          icon: Type,
          label: "Add Text",
          onClick: onAddText,
          isActive: currentMode === "text",
        },
        {
          id: "add-image",
          icon: Image,
          label: "Add Image",
          onClick: () => onModeChange("image"),
          isActive: currentMode === "image",
        },
      ],
    },
    {
      title: "Align",
      icon: AlignCenter,
      tools: [
        {
          id: "align-left",
          icon: AlignLeft,
          label: "Align Left",
          onClick: onAlignLeft,
        },
        {
          id: "align-center",
          icon: AlignCenter,
          label: "Align Center",
          onClick: onAlignCenter,
        },
        {
          id: "align-right",
          icon: AlignRight,
          label: "Align Right",
          onClick: onAlignRight,
        },
      ],
    },
  ];

  const getButtonClasses = (tool: any) => {
    let classes =
      "relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ";

    if (tool.isActive) {
      classes += "bg-purple-600 text-white shadow-purple ";
    } else if (tool.disabled) {
      classes += "text-gray-500 cursor-not-allowed opacity-50 ";
    } else {
      classes += "text-gray-300 hover:text-white hover:bg-white/10 ";
    }

    if (tool.variant) {
      switch (tool.variant) {
        case "warning":
          classes += "hover:bg-warning-600 hover:text-white ";
          break;
        case "success":
          classes += "hover:bg-success-600 hover:text-white ";
          break;
        case "danger":
          classes += "hover:bg-error-600 hover:text-white ";
          break;
      }
    }

    return classes;
  };

  const getActionButtonClasses = (tool: any) => {
    let classes =
      "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ";

    if (tool.disabled) {
      classes += "opacity-50 cursor-not-allowed ";
    }

    switch (tool.variant) {
      case "warning":
        classes +=
          "bg-warning-600 hover:bg-warning-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 ";
        break;
      case "success":
        classes +=
          "bg-success-600 hover:bg-success-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 ";
        break;
      case "danger":
        classes +=
          "bg-error-600 hover:bg-error-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 ";
        break;
      default:
        classes += "bg-gray-600 hover:bg-gray-700 text-white ";
    }

    return classes;
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      {/* Tool Sections */}
      <div className="flex flex-wrap gap-6">
        {toolbarSections.map((section, sectionIndex) => (
          <div
            key={section.title}
            className="flex flex-col space-y-2"
            style={{ animationDelay: `${sectionIndex * 0.1}s` }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <section.icon className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                {section.title}
              </span>
            </div>
            <div className="flex gap-1">
              {section.tools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={tool.onClick}
                    disabled={tool.disabled}
                    className={getButtonClasses(tool)}
                    title={tool.label}
                  >
                    <IconComponent size={16} />
                    <span className="hidden sm:inline">{tool.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Canvas Info - Mobile */}
      <div className="lg:hidden w-full glass rounded-lg p-3 border border-white/10">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center gap-3">
            <span>
              Canvas: {canvasState.width} × {canvasState.height}px
            </span>
            <span>Elements: {canvasState.elements.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Mode:</span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-medium capitalize">
              {currentMode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
