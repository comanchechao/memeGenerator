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
    // Selection and Navigation
    {
      title: "Selection",
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
    // History
    {
      title: "History",
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
    // Zoom
    {
      title: "Zoom",
      tools: [
        {
          id: "zoom-in",
          icon: ZoomIn,
          label: "Zoom In",
          onClick: onZoomIn,
        },
        {
          id: "zoom-out",
          icon: ZoomOut,
          label: "Zoom Out",
          onClick: onZoomOut,
        },
      ],
    },
    // Content
    {
      title: "Add Content",
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
    // Alignment
    {
      title: "Align",
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
    // Actions
    {
      title: "Actions",
      tools: [
        {
          id: "reset",
          icon: RotateCcw,
          label: "Reset All",
          onClick: onReset,
          variant: "warning" as const,
        },
        {
          id: "download",
          icon: Download,
          label: "Download",
          onClick: onDownload,
          variant: "success" as const,
        },
        {
          id: "delete",
          icon: Trash2,
          label: "Delete",
          onClick: onDelete,
          variant: "danger" as const,
        },
      ],
    },
  ];

  const getButtonClasses = (tool: any) => {
    const baseClasses = "toolbar-button";
    const variantClasses = {
      warning:
        "hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-700",
      success: "hover:bg-green-50 hover:border-green-300 hover:text-green-700",
      danger: "hover:bg-red-50 hover:border-red-300 hover:text-red-700",
    };

    let classes = baseClasses;

    if (tool.isActive) {
      classes += " active";
    }

    if (tool.disabled) {
      classes += " opacity-50 cursor-not-allowed";
    }

    if (tool.variant && variantClasses[tool.variant]) {
      classes += ` ${variantClasses[tool.variant]}`;
    }

    return classes;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-4">
        <div className="flex flex-wrap gap-6">
          {toolbarSections.map((section) => (
            <div key={section.title} className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {section.title}
              </span>
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
      </div>

      {/* Canvas Info */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span>
              Canvas: {canvasState.width} × {canvasState.height}px
            </span>
            <span>Elements: {canvasState.elements.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Mode: </span>
            <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs font-medium capitalize">
              {currentMode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
