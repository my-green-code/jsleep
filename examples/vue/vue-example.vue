<template>
	<div class="vue-example">
		<h1>JSleep Vue Example</h1>

		<div :class="['status', isIdle ? 'idle' : 'active']">
			Status: {{ isIdle ? 'Idle' : 'Active' }}
		</div>

		<div class="stats">
			<h2>Energy Statistics</h2>
			<div>FPS: {{ stats.fps }}</div>
			<div>Network Calls: {{ stats.networkCalls }}</div>
			<div>Animations: {{ stats.animations }}</div>
		</div>

		<div class="demo-section">
			<h2>Demo Controls</h2>
			<button @click="makeNetworkCall">Make Network Call</button>
		</div>

		<div class="animated-elements">
			<div class="animated-box"></div>
			<div class="animated-circle"></div>
			<div class="animated-text">This text will animate</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import JSleep from '../dist/index';

interface EnergyStats {
	fps: number;
	networkCalls: number;
	animations: number;
}

export default defineComponent({
	name: 'VueExample',
	setup() {
		const isIdle = ref(false);
		const stats = ref<EnergyStats>({
			fps: 60,
			networkCalls: 0,
			animations: 0,
		});
		let jsleep: JSleep | null = null;

		onMounted(() => {
			// Initialize JSleep
			jsleep = new JSleep({
				idleTimeout: 3000, // 3 seconds
				reduceAnimations: true,
				stopNetworkCalls: true,
				reduceFPS: true,
				onIdle: () => {
					isIdle.value = true;
					stats.value = {
						...stats.value,
						fps: 1,
						animations: 0,
					};
				},
				onActive: () => {
					isIdle.value = false;
					stats.value = {
						...stats.value,
						fps: 60,
						animations: 1,
					};
				},
			});
		});

		onUnmounted(() => {
			if (jsleep) {
				jsleep.destroy();
			}
		});

		const makeNetworkCall = async () => {
			stats.value.networkCalls++;
			try {
				const response = await fetch(
					'https://jsonplaceholder.typicode.com/posts/1',
				);
				const data = await response.json();
				console.log('Network call successful:', data);
			} catch (error) {
				console.error('Network call failed:', error);
			}
		};

		return {
			isIdle,
			stats,
			makeNetworkCall,
		};
	},
});
</script>

<style scoped>
.vue-example {
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
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

@keyframes fade {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
	100% {
		opacity: 1;
	}
}
</style>
