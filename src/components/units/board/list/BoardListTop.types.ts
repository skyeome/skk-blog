import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface BoardListTopProps {
  tag: string;
  layout: ViewLayoutType;
  setLayout: Dispatch<SetStateAction<ViewLayoutType>>;
}

export interface ChangeLayoutButton {
  layout: ViewLayoutType;
  startIcon: ReactNode;
  text: string;
}

export type ViewLayoutType = "card" | "list" | "list-card";
