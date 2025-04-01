export class BenchmarkManager {
    constructor(metricsManager, apiManager) {
        this.metricsManager = metricsManager;
        this.apiManager = apiManager;
        this.benchmarkInterval = null;
        this.startTime = null;
    }

    start() {
        this.startTime = Date.now();
        this.benchmarkInterval = setInterval(
            () => this.metricsManager.updateMetrics(this.startTime),
            1000
        );
        this.apiManager.startApiCalls();
    }

    stop() {
        clearInterval(this.benchmarkInterval);
        this.apiManager.stopApiCalls();
    }

    reset() {
        this.stop();
        this.metricsManager.resetMetrics();
        this.apiManager.resetApiStatus();
    }
} 