import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'

import {
  HomePage,
  NotFoundPage,
  AutomaticInsertionPage,
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
    path: '/automatic-insertion',
    element: <AutomaticInsertionPage />
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
