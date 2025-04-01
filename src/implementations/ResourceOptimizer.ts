import { IResourceOptimizer } from '../interfaces/IResourceOptimizer';

export class ResourceOptimizer implements IResourceOptimizer {
  private originalRAF: typeof requestAnimationFrame;
  private throttledRAF: typeof requestAnimationFrame = window.requestAnimationFrame;
  private originalFetch: typeof fetch;
  private throttledFetch: typeof fetch = window.fetch;
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
    this.originalFetch = window.fetch;
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

    // Execute any queued requests
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
    this.throttledFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      return new Promise((resolve: (value: Response) => void, reject: (reason?: any) => void) => {
        const executeRequest = () => {
          this.originalFetch(input, init)
            .then(resolve)
            .catch(reject);
        };

        if (!document.hidden) {
          executeRequest();
        } else {
          this.queuedRequests.push(executeRequest);
        }
      });
    };

    window.fetch = this.throttledFetch;
  }
} 