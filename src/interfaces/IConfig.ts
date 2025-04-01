export interface IConfig {
  idleTimeout?: number;
  reduceAnimations?: boolean;
  stopNetworkCalls?: boolean;
  reduceFPS?: boolean;
  onIdle?: () => void;
  onActive?: () => void;
} 