import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'

import {
  HomePage,
  NotFoundPage,
  AutomaticInsertionPage,
  InmetroSealGeneratorPage
} from '../pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },

  {
    path: '/automatic-insertion',
    element: <AutomaticInsertionPage />
  },

  {
    path: '/inmetro-seal-generator',
    element: <InmetroSealGeneratorPage />
  }
])

export const ReactRouterProvider = () => {
  return (
    <RouterProvider router={router} />
  )
}
