// ============================================================
// 3D — journey: abstract architecture layers (UI / API / DATA)
// three.js served locally from /lib
// ============================================================
import * as THREE from '/lib/three.module.js';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PIXEL_CAP = 2;

function roundedPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function makeTagTexture(text) {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 112;
    const ctx = c.getContext('2d');
    roundedPath(ctx, 6, 6, 244, 100, 28);
    ctx.fillStyle = 'rgba(18,19,26,0.85)';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.stroke();
    ctx.font = '600 44px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(245,245,247,0.92)';
    ctx.fillText(text, 128, 60);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    return tex;
}

const archCanvas = document.getElementById('arch3d');
if (archCanvas) {
    const renderer = new THREE.WebGLRenderer({ canvas: archCanvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, PIXEL_CAP));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 0.9, 0.1, 60);
    camera.position.set(0, 0.4, 8);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(4, 6, 5);
    scene.add(key);

    const group = new THREE.Group();
    const layerDefs = [
        ['UI', 1.25, 0x7c8aff],
        ['API', 0, 0xff6a55],
        ['DATA', -1.25, 0x35b273]
    ];
    layerDefs.forEach(([label, y, color]) => {
        const slab = new THREE.Mesh(
            new THREE.BoxGeometry(2.9, 0.22, 1.9),
            new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.4, metalness: 0.3, roughness: 0.35 })
        );
        slab.position.y = y;
        group.add(slab);

        const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(slab.geometry),
            new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 })
        );
        edges.position.y = y;
        group.add(edges);

        const tag = new THREE.Mesh(
            new THREE.PlaneGeometry(1.15, 0.5),
            new THREE.MeshBasicMaterial({ map: makeTagTexture(label), transparent: true, depthWrite: false })
        );
        tag.position.set(2.15, y + 0.05, 0.4);
        group.add(tag);
    });

    const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 2.5, 8),
        new THREE.MeshBasicMaterial({ color: 0xff6a55, transparent: true, opacity: 0.5 })
    );
    group.add(beam);

    group.rotation.x = 0.42;
    group.rotation.y = -0.5;
    scene.add(group);

    function resize() {
        const w = archCanvas.clientWidth || 360;
        const h = archCanvas.clientHeight || 400;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = camera.aspect < 0.95 ? 8 / camera.aspect * 0.95 : 8;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const idle = prefersReduced ? 0 : clock.getElapsedTime();
        const rect = archCanvas.getBoundingClientRect();
        // skip work while the canvas is off-screen
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const prog = 1 - (rect.top + rect.height / 2) / window.innerHeight;
        group.rotation.y = -0.5 + Math.sin(idle * 0.25) * 0.1 + (Math.max(0, Math.min(1, prog)) - 0.5) * 0.9;
        group.position.y = Math.sin(idle * 0.5) * 0.08;
        renderer.render(scene, camera);
    }
    animate();
}
