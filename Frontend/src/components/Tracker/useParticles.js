"use client"

import { useCallback } from "react"
import { loadFull } from "tsparticles"

export const useParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    // You can add any additional logic here when particles are loaded
  }, [])

  return { particlesInit, particlesLoaded }
}

