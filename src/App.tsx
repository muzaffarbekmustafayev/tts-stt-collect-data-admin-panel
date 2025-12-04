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
import { pageNames } from './services/staticNames'

const Dashboard = lazy(() => import('@/sections/Dashboard'))
const Users = lazy(() => import('@/pages/Users'))
const Sentences = lazy(() => import('@/pages/Sentences'))
const AdminUsers = lazy(() => import('@/pages/AdminUser'))
const Audios = lazy(() => import('@/pages/Audios'))
const CheckedAudios = lazy(() => import('@/pages/CheckedAudio'))
const Statistics = lazy(() => import('@/pages/Statistics'))

const routes = [
  { path: pageNames.dashboard.prefix, component: Dashboard },
  { path: pageNames.users.prefix, component: Users },
  { path: pageNames.sentences.prefix, component: Sentences },
  { path: pageNames.admins.prefix, component: AdminUsers },
  { path: pageNames.audios.prefix, component: Audios },
  { path: pageNames.checked_audios.prefix, component: CheckedAudios },
  { path: pageNames.statistics.prefix, component: Statistics },
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
