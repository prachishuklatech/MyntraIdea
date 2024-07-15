import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChatList } from './Components/chats.tsx'
import { VirtualDress } from './Components/virtualDress.tsx'


const router = createBrowserRouter([
  {
    path: '/users',
    element: <ChatList />
  },
  {
    path: 'virtualDress',
    element: <VirtualDress /> 
  },
  {
    path: '/',
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
