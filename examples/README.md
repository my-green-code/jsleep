# JSleep Examples

This directory contains example implementations of the JSleep library in different frameworks and contexts.

## Running the Examples

To run the examples, follow these steps:

1. Install dependencies:

```bash
npm install
```

2. Build the library:

```bash
npm run build
```

3. Start the examples server:

```bash
npm run examples
```

4. Open your browser and navigate to:

- Basic example: http://localhost:3000/basic-usage.html
- Benchmark example: http://localhost:3000/benchmark.html

## Basic HTML Example

The `basic-usage.html` file demonstrates the core functionality of JSleep in a simple HTML page. It shows:

- Idle state detection
- Animation reduction
- Network request throttling
- FPS reduction
- Status indicators

To run this example:

1. Build the JSleep library: `npm run build`
2. Open `basic-usage.html` in a web browser

### What to Observe

- Watch how animations pause when the user becomes idle
- Notice how network requests are queued when the tab is inactive
- Monitor the status indicator changes
- Test the FPS reduction by checking browser dev tools

## Benchmark Example

The `benchmark.html` file provides a side-by-side comparison of energy usage with and without JSleep. It demonstrates:

- Real-time energy impact comparison
- CPU usage monitoring
- Memory usage tracking
- Network call optimization
- Multiple concurrent animations
- Recursive API calls
- Visual energy meters

Features:

- Side-by-side comparison
- Real-time metrics
- Multiple animation types
- Recursive API calls
- Energy impact visualization
- Start/Stop/Reset controls

To run this example:

1. Build the JSleep library: `npm run build`
2. Open `benchmark.html` in a web browser
3. Click "Start Benchmark" to begin the comparison
4. Observe the energy savings in real-time

### How to Use the Benchmark

1. **Starting the Benchmark**:

   - Click the "Start Benchmark" button
   - Both sides will begin running simultaneously
   - Watch the metrics update in real-time

2. **Observing the Results**:

   - Left side shows normal behavior without JSleep
   - Right side shows optimized behavior with JSleep
   - Compare the energy meters (red vs green)
   - Monitor the network call counters

3. **Testing Different Scenarios**:

   - Leave the tab inactive to see JSleep in action
   - Return to the tab to see resources restore
   - Make network calls to observe request queuing
   - Watch animations pause and resume

4. **Understanding the Metrics**:
   - CPU Usage: Shows processor load
   - Memory Usage: Displays memory consumption
   - Network Calls: Counts API requests
   - Energy Impact: Visual representation of overall efficiency

### Benchmark Details

The benchmark simulates a real-world scenario with:

- 9 concurrent animated elements
- 3 different animation types (pulse, rotate, fade)
- Recursive API calls every 2 seconds
- Continuous performance monitoring

Metrics tracked:

- CPU Usage (simulated)
- Memory Usage (simulated)
- Network Call Count
- Energy Impact (visual meter)

The energy impact is calculated using a weighted formula:

- 70% CPU usage
- 30% Memory usage

Visual feedback:

- Red energy meter: High energy impact
- Green energy meter: Efficient energy usage
- Real-time status updates
- Network call counters
- API status indicators

### Tips for Best Results

1. Run the benchmark in a clean browser tab
2. Keep the tab visible for accurate measurements
3. Use Chrome DevTools to monitor actual performance
4. Test with different idle durations
5. Compare results across different browsers

## React Example

The `react-example.tsx` file shows how to integrate JSleep with a React application. It demonstrates:

- React hooks integration
- Component lifecycle management
- State management with React
- Styled components
- TypeScript integration

To run this example:

1. Install dependencies: `npm install react @types/react`
2. Build the JSleep library: `npm run build`
3. Import the component into your React application

### React Integration Details

- Uses React's useEffect for lifecycle management
- Demonstrates proper cleanup on unmount
- Shows state management with React hooks
- Includes TypeScript type definitions
- Uses styled-components for styling

## Vue.js Example

The `vue-example.vue` file demonstrates JSleep integration with Vue.js. It shows:

- Vue 3 Composition API usage
- Component lifecycle hooks
- Vue reactivity system
- Scoped styles
- TypeScript integration

To run this example:

1. Install dependencies: `npm install vue`
2. Build the JSleep library: `npm run build`
3. Import the component into your Vue application

### Vue Integration Details

- Uses Vue 3 Composition API
- Demonstrates proper cleanup with onUnmounted
- Shows reactive state management
- Includes TypeScript support
- Uses scoped styles for CSS isolation

## Common Features Across Examples

All examples demonstrate:

- Idle state detection
- Resource optimization
- Network request management
- Animation control
- FPS reduction
- Status monitoring
- Cleanup on unmount

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the library: `npm run build`
4. Start the examples server: `npm run examples`
5. Open the examples in your browser

## Contributing

Feel free to submit additional examples or improvements to existing ones. Make sure to:

1. Follow the existing code style
2. Include proper documentation
3. Test the example thoroughly
4. Update this README if necessary
