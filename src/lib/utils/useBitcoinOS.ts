/**
 * Bitcoin OS React Hook
 * Use this in your React apps to integrate with Bitcoin OS
 */

import { useEffect, useState, useCallback, useSyncExternalStore } from 'react'

const noopSubscribe = () => () => {}

function checkOS(): boolean {
  try {
    return window.parent !== window && window.parent.location.href.includes('bitcoin-os')
  } catch {
    return window.parent !== window
  }
}

interface BitcoinOSConfig {
  theme?: 'light' | 'dark'
  appName?: string
  [key: string]: unknown
}

export function useBitcoinOS() {
  // Browser-only read; false during SSR, real value after hydration
  const isInOS = useSyncExternalStore(noopSubscribe, checkOS, () => false)
  const [config, setConfig] = useState<BitcoinOSConfig>({})
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    if (!checkOS()) return

    // Handle messages from OS
    const handleMessage = (event: MessageEvent) => {
      const { type, ...data } = event.data

      switch (type) {
        case 'os-config':
          setConfig(data)
          if (data.theme) {
            setTheme(data.theme)
            document.documentElement.setAttribute('data-theme', data.theme)
          }
          break
        case 'theme-change':
          setTheme(data.theme)
          document.documentElement.setAttribute('data-theme', data.theme)
          break
      }
    }

    window.addEventListener('message', handleMessage)

    // Notify OS that app is ready
    window.parent.postMessage({
      type: 'app-ready',
      app: window.location.hostname
    }, '*')

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const sendToOS = useCallback((type: string, data: Record<string, unknown> = {}) => {
    if (!isInOS) return
    
    window.parent.postMessage({
      type,
      ...data
    }, '*')
  }, [isInOS])

  const navigateHome = useCallback(() => {
    sendToOS('navigate-home')
  }, [sendToOS])

  const openApp = useCallback((appName: string) => {
    sendToOS('open-app', { app: appName })
  }, [sendToOS])

  const showNotification = useCallback((title: string, message: string) => {
    sendToOS('notification', { title, message })
  }, [sendToOS])

  const setTitle = useCallback((title: string) => {
    sendToOS('set-title', { title })
  }, [sendToOS])

  return {
    isInOS,
    config,
    theme,
    navigateHome,
    openApp,
    showNotification,
    setTitle,
    sendToOS
  }
}