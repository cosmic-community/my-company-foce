'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface BusinessCardCanvasProps {
  scene: 'torus' | 'ribbon' | 'morph' | 'orbit'
}

export default function BusinessCardCanvas({ scene }: BusinessCardCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const threeScene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    )
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const objects: THREE.Object3D[] = []
    const disposables: Array<{ dispose: () => void }> = []

    const gradMat = () =>
      new THREE.MeshBasicMaterial({
        color: 0x4fc3f7,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      })

    if (scene === 'torus') {
      const geo = new THREE.TorusKnotGeometry(1.1, 0.35, 80, 12)
      const mat = gradMat()
      const mesh = new THREE.Mesh(geo, mat)
      threeScene.add(mesh)
      objects.push(mesh)
      disposables.push(geo, mat)
    } else if (scene === 'ribbon') {
      const points: THREE.Vector3[] = []
      for (let i = 0; i <= 60; i++) {
        const t = (i / 60) * Math.PI * 4
        points.push(new THREE.Vector3((i / 60) * 4 - 2, Math.sin(t) * 0.8, Math.cos(t) * 0.4))
      }
      const curve = new THREE.CatmullRomCurve3(points)
      const geo = new THREE.TubeGeometry(curve, 80, 0.12, 8, false)
      const mat = new THREE.MeshBasicMaterial({ color: 0x1565c0, transparent: true, opacity: 0.85 })
      const mesh = new THREE.Mesh(geo, mat)
      threeScene.add(mesh)
      objects.push(mesh)
      disposables.push(geo, mat)
    } else if (scene === 'morph') {
      const geo = new THREE.IcosahedronGeometry(1.4, 1)
      const mat = new THREE.MeshBasicMaterial({
        color: 0x4fc3f7,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      })
      const mesh = new THREE.Mesh(geo, mat)
      threeScene.add(mesh)
      objects.push(mesh)
      disposables.push(geo, mat)
    } else if (scene === 'orbit') {
      const centerGeo = new THREE.SphereGeometry(0.3, 16, 16)
      const centerMat = new THREE.MeshBasicMaterial({ color: 0x4fc3f7 })
      const center = new THREE.Mesh(centerGeo, centerMat)
      threeScene.add(center)
      disposables.push(centerGeo, centerMat)
      for (let i = 0; i < 3; i++) {
        const g = new THREE.SphereGeometry(0.18, 16, 16)
        const m = new THREE.MeshBasicMaterial({ color: 0x0d47a1 })
        const s = new THREE.Mesh(g, m)
        threeScene.add(s)
        objects.push(s)
        disposables.push(g, m)
      }
    }

    let frameId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const t = clock.getElapsedTime()

      if (scene === 'orbit') {
        objects.forEach((obj, i) => {
          const angle = t + (i * Math.PI * 2) / 3
          obj.position.set(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, Math.sin(angle * 0.5))
        })
      } else if (scene === 'morph') {
        const mesh = objects[0]
        if (mesh) {
          mesh.rotation.x = t * 0.4
          mesh.rotation.y = t * 0.6
          mesh.scale.setScalar(1 + Math.sin(t * 1.5) * 0.12)
        }
      } else {
        objects.forEach((obj) => {
          obj.rotation.x += 0.008
          obj.rotation.y += 0.012
        })
      }

      renderer.render(threeScene, camera)
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
      disposables.forEach((d) => d.dispose())
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [scene])

  return <div ref={mountRef} className="w-full h-full" />
}