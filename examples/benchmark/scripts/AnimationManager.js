export class AnimationManager {
    createAnimations() {
        this.createAnimationElements('animations-without');
        this.createAnimationElements('animations-with');
    }

    createAnimationElements(containerId) {
        const container = document.getElementById(containerId);
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            div.className = 'animated-item';
            container.appendChild(div);
        }
    }
} 