// src/components/shared/backgrounds/BlackHoleText.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

let environment = null;
let isPaused = false;

export function setBlackHolePaused(paused) {
  isPaused = paused;
  if (environment && environment.renderer) {
    if (paused) {
      // Stop rendering
      environment.renderer.setAnimationLoop(null);
    } else {
      // Resume rendering
      environment.renderer.setAnimationLoop(() => environment.render());
    }
  }
}

export default function BlackHoleText() {
  const containerRef = useRef(null);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    // Reduce particle count on mobile for better performance
    if (this.data && this.data.amount) {
      this.data.amount = Math.floor(this.data.amount * 0.5);
    }
  }
    let envInstance;

    const preload = async () => {
      const manager = new THREE.LoadingManager();

      const loadFont = () => {
        return new Promise((resolve) => {
          const loader = new FontLoader(manager);
          // Changed to droid font for demonstration
          loader.load(
            'https://threejs.org/examples/fonts/droid/droid_serif_regular.typeface.json',
            (font) => {
              setTimeout(() => resolve(font), 500);
            }
          );
        });
      };

      const loadTexture = () => {
        return new Promise((resolve) => {
          const textureLoader = new THREE.TextureLoader(manager);
          textureLoader.load(
            'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png',
            (texture) => {
              setTimeout(() => resolve(texture), 500);
            }
          );
        });
      };

      try {
        const [font, particle] = await Promise.all([loadFont(), loadTexture()]);
        if (font && particle) {
          envInstance = new Environment(font, particle);
          /**
           * Store globally so we can pause/resume later.
           */
          environment = envInstance;
        }
      } catch (error) {
        console.error('Error loading resources:', error);
      }
    };

    class Environment {
      constructor(font, particle) {
        this.font = font;
        this.particle = particle;
        this.container = containerRef.current;
        this.scene = new THREE.Scene();
        this.createCamera();
        this.createRenderer();
        this.setup();
        this.bindEvents();
      }

      setup() {
        this.createParticles = new CreateParticles(
          this.scene,
          this.font,
          this.particle,
          this.camera,
          this.renderer
        );
      }

      render() {
        if (this.createParticles) {
          this.createParticles.render();
        }
        this.renderer.render(this.scene, this.camera);
      }

      createCamera() {
        this.camera = new THREE.PerspectiveCamera(
          65,
          this.container.clientWidth / this.container.clientHeight,
          1,
          10000
        );
        this.camera.position.set(0, 0, 100);
      }

      createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        this.renderer.setSize(
          this.container.clientWidth,
          this.container.clientHeight
        );
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        // Start the animation loop (unless isPaused was already set)
        if (!isPaused) {
          this.renderer.setAnimationLoop(() => this.render());
        }
      }

      bindEvents() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
      }

      onWindowResize() {
        this.camera.aspect =
          this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
          this.container.clientWidth,
          this.container.clientHeight
        );
      }
    }

    class CreateParticles {
      constructor(scene, font, particleImg, camera, renderer) {
        this.scene = scene;
        this.font = font;
        this.particleImg = particleImg;
        this.camera = camera;
        this.renderer = renderer;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(-200, 200);

        this.data = {
          text: 'INTENT',
          amount: 3000,
          particleSize: 2,
          particleColor: 0xffffff,
          textSize: 24,
          area: 250,
          ease: 0.1,
        };

        this.setup();
        this.bindEvents();
      }

      setup() {
        const geometry = new THREE.PlaneGeometry(
          this.visibleWidthAtZDepth(120, this.camera),
          this.visibleHeightAtZDepth(120, this.camera)
        );
        const material = new THREE.MeshBasicMaterial({
          color: 0x06af6e,
          transparent: true,
        });
        this.planeArea = new THREE.Mesh(geometry, material);
        this.planeArea.visible = false;
        this.scene.add(this.planeArea);
        this.createText();
      }

      createText() {
        const shapes = this.font.generateShapes(this.data.text, this.data.textSize);
        const geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();

        const xMid =
          -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        const yMid =
          (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 2.85;

        geometry.center();

        let thePoints = [];
        let colors = [];
        let sizes = [];

        shapes.forEach((shape) => {
          if (shape.holes && shape.holes.length > 0) {
            shapes.push(...shape.holes);
          }

          const points = shape.getSpacedPoints(this.data.amount);
          points.forEach((element) => {
            thePoints.push(new THREE.Vector3(element.x, element.y, 0));
            colors.push(1, 1, 1);
            sizes.push(1);
          });
        });

        let geoParticles = new THREE.BufferGeometry().setFromPoints(thePoints);
        geoParticles.translate(xMid, yMid, 0);

        geoParticles.setAttribute(
          'customColor',
          new THREE.Float32BufferAttribute(colors, 3)
        );
        geoParticles.setAttribute(
          'size',
          new THREE.Float32BufferAttribute(sizes, 1)
        );

        const material = new THREE.ShaderMaterial({
          uniforms: {
            color: { value: new THREE.Color(0xffffff) },
            pointTexture: { value: this.particleImg },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 customColor;
            varying vec3 vColor;
            void main() {
              vColor = customColor;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (350.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform vec3 color;
            uniform sampler2D pointTexture;
            varying vec3 vColor;
            void main() {
              vec4 texColor = texture2D(pointTexture, gl_PointCoord);
              gl_FragColor = vec4(1.0, 1.0, 1.0, texColor.a);
            }
          `,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true,
        });

        this.particles = new THREE.Points(geoParticles, material);
        this.scene.add(this.particles);

        this.geometryCopy = new THREE.BufferGeometry();
        this.geometryCopy.copy(this.particles.geometry);
      }

      bindEvents() {
        document.addEventListener('mousedown', this.handleInteraction.bind(this));
        document.addEventListener('mousemove', this.handleInteraction.bind(this));
        document.addEventListener('mouseup', this.handleInteraction.bind(this));
      }

      handleInteraction(e) {
        if (window.scrollY > window.innerHeight) return;
        if (e.type === 'mousedown') this.onMouseDown(e);
        else if (e.type === 'mousemove') this.onMouseMove(e);
        else if (e.type === 'mouseup') this.onMouseUp(e);
      }

      onMouseDown(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.buttom = true;
        this.data.ease = 0.01;
      }

      onMouseUp() {
        this.buttom = false;
        this.data.ease = 0.05;
      }

      onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }

      render() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObject(this.planeArea);

        if (intersects.length > 0) {
          const pos = this.particles.geometry.attributes.position;
          const copy = this.geometryCopy.attributes.position;
          const colors = this.particles.geometry.attributes.customColor;
          const size = this.particles.geometry.attributes.size;

          const mx = intersects[0].point.x;
          const my = intersects[0].point.y;

          for (let i = 0; i < pos.count; i++) {
            const initX = copy.getX(i);
            const initY = copy.getY(i);
            const initZ = copy.getZ(i);

            let px = pos.getX(i);
            let py = pos.getY(i);
            let pz = pos.getZ(i);

            const dx = mx - px;
            const dy = my - py;
            const mouseDistance = this.distance(mx, my, px, py);
            const d = dx * dx + dy * dy;
            const f = -this.data.area / d;

            if (this.buttom) {
              const t = Math.atan2(dy, dx);
              px -= f * Math.cos(t);
              py -= f * Math.sin(t);
              colors.setXYZ(i, 1, 1, 1);
            } else if (mouseDistance < this.data.area) {
              if (i % 5 === 0) {
                const t = Math.atan2(dy, dx);
                px -= 0.03 * Math.cos(t);
                py -= 0.03 * Math.sin(t);
                size.array[i] = this.data.particleSize / 1.2;
              } else {
                const t = Math.atan2(dy, dx);
                px += f * Math.cos(t);
                py += f * Math.sin(t);
                size.array[i] = this.data.particleSize * 1.3;
              }
              colors.setXYZ(i, 1, 1, 1);
              size.array[i] = this.data.particleSize / 1.8;
            }

            // Ease back toward initial positions
            px += (initX - px) * this.data.ease;
            py += (initY - py) * this.data.ease;
            pz += (initZ - pz) * this.data.ease;

            pos.setXYZ(i, px, py, pz);
          }
          pos.needsUpdate = true;
          colors.needsUpdate = true;
          size.needsUpdate = true;
        }
      }

      visibleHeightAtZDepth(depth, camera) {
        const cameraOffset = camera.position.z;
        if (depth < cameraOffset) depth -= cameraOffset;
        else depth += cameraOffset;
        const vFOV = (camera.fov * Math.PI) / 180;
        return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
      }

      visibleWidthAtZDepth(depth, camera) {
        const height = this.visibleHeightAtZDepth(depth, camera);
        return height * camera.aspect;
      }

      distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      }
    }

    // Trigger preload when DOM is ready
    if (
      document.readyState === 'complete' ||
      (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
      preload();
    } else {
      document.addEventListener('DOMContentLoaded', preload);
    }

    // Cleanup on unmount
    return () => {
      if (envInstance) {
        envInstance.renderer.dispose();
        envInstance.scene.clear();
      }
      // Clear the global reference
      environment = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen"
      style={{ 
        position: 'absolute',
        left: '0',
        top: '0',
        overflow: 'hidden'
      }}
    />
  );
}
