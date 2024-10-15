// Interface automatically generated by schemas-to-ts

import type { AdminPanelRelationPropertyModification } from "./admin";
import type { Media } from "./media";

export interface Blog {
  id: number;
  attributes: {
    createdAt: string | number | Date;
    updatedAt: string | number | Date;
    publishedAt?: string | number | Date;
    title: string;
    minutesRead: number;
    summary?: string;
    isFeatured?: boolean;
    thumbnail: { data: Media };
    image: { data: Media };
    content: string | TrustedHTML;
    locale: string;
    localizations?: { data: Blog[] };
  };
}

export interface Blog_Plain {
  id: number;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
  publishedAt?: string | number | Date;
  title: string;
  minutesRead: number;
  summary?: string;
  isFeatured?: boolean;
  thumbnail: Media;
  image: Media;
  content: string;
  locale: string;
  localizations?: Blog[];
}

export interface Blog_NoRelations {
  id: number;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
  publishedAt?: string | number | Date;
  title: string;
  minutesRead: number;
  summary?: string;
  isFeatured?: boolean;
  thumbnail: number;
  image: number;
  content: string;
  locale: string;
  localizations?: Blog[];
}

export interface Blog_AdminPanelLifeCycle {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  title: string;
  minutesRead: number;
  summary?: string;
  isFeatured?: boolean;
  thumbnail: AdminPanelRelationPropertyModification<Media>;
  image: AdminPanelRelationPropertyModification<Media>;
  content: string;
  locale: string;
  localizations?: Blog[];
}
