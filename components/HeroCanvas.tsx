'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    )
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Caustic gradient background plane
    const planeGeo = new THREE.PlaneGeometry(40, 24)
    const planeMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec2 uv = vUv;
          float wave = sin(uv.x * 6.0 + uTime * 0.6) * 0.5 + 0.5;
          float wave2 = cos(uv.y * 5.0 - uTime * 0.4) * 0.5 + 0.5;
          float caustic = sin((uv.x + uv.y) * 10.0 + uTime) * 0.15;
          vec3 deep = vec3(0.008, 0.043, 0.094);
          vec3 mid = vec3(0.039, 0.165, 0.290);
          vec3 col = mix(deep, mid, uv.y + wave * 0.2 + caustic);
          col += vec3(0.05, 0.15, 0.25) * wave2 * 0.25;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
    const plane = new THREE.Mesh(planeGeo, planeMat)
    plane.position.z = -4
    scene.add(plane)

    // Particles
    const particleCount = 4000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const colorTop = new THREE.Color('#4FC3F7')
    const colorBottom = new THREE.Color('#0D47A1')
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 18
      const y = (Math.random() - 0.5) * 12
      const z = (Math.random() - 0.5) * 8
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      const t = (y + 6) / 12
      const c = colorBottom.clone().lerp(colorTop, t)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    })
    const points = new THREE.Points(particleGeo, particleMat)
    scene.add(points)

    // Wireframe icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3, 1)
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x1565c0,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    ico.position.set(3.5, 0, -1)
    scene.add(ico)

    let frameId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      planeMat.uniforms.uTime.value = elapsed

      const pos = particleGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < particleCount; i++) {
        let y = pos.getY(i)
        y += 0.006
        if (y > 6) y = -6
        const x = pos.getX(i) + Math.sin(elapsed * 0.3 + i) * 0.002
        pos.setY(i, y)
        pos.setX(i, x)
      }
      pos.needsUpdate = true

      ico.rotation.x += 0.0015
      ico.rotation.y += 0.002

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      planeGeo.dispose()
      planeMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      icoGeo.dispose()
      icoMat.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />
}