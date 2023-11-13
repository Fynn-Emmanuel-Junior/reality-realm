import { Routes , Route } from 'react-router-dom'
import Home from './interface/pages/auth/Home/Home'
import SignIn from './interface/pages/guest/SignIn/SignIn'
import SignUp from './interface/pages/guest/SignUp/SignUp'
import About from './interface/pages/auth/About/About'
import Profile from './interface/pages/auth/Profile/Profile'
import ProtectedRoutes from './interface/routes/ProtectedRoutes'
import Listings from './interface/pages/auth/Profile/listings/Listings'
import ListingPage from './interface/pages/auth/Profile/listings/listingPage'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/signin' element={<SignIn />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route element={<ProtectedRoutes />}>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/create-listing' element={<Listings />}/>
        <Route path='/create-listing/:id' element={<ListingPage />}/>
      </Route>
      <Route path='/about' element={<About />}/>
    </Routes>
  )
}

export default App
