import { IIdleDetector } from '../interfaces/IIdleDetector';

export class IdleDetector implements IIdleDetector {
  private isIdleState: boolean = false;
  private idleTimer: number | null = null;
  private idleCallbacks: Array<() => void> = [];
  private activeCallbacks: Array<() => void> = [];
  private readonly timeout: number;
  private readonly events: string[] = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

  constructor(timeout: number = 30000) {
    this.timeout = timeout;
  }

  public start(): void {
    this.setupEventListeners();
    this.startIdleTimer();
  }

  public stop(): void {
    if (this.idleTimer) {
      window.clearTimeout(this.idleTimer);
    }
    this.removeEventListeners();
  }

  public isIdle(): boolean {
    return this.isIdleState;
  }

  public onIdle(callback: () => void): void {
    this.idleCallbacks.push(callback);
  }

  public onActive(callback: () => void): void {
    this.activeCallbacks.push(callback);
  }

  private setupEventListeners(): void {
    this.events.forEach(event => {
      document.addEventListener(event, () => this.handleUserActivity());
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handleIdle();
      } else {
        this.handleActive();
      }
    });
  }

  private removeEventListeners(): void {
    this.events.forEach(event => {
      document.removeEventListener(event, () => this.handleUserActivity());
    });

    document.removeEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.handleIdle();
      } else {
        this.handleActive();
      }
    });
  }

  private startIdleTimer(): void {
    this.idleTimer = window.setTimeout(() => this.handleIdle(), this.timeout);
  }

  private handleUserActivity(): void {
    if (this.idleTimer) {
      window.clearTimeout(this.idleTimer);
    }

    if (this.isIdleState) {
      this.handleActive();
    }

    this.startIdleTimer();
  }

  private handleIdle(): void {
    if (this.isIdleState) return;
    
    this.isIdleState = true;
    this.idleCallbacks.forEach(callback => callback());
  }

  private handleActive(): void {
    if (!this.isIdleState) return;
    
    this.isIdleState = false;
    this.activeCallbacks.forEach(callback => callback());
  }
} 