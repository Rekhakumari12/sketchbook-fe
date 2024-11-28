import { io } from 'socket.io-client'

const URL = process.env.NODE_ENV === 'development' ? 'https://sketchbook-be.onrender.com' : 'http://localhost:3001'
export const socket = io(URL)
