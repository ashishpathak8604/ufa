"use client";

import { Component, type ReactNode } from "react";
import { NoticeBoard } from "./NoticeBoard";

/**
 * Error boundary scoped to the notices region only (section 8).
 * If notice data fails, the rest of the landing page keeps rendering.
 */
export class NoticesBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <NoticeBoard
          notices={[]}
          error="The notice board could not be loaded. Please try again later."
        />
      );
    }
    return this.props.children;
  }
}
