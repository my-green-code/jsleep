export interface IIdleDetector {
  start(): void;
  stop(): void;
  isIdle(): boolean;
  onIdle(callback: () => void): void;
  onActive(callback: () => void): void;
} 