import { MemeTemplate, SparkyCharacter } from "../types";

// Background templates
export const backgroundTemplates: MemeTemplate[] = [
  {
    id: "bg-1",
    name: "Background 1",
    imageUrl: "/bg1.png",
    thumbnail: "/bg1.png",
    category: "background",
    width: 800,
    height: 600,
  },
  {
    id: "bg-2",
    name: "Background 2",
    imageUrl: "/bg2.png",
    thumbnail: "/bg2.png",
    category: "background",
    width: 800,
    height: 600,
  },
  {
    id: "bg-3",
    name: "Background 3",
    imageUrl: "/bg3.png",
    thumbnail: "/bg3.png",
    category: "background",
    width: 800,
    height: 600,
  },
];

// Meme templates
export const memeTemplates: MemeTemplate[] = [
  {
    id: "meme-1",
    name: "Meme Template 1",
    imageUrl: "/meme1.jpg",
    thumbnail: "/meme1.jpg",
    category: "meme",
    width: 500,
    height: 500,
  },
  {
    id: "meme-2",
    name: "Meme Template 2",
    imageUrl: "/meme2.webp",
    thumbnail: "/meme2.webp",
    category: "meme",
    width: 500,
    height: 500,
  },
  {
    id: "meme-3",
    name: "Meme Template 3",
    imageUrl: "/meme3.jpg",
    thumbnail: "/meme3.jpg",
    category: "meme",
    width: 500,
    height: 500,
  },
];

// Sparky characters
export const sparkyCharacters: SparkyCharacter[] = [
  {
    id: "sparky-1",
    name: "Sparky",
    imageUrl: "/sparky.png",
    thumbnail: "/sparky.png",
    poses: ["default"],
    expressions: ["neutral"],
  },
];

// Combined templates for backward compatibility
export const mockTemplates: MemeTemplate[] = [
  ...backgroundTemplates,
  ...memeTemplates,
];

export const mockSparkyCharacters: SparkyCharacter[] = sparkyCharacters;

export const templateCategories = [
  { id: "background", name: "Backgrounds", count: backgroundTemplates.length },
  { id: "meme", name: "Memes", count: memeTemplates.length },
  { id: "sparky", name: "Sparky", count: sparkyCharacters.length },
];

export const characterExpressions = [
  "neutral",
  "happy",
  "sad",
  "angry",
  "surprised",
  "cool",
  "thinking",
  "laughing",
  "confused",
];

export const characterPoses = [
  "default",
  "standing",
  "sitting",
  "jumping",
  "running",
  "waving",
  "pointing",
  "thumbs-up",
  "crossed-arms",
];

export const defaultTextStyles = {
  fontSize: 32,
  fontFamily: "Impact",
  color: "#ffffff",
  strokeColor: "#000000",
  strokeWidth: 2,
  fontWeight: "bold" as const,
  fontStyle: "normal" as const,
  textAlign: "center" as const,
};

export const canvasPresets = {
  square: { width: 500, height: 500, name: "Square (500x500)" },
  landscape: { width: 800, height: 600, name: "Landscape (800x600)" },
  portrait: { width: 600, height: 800, name: "Portrait (600x800)" },
  wide: { width: 1200, height: 600, name: "Wide (1200x600)" },
  story: { width: 1080, height: 1920, name: "Story (1080x1920)" },
};
