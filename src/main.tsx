import { createRoot } from 'react-dom/client'
import "flowbite-react";
import "flowbite/dist/flowbite.css";
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { router } from './routes/Router.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
)
