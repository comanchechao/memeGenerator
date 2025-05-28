import React from "react";
import {
  Undo2,
  Redo2,
  Type,
  AlignCenter,
  AlignLeft,
  AlignRight,
  RotateCcw,
  Image,
  Layers,
  Download,
  Trash2,
  RefreshCw,
  Loader,
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
  isImageLoading?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  currentMode,
  onModeChange,
  canvasState,
  onUndo,
  onRedo,
  onAddText,
  onAlignLeft,
  onAlignCenter,
  onAlignRight,
  onReset,
  onDownload,
  onDelete,
  canUndo = false,
  canRedo = false,
  isImageLoading = false,
}) => {
  const toolbarSections = [
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
          isLoading: false,
        },
        {
          id: "redo",
          icon: Redo2,
          label: "Redo",
          onClick: onRedo,
          disabled: !canRedo,
          isLoading: false,
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
          disabled: false,
          isLoading: false,
        },
        {
          id: "add-image",
          icon: isImageLoading ? Loader : Image,
          label: isImageLoading ? "Loading..." : "Add Image",
          onClick: () => onModeChange("image"),
          isActive: currentMode === "image",
          disabled: isImageLoading,
          isLoading: isImageLoading,
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
          disabled: false,
          isLoading: false,
        },
        {
          id: "align-center",
          icon: AlignCenter,
          label: "Align Center",
          onClick: onAlignCenter,
          disabled: false,
          isLoading: false,
        },
        {
          id: "align-right",
          icon: AlignRight,
          label: "Align Right",
          onClick: onAlignRight,
          disabled: false,
          isLoading: false,
        },
      ],
    },
    {
      title: "Actions",
      icon: Download,
      tools: [
        {
          id: "delete",
          icon: Trash2,
          label: "Delete",
          onClick: onDelete,
          variant: "danger",
          disabled: false,
          isLoading: false,
        },
        {
          id: "download",
          icon: Download,
          label: "Download",
          onClick: onDownload,
          variant: "success",
          disabled: false,
          isLoading: false,
        },
        {
          id: "reset",
          icon: RefreshCw,
          label: "Reset",
          onClick: onReset,
          variant: "warning",
          disabled: false,
          isLoading: false,
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

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
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
                    className={getButtonClasses(tool)}
                    title={tool.label}
                    disabled={tool.disabled}
                  >
                    <IconComponent
                      size={16}
                      className={tool.isLoading ? "animate-spin" : ""}
                    />
                    <span className="hidden sm:inline">{tool.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

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
