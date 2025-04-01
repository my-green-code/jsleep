import React, { useEffect, useState } from 'react';
import JSleep from '../../dist/index';

interface EnergyStats {
  fps: number;
  networkCalls: number;
  animations: number;
}

const ReactExample: React.FC = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [stats, setStats] = useState<EnergyStats>({
    fps: 60,
    networkCalls: 0,
    animations: 0
  });
  const [jsleep, setJsleep] = useState<JSleep | null>(null);

  useEffect(() => {
    // Initialize JSleep
    const jsleepInstance = new JSleep({
      idleTimeout: 3000, // 3 seconds
      reduceAnimations: true,
      stopNetworkCalls: true,
      reduceFPS: true,
      onIdle: () => {
        setIsIdle(true);
        setStats(prev => ({
          ...prev,
          fps: 1,
          animations: 0
        }));
      },
      onActive: () => {
        setIsIdle(false);
        setStats(prev => ({
          ...prev,
          fps: 60,
          animations: 1
        }));
      }
    });

    setJsleep(jsleepInstance);

    // Cleanup
    return () => {
      jsleepInstance.destroy();
    };
  }, []);

  const makeNetworkCall = async () => {
    setStats(prev => ({ ...prev, networkCalls: prev.networkCalls + 1 }));
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await response.json();
      console.log('Network call successful:', data);
    } catch (error) {
      console.error('Network call failed:', error);
    }
  };

  return (
    <div className="react-example">
      <h1>JSleep React Example</h1>
      
      <div className={`status ${isIdle ? 'idle' : 'active'}`}>
        Status: {isIdle ? 'Idle' : 'Active'}
      </div>

      <div className="stats">
        <h2>Energy Statistics</h2>
        <div>FPS: {stats.fps}</div>
        <div>Network Calls: {stats.networkCalls}</div>
        <div>Animations: {stats.animations}</div>
      </div>

      <div className="demo-section">
        <h2>Demo Controls</h2>
        <button onClick={makeNetworkCall}>
          Make Network Call
        </button>
      </div>

      <div className="animated-elements">
        <div className="animated-box" />
        <div className="animated-circle" />
        <div className="animated-text">
          This text will animate
        </div>
      </div>

      <style jsx>{`
        .react-example {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .status {
          padding: 10px;
          margin: 10px 0;
          border-radius: 4px;
          font-weight: bold;
        }

        .active {
          background-color: #2ecc71;
          color: white;
        }

        .idle {
          background-color: #e74c3c;
          color: white;
        }

        .stats {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          margin: 20px 0;
        }

        .demo-section {
          margin: 20px 0;
        }

        button {
          padding: 10px 20px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #2980b9;
        }

        .animated-elements {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .animated-box {
          width: 100px;
          height: 100px;
          background-color: #3498db;
          animation: pulse 2s infinite;
        }

        .animated-circle {
          width: 80px;
          height: 80px;
          background-color: #e74c3c;
          border-radius: 50%;
          animation: rotate 3s infinite linear;
        }

        .animated-text {
          font-size: 24px;
          color: #2c3e50;
          animation: fade 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fade {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ReactExample; 