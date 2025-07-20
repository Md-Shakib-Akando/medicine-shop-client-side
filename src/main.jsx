import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
} from "react-router";

import { router } from './router/router.jsx';
import AuthProvider from './AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReTitleProvider } from 're-title';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReTitleProvider>
          <RouterProvider router={router}>

          </RouterProvider>
        </ReTitleProvider>
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
