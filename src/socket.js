import { io } from 'socket.io-client'

const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://sketchbook-be.onrender.com'
export const socket = io(URL)
