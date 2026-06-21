# Referencia — Three.js (CDN r184 + skill comunitaria)

Skill comunitaria: CloudAI-X/threejs-skills — 10 skills instaladas en `.claude/skills/threejs-*/` (sin symlinks).
Uso en EVOLink: **fondo 3D decorativo o protagonista scroll-driven** en previews 11-12. HTML estático + CDN, sin build.

## Setup mínimo (importmap CDN r184)

```html
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.184.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.184.0/examples/jsm/"
    }
  }
</script>
<script type="module">
  import * as THREE from 'three';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    antialias: !('ontouchstart' in window), // antialias off en móvil
    alpha: true
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); // cap móvil
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  // geometría + material + mesh
  const geometry = new THREE.IcosahedronGeometry(1.5, 2);
  const material = new THREE.MeshStandardMaterial({ color: 0x6366f1, wireframe: false });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 1-2 luces máximo (rendimiento móvil)
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animate();
</script>
```

## Recetas de fondo decorativo

### Partículas flotantes
```js
import * as THREE from 'three';
const count = window.innerWidth < 768 ? 500 : 2000; // menos en móvil
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 20;
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 0.03, color: 0xffffff }));
scene.add(particles);
// en el loop: particles.rotation.y += 0.0003;
```

### Malla deformada (ondas)
```js
const geo = new THREE.PlaneGeometry(10, 10, window.innerWidth < 768 ? 20 : 60, 60);
// en el loop con clock.getElapsedTime():
const pos = geo.attributes.position;
for (let i = 0; i < pos.count; i++) {
  const x = pos.getX(i), y = pos.getY(i);
  pos.setZ(i, Math.sin(x * 0.5 + t) * 0.3 + Math.sin(y * 0.5 + t * 0.8) * 0.3);
}
pos.needsUpdate = true;
```

## Integración scroll-driven con GSAP

```js
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.js';
import ScrollTrigger from 'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: '#three-section',
  start: 'top top',
  end: 'bottom bottom',
  scrub: 1.5,
  onUpdate: ({ progress }) => {
    mesh.rotation.y = progress * Math.PI * 2;
    mesh.rotation.x = progress * Math.PI * 0.5;
    camera.position.z = 5 - progress * 2;
  }
});
```

## Caps de rendimiento móvil (obligatorios en 11-12)

| Cap | Código |
|-----|--------|
| Pixel ratio máx 2 | `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` |
| Antialias off en móvil | `antialias: !('ontouchstart' in window)` |
| Menos segmentos en móvil | `isMobile ? 20 : 60` en PlaneGeometry / IcosahedronGeometry |
| Máx 2 luces | AmbientLight + 1 DirectionalLight |
| `prefers-reduced-motion` | Pausar el loop con `gsap.matchMedia()` |

```js
gsap.matchMedia().add('(prefers-reduced-motion: reduce)', () => {
  renderer.setAnimationLoop(null); // detener loop Three.js
});
```

## Skills comunitarias disponibles (CloudAI-X)

| Skill | Cuándo usar |
|-------|-------------|
| `threejs-fundamentals` | Setup escena, cámara, renderer, jerarquía |
| `threejs-geometry` | Shapes, BufferGeometry, instancing |
| `threejs-materials` | PBR, wireframe, MeshStandardMaterial |
| `threejs-lighting` | Tipos de luz, sombras, IBL |
| `threejs-animation` | Keyframes, loop de animación, morph targets |
| `threejs-textures` | UV, cubemaps, env maps |
| `threejs-shaders` | GLSL, ShaderMaterial, uniforms |
| `threejs-interaction` | Raycasting, controles (OrbitControls, etc.) |
| `threejs-postprocessing` | EffectComposer, bloom, DOF |
| `threejs-loaders` | GLTF, HDR, progress callbacks |
