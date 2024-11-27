import { MENU_ITEMS } from '@/constants'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionItemClick } from '@/slice/menuSlice'

export const Board = () => {
  const canvasRef = useRef(null)
  const shouldDraw = useRef(false)
  const dispatch = useDispatch()
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu)
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URl = canvas.toDataURL()
      const anchor = document.createElement('a')
      anchor.href = URl
      anchor.download = 'sketch.jpg'
      anchor.click()
    }

    dispatch(actionItemClick(null))
  }, [actionMenuItem, dispatch])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const changeConfig = () => {
      context.strokeStyle = color
      context.lineWidth = size
    }

    changeConfig()
  }, [color, size])

  //reserved useLayoutEffect for canvas update (on before browser paint)
  useLayoutEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const beginPath = (x, y) => {
      context.beginPath()
      context.moveTo(x, y)
    }

    const drawLine = (x, y) => {
      context.lineTo(x, y)
      context.stroke()
    }

    const handleMouseDown = (e) => {
      shouldDraw.current = true
      beginPath(e.clientX, e.clientY)
    }
    const handleMouseUp = () => {
      shouldDraw.current = false
    }
    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return
      drawLine(e.clientX, e.clientY)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef}></canvas>
}
