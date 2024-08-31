import Layout from "./hoc/Layout"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LoaderProvider } from "./context/LoadingContext"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />
        },
      ],
    },
  ])

  return (
    <>
      <LoaderProvider>
        <RouterProvider router={router} />
      </LoaderProvider>
    </>
  )
}

export default App
