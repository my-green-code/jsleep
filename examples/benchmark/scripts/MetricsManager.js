export class MetricsManager {
    constructor() {
        this.metrics = {
            cpu: { with: 0, without: 0 },
            memory: { with: 0, without: 0 },
            energy: { with: 0, without: 0 }
        };
    }

    updateMetrics(startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000;
        
        // Simulate metrics (replace with real metrics in production)
        this.updateCpuMetrics();
        this.updateMemoryMetrics();
        this.updateEnergyMetrics();
    }

    updateCpuMetrics() {
        const cpuWithout = Math.min(100, 30 + Math.random() * 20);
        const cpuWith = Math.min(100, 5 + Math.random() * 10);
        
        document.getElementById('cpu-without').textContent = `${cpuWithout.toFixed(1)}%`;
        document.getElementById('cpu-with').textContent = `${cpuWith.toFixed(1)}%`;
        
        this.metrics.cpu = { with: cpuWith, without: cpuWithout };
    }

    updateMemoryMetrics() {
        const memoryWithout = Math.floor(100 + Math.random() * 50);
        const memoryWith = Math.floor(50 + Math.random() * 20);
        
        document.getElementById('memory-without').textContent = `${memoryWithout} MB`;
        document.getElementById('memory-with').textContent = `${memoryWith} MB`;
        
        this.metrics.memory = { with: memoryWith, without: memoryWithout };
    }

    updateEnergyMetrics() {
        const energyWithout = Math.min(
            100,
            this.metrics.cpu.without * 0.7 + this.metrics.memory.without * 0.3
        );
        const energyWith = Math.min(
            100,
            this.metrics.cpu.with * 0.7 + this.metrics.memory.with * 0.3
        );

        const energyMeterWithout = document.getElementById('energy-without');
        const energyMeterWith = document.getElementById('energy-with');

        energyMeterWithout.style.width = `${energyWithout}%`;
        energyMeterWith.style.width = `${energyWith}%`;
        energyMeterWith.classList.toggle('efficient', energyWith < energyWithout);
    }

    resetMetrics() {
        ['with', 'without'].forEach(suffix => {
            document.getElementById(`cpu-${suffix}`).textContent = '0%';
            document.getElementById(`memory-${suffix}`).textContent = '0 MB';
            document.getElementById(`energy-${suffix}`).style.width = '0%';
            document.getElementById(`network-${suffix}`).textContent = '0';
        });
    }
} 