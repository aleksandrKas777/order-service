import { Router } from "@/router/Router.jsx"
import { BrowserRouter } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { AuthProvider } from "@/auth/AuthProvider";

const optionsQueryParamsProvider = {
  includeAllParams: true,
  skipUpdateWhenNoChange: true,
}

function App() {
  
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <QueryParamProvider adapter={ReactRouter6Adapter} options={optionsQueryParamsProvider}>
            <Router/>
          </QueryParamProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
