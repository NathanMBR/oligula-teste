import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'

import {
  HomePage,
  NotFoundPage,
  AutomatorPage,
  InmetroSealGeneratorPage,
  SpreadsheetFormatterPage
} from '../pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },

  {
    path: '/automator',
    element: <AutomatorPage />
  }

  // {
  //   path: '/inmetro-seal-generator',
  //   element: <InmetroSealGeneratorPage />
  // },

  // {
  //   path: '/spreadsheet-formatter',
  //   element: <SpreadsheetFormatterPage />
  // }
])

export const ReactRouterProvider = () => {
  return (
    <RouterProvider router={router} />
  )
}
