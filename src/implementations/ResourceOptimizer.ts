import { IResourceOptimizer } from '../interfaces/IResourceOptimizer';

export class ResourceOptimizer implements IResourceOptimizer {
  private originalRAF: typeof requestAnimationFrame;
  private throttledRAF: typeof requestAnimationFrame = window.requestAnimationFrame;
  private originalFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  private throttledFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  private queuedRequests: Array<() => void> = [];
  private readonly reduceFPS: boolean;
  private readonly stopNetworkCalls: boolean;
  private readonly reduceAnimations: boolean;

  constructor(
    reduceFPS: boolean = true,
    stopNetworkCalls: boolean = true,
    reduceAnimations: boolean = true
  ) {
    this.reduceFPS = reduceFPS;
    this.stopNetworkCalls = stopNetworkCalls;
    this.reduceAnimations = reduceAnimations;
    this.originalRAF = window.requestAnimationFrame;
    this.originalFetch = window.fetch.bind(window);
    this.throttledFetch = this.originalFetch;
  }

  public start(): void {
    if (this.reduceFPS) {
      this.setupRAFThrottling();
    }
    if (this.stopNetworkCalls) {
      this.setupFetchThrottling();
    }
  }

  public stop(): void {
    window.requestAnimationFrame = this.originalRAF;
    window.fetch = this.originalFetch;
  }

  public optimize(): void {
    if (this.reduceAnimations) {
      document.body.style.setProperty('animation-play-state', 'paused');
      document.body.style.setProperty('transition-play-state', 'paused');
    }
  }

  public restore(): void {
    if (this.reduceAnimations) {
      document.body.style.removeProperty('animation-play-state');
      document.body.style.removeProperty('transition-play-state');
    }

    while (this.queuedRequests.length > 0) {
      const request = this.queuedRequests.shift();
      if (request) request();
    }
  }

  private setupRAFThrottling(): void {
    this.throttledRAF = (callback: FrameRequestCallback): number => {
      return this.originalRAF(() => {
        setTimeout(callback, 1000);
      });
    };

    window.requestAnimationFrame = this.throttledRAF;
  }

  private setupFetchThrottling(): void {
    this.throttledFetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      return new Promise((resolve, reject) => {
        const executeRequest = async () => {
          try {
            const response = await this.originalFetch(input, init);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        };

        if (!document.hidden) {
          executeRequest();
        } else {
          this.queuedRequests.push(executeRequest);
        }
      });
    };

    window.fetch = this.throttledFetch.bind(window);
  }
} 