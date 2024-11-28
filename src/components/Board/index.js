import { MENU_ITEMS } from '@/constants'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionItemClick } from '@/slice/menuSlice'
import { socket } from '@/socket'

export const Board = () => {
  const canvasRef = useRef(null)
  const shouldDraw = useRef(false)
  const drawHistory = useRef([])
  const historyPointer = useRef(0)
  const dispatch = useDispatch()
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu)
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])

  // action(undo, redo, download) functionality
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
    } else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1
      if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1
      const imageData = drawHistory.current[historyPointer.current]
      context.putImageData(imageData, 0, 0) // get image data and draw on canvas
    }

    dispatch(actionItemClick(null))
  }, [actionMenuItem, dispatch])

  // to setup color and size
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
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      drawHistory.current.push(imageData)
      historyPointer.current = drawHistory.current.length - 1
    }
    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return
      drawLine(e.clientX, e.clientY)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mousemove', handleMouseMove)

    socket.on('connect', () => {
      console.log('client connected')
    })

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef}></canvas>
}
