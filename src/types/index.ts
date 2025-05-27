export interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
  thumbnail: string;
  category: string;
  width: number;
  height: number;
}

export interface SparkyCharacter {
  id: string;
  name: string;
  imageUrl: string;
  thumbnail: string;
  poses: string[];
  expressions: string[];
}

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  textAlign: "left" | "center" | "right";
  fontWeight: "normal" | "bold";
  fontStyle: "normal" | "italic";
}

export interface ImageElement {
  id: string;
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}

export interface CanvasState {
  width: number;
  height: number;
  backgroundColor: string;
  backgroundImage?: string;
  elements: (TextElement | ImageElement)[];
}

export interface ToolbarAction {
  id: string;
  name: string;
  icon: string;
  action: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export interface HistoryState {
  canUndo: boolean;
  canRedo: boolean;
  currentIndex: number;
  states: CanvasState[];
}

export type CanvasMode = "select" | "text" | "image" | "draw";

export interface AppState {
  selectedTemplate: MemeTemplate | null;
  selectedCharacter: SparkyCharacter | null;
  canvasState: CanvasState;
  currentMode: CanvasMode;
  selectedElementId: string | null;
  isLoading: boolean;
  error: string | null;
}
