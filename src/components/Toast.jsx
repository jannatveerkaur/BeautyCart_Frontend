import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import './Toast.css'

function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button
        type="button"
        aria-label="Close toast"
        onClick={() => {
          setIsVisible(false)
          onClose?.()
        }}
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default Toast
