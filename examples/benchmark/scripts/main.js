import { JSleep } from '../../../dist/index.js';
import { BenchmarkManager } from './BenchmarkManager.js';
import { AnimationManager } from './AnimationManager.js';
import { MetricsManager } from './MetricsManager.js';
import { ApiManager } from './ApiManager.js';

class BenchmarkApp {
    constructor() {
        this.jsleep = new JSleep({
            idleTimeout: 3000,
            reduceAnimations: true,
            stopNetworkCalls: true,
            reduceFPS: true,
        });

        this.animationManager = new AnimationManager();
        this.metricsManager = new MetricsManager();
        this.apiManager = new ApiManager();
        this.benchmarkManager = new BenchmarkManager(
            this.metricsManager,
            this.apiManager
        );

        this.initialize();
    }

    initialize() {
        this.animationManager.createAnimations();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => 
            this.benchmarkManager.start()
        );
        document.getElementById('stopBtn').addEventListener('click', () => 
            this.benchmarkManager.stop()
        );
        document.getElementById('resetBtn').addEventListener('click', () => 
            this.benchmarkManager.reset()
        );
    }
}

// Initialize the app
new BenchmarkApp(); 