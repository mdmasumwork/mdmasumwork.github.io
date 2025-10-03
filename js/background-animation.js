const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Function to calculate particle count based on screen size
function getParticleCountForScreenSize() {
    const width = window.innerWidth;
    
    // Mobile (under 768px)
    if (width < 768) {
        return 30;
    }
    // Desktop (above 1200px)
    else if (width >= 1200) {
        return 100;
    }
    // Tablets and intermediate screens
    else {
        // Linear interpolation between 30 and 100 based on screen width
        return Math.floor(30 + (width - 768) * (100 - 30) / (1200 - 768));
    }
}

// Create particles
function createParticles() {
    particles = [];
    const particleCount = getParticleCountForScreenSize();
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: 0.5,
        });
    }
}

createParticles();

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw and update particles
    particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.stroke();
            }
        }
    });
}

function animate() {
    drawParticles();
    requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles(); // Recreate particles with appropriate count
});
