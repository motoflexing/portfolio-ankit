"use client";

import { Component, type ReactNode } from "react";

/**
 * Error boundary for R3F scenes. If WebGL is unavailable, a driver/context is
 * lost, or the scene throws during render, we swap in a clean fallback instead
 * of crashing the page or leaving a broken canvas. Keeps the hero resilient on
 * low-end devices and locked-down browsers.
 */
export class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
