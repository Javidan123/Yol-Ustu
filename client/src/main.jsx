import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './router'
import './style.scss'

createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)
