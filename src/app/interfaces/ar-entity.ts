export interface ArEntity {
  mode: 'marker' | 'image' | 'location';
  type?: 'image' | 'model' | 'video';
  markerPreset?: 'hiro' | 'kanji' | 'custom';
  src: string;
  patternUrl?: string;
  width?: number;
  height?: number;
}
