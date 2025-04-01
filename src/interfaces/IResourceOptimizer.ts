export interface IResourceOptimizer {
  start(): void;
  stop(): void;
  optimize(): void;
  restore(): void;
} 