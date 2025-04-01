import { IConfig } from './interfaces/IConfig';
import { IdleDetector } from './implementations/IdleDetector';
import { ResourceOptimizer } from './implementations/ResourceOptimizer';

export class JSleep {
  private readonly config: IConfig;
  private readonly idleDetector: IdleDetector;
  private readonly resourceOptimizer: ResourceOptimizer;

  constructor(config: IConfig = {}) {
    this.config = {
      idleTimeout: 30000, // 30 seconds default
      reduceAnimations: true,
      stopNetworkCalls: true,
      reduceFPS: true,
      ...config
    };

    this.idleDetector = new IdleDetector(this.config.idleTimeout);
    this.resourceOptimizer = new ResourceOptimizer(
      this.config.reduceFPS,
      this.config.stopNetworkCalls,
      this.config.reduceAnimations
    );

    this.setupCallbacks();
    this.start();
  }

  private setupCallbacks(): void {
    this.idleDetector.onIdle(() => {
      this.resourceOptimizer.optimize();
      if (this.config.onIdle) {
        this.config.onIdle();
      }
    });

    this.idleDetector.onActive(() => {
      this.resourceOptimizer.restore();
      if (this.config.onActive) {
        this.config.onActive();
      }
    });
  }

  private start(): void {
    this.idleDetector.start();
    this.resourceOptimizer.start();
  }

  public destroy(): void {
    this.idleDetector.stop();
    this.resourceOptimizer.stop();
  }
}

export default JSleep; 