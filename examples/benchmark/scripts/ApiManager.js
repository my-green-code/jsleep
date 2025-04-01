export class ApiManager {
    constructor() {
        this.networkCalls = {
            with: 0,
            without: 0
        };
        this.apiIntervals = {
            with: null,
            without: null
        };
    }

    async makeApiCall(withJsleep = false) {
        const suffix = withJsleep ? 'with' : 'without';
        const statusElement = document.getElementById(`api-status-${suffix}`);
        
        try {
            statusElement.textContent = 'API Status: Making request...';
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            const data = await response.json();

            this.networkCalls[suffix]++;
            document.getElementById(`network-${suffix}`).textContent = 
                this.networkCalls[suffix];

            statusElement.textContent = `API Status: Success (${data.id})`;
        } catch (error) {
            console.error('API Error:', error);
            statusElement.textContent = `API Status: Error - ${error.message}`;
        }
    }

    startApiCalls() {
        ['with', 'without'].forEach(suffix => {
            this.apiIntervals[suffix] = setInterval(
                () => this.makeApiCall(suffix === 'with'),
                2000
            );
        });
    }

    stopApiCalls() {
        ['with', 'without'].forEach(suffix => {
            clearInterval(this.apiIntervals[suffix]);
        });
    }

    resetApiStatus() {
        this.networkCalls = { with: 0, without: 0 };
        ['with', 'without'].forEach(suffix => {
            document.getElementById(`api-status-${suffix}`).textContent = 
                'API Status: Ready';
        });
    }
} 