import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './pages/Layout'
import Loader from './components/loading/Loader'
import { AuthProvider } from './providers/AuthProvider'
import { DataProvider } from './contexts/DataContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/Login'
import NotFound from './pages/NotFound'
import { Toaster } from './components/ui/sonner'

const Dashboard = lazy(() => import('@/pages/Home'))
// const Users = lazy(() => import('@/pages/Users'))
// const Audios = lazy(() => import('@/pages/Audios'))
// const Sentences = lazy(() => import('@/pages/Sentences'))

const routes = [
  { path: '/', component: Dashboard },
  // { path: '/users', component: Users },
  // { path: '/audios', component: Audios },
  // { path: '/sentences', component: Sentences },
]

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Suspense fallback={<Loader/>}>
          <Toaster />
          <Router>
            <Routes>
              <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
                {routes.map((route) => (
                  <Route 
                    key={route.path} 
                    path={route.path} 
                    element={<route.component />} 
                    errorElement={<div>Error</div>}
                  />
                ))}
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Router>
        </Suspense>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
