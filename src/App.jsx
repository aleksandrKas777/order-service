import { Router } from "@/router/Router.jsx"
import { BrowserRouter } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { AuthProvider } from "@/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const optionsQueryParamsProvider = {
  includeAllParams: true,
  skipUpdateWhenNoChange: true,
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter} options={optionsQueryParamsProvider}>
              <Router/>
            </QueryParamProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer/>
    </>
  )
}

export default App
