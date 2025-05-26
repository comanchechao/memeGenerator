import { MemeTemplate, SparkyCharacter } from "../types";

export const mockTemplates: MemeTemplate[] = [
  {
    id: "template-1",
    name: "Classic Meme",
    imageUrl:
      "https://via.placeholder.com/500x500/f0f0f0/333333?text=Classic+Meme+Template",
    thumbnail: "https://via.placeholder.com/150x150/f0f0f0/333333?text=Classic",
    category: "classic",
    width: 500,
    height: 500,
  },
  {
    id: "template-2",
    name: "Reaction Meme",
    imageUrl:
      "https://via.placeholder.com/500x400/e0e0e0/444444?text=Reaction+Template",
    thumbnail:
      "https://via.placeholder.com/150x120/e0e0e0/444444?text=Reaction",
    category: "reaction",
    width: 500,
    height: 400,
  },
  {
    id: "template-3",
    name: "Text Overlay",
    imageUrl:
      "https://via.placeholder.com/600x400/d0d0d0/555555?text=Text+Overlay+Template",
    thumbnail: "https://via.placeholder.com/150x100/d0d0d0/555555?text=Text",
    category: "text",
    width: 600,
    height: 400,
  },
  {
    id: "template-4",
    name: "Square Format",
    imageUrl:
      "https://via.placeholder.com/400x400/c0c0c0/666666?text=Square+Template",
    thumbnail: "https://via.placeholder.com/150x150/c0c0c0/666666?text=Square",
    category: "social",
    width: 400,
    height: 400,
  },
  {
    id: "template-5",
    name: "Wide Format",
    imageUrl:
      "https://via.placeholder.com/800x400/b0b0b0/777777?text=Wide+Format+Template",
    thumbnail: "https://via.placeholder.com/150x75/b0b0b0/777777?text=Wide",
    category: "banner",
    width: 800,
    height: 400,
  },
];

export const mockSparkyCharacters: SparkyCharacter[] = [
  {
    id: "sparky-1",
    name: "Happy Sparky",
    imageUrl:
      "https://via.placeholder.com/200x200/FFD700/000000?text=😊+Sparky",
    thumbnail: "https://via.placeholder.com/100x100/FFD700/000000?text=😊",
    poses: ["standing", "jumping", "waving"],
    expressions: ["happy", "excited", "cheerful"],
  },
  {
    id: "sparky-2",
    name: "Cool Sparky",
    imageUrl:
      "https://via.placeholder.com/200x200/87CEEB/000000?text=😎+Sparky",
    thumbnail: "https://via.placeholder.com/100x100/87CEEB/000000?text=😎",
    poses: ["leaning", "pointing", "thumbs-up"],
    expressions: ["cool", "confident", "smug"],
  },
  {
    id: "sparky-3",
    name: "Surprised Sparky",
    imageUrl:
      "https://via.placeholder.com/200x200/FF6347/FFFFFF?text=😲+Sparky",
    thumbnail: "https://via.placeholder.com/100x100/FF6347/FFFFFF?text=😲",
    poses: ["shocked", "hands-up", "wide-eyes"],
    expressions: ["surprised", "amazed", "shocked"],
  },
  {
    id: "sparky-4",
    name: "Thinking Sparky",
    imageUrl:
      "https://via.placeholder.com/200x200/9370DB/FFFFFF?text=🤔+Sparky",
    thumbnail: "https://via.placeholder.com/100x100/9370DB/FFFFFF?text=🤔",
    poses: ["chin-hand", "looking-up", "pondering"],
    expressions: ["thoughtful", "curious", "contemplative"],
  },
  {
    id: "sparky-5",
    name: "Angry Sparky",
    imageUrl:
      "https://via.placeholder.com/200x200/DC143C/FFFFFF?text=😠+Sparky",
    thumbnail: "https://via.placeholder.com/100x100/DC143C/FFFFFF?text=😠",
    poses: ["fists-up", "crossed-arms", "pointing-angry"],
    expressions: ["angry", "frustrated", "mad"],
  },
  {
    id: "sparky-6",
    name: "Laughing Sparky",
    imageUrl:
      "https://via.placeholder.com/200x200/32CD32/000000?text=😂+Sparky",
    thumbnail: "https://via.placeholder.com/100x100/32CD32/000000?text=😂",
    poses: ["rolling", "holding-belly", "tears-of-joy"],
    expressions: ["laughing", "hilarious", "amused"],
  },
];

export const templateCategories = [
  { id: "all", name: "All Templates", count: mockTemplates.length },
  {
    id: "classic",
    name: "Classic",
    count: mockTemplates.filter((t) => t.category === "classic").length,
  },
  {
    id: "reaction",
    name: "Reaction",
    count: mockTemplates.filter((t) => t.category === "reaction").length,
  },
  {
    id: "text",
    name: "Text",
    count: mockTemplates.filter((t) => t.category === "text").length,
  },
  {
    id: "social",
    name: "Social",
    count: mockTemplates.filter((t) => t.category === "social").length,
  },
  {
    id: "banner",
    name: "Banner",
    count: mockTemplates.filter((t) => t.category === "banner").length,
  },
];

export const characterExpressions = [
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
