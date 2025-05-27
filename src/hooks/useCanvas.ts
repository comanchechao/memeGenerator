import { useState, useCallback } from "react";
import * as fabric from "fabric";
import { CanvasState, HistoryState } from "../types";

export const useCanvas = (initialState: CanvasState) => {
  const [canvasState, setCanvasState] = useState<CanvasState>(initialState);
  const [history, setHistory] = useState<HistoryState>({
    canUndo: false,
    canRedo: false,
    currentIndex: -1,
    states: [],
  });

  const updateCanvasState = useCallback((newState: CanvasState) => {
    setCanvasState(newState);

    // Add to history for undo/redo functionality
    setHistory((prev) => {
      const newStates = prev.states.slice(0, prev.currentIndex + 1);
      newStates.push(newState);

      return {
        canUndo: newStates.length > 1,
        canRedo: false,
        currentIndex: newStates.length - 1,
        states: newStates,
      };
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((prev) => {
      if (!prev.canUndo || prev.currentIndex <= 0) return prev;

      const newIndex = prev.currentIndex - 1;
      const newState = prev.states[newIndex];
      setCanvasState(newState);

      return {
        ...prev,
        canUndo: newIndex > 0,
        canRedo: true,
        currentIndex: newIndex,
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((prev) => {
      if (!prev.canRedo || prev.currentIndex >= prev.states.length - 1)
        return prev;

      const newIndex = prev.currentIndex + 1;
      const newState = prev.states[newIndex];
      setCanvasState(newState);

      return {
        ...prev,
        canUndo: true,
        canRedo: newIndex < prev.states.length - 1,
        currentIndex: newIndex,
      };
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory({
      canUndo: false,
      canRedo: false,
      currentIndex: -1,
      states: [],
    });
  }, []);

  return {
    canvasState,
    history,
    updateCanvasState,
    undo,
    redo,
    clearHistory,
  };
};
