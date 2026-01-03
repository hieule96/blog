// Heavenly Wave Animation with Theme Support
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('wave-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let waves = [];

    // Color palettes for each theme
    const lightColors = [
        'rgba(70, 130, 180, 0.4)',   // Steel blue
        'rgba(65, 105, 140, 0.4)',   // Dark sky blue
        'rgba(80, 120, 160, 0.4)'    // Muted navy
    ];

    const darkColors = [
        'rgba(55, 86, 94, 0.5)',   // Teal dark
        'rgba(8, 75, 85, 0.5)',    // Deep teal
        'rgba(17, 53, 53, 0.5)'    // Dark cyan
    ];

    function getTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }

    function getColors() {
        return getTheme() === 'dark' ? darkColors : lightColors;
    }

    function resize() {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
    }

    class Wave {
        constructor(colorIndex, amplitude, frequency, phase, speed) {
            this.colorIndex = colorIndex;
            this.amplitude = amplitude;
            this.frequency = frequency;
            this.phase = phase;
            this.speed = speed;
        }

        draw(ctx, time, colors) {
            ctx.beginPath();
            ctx.fillStyle = colors[this.colorIndex];
            ctx.moveTo(0, height);

            for (let x = 0; x <= width; x += 10) {
                const y = Math.sin(x * this.frequency + this.phase + time * this.speed) * this.amplitude;
                ctx.lineTo(x, height / 2 + y);
            }

            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fill();
        }
    }

    function init() {
        resize();
        waves = [
            new Wave(0, 20, 0.005, 0, 0.03),
            new Wave(1, 40, 0.003, 2, 0.03),
            new Wave(2, 30, 0.009, 4, 0.03)
        ];
    }

    let time = 0;
    function animate() {
        ctx.clearRect(0, 0, width, height);
        time += 0.05;

        const colors = getColors();
        waves.forEach(wave => wave.draw(ctx, time, colors));
        requestAnimationFrame(animate);
    }

    // Listen for theme changes (PaperMod toggle button)
    const observer = new MutationObserver(() => {
        // Colors update automatically on next frame
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    window.addEventListener('resize', resize);
    init();
    animate();
});
