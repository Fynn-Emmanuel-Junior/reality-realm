import { Routes , Route } from 'react-router-dom'
import Home from './interface/pages/Home/Home'
import SignIn from './interface/pages/guest/SignIn/SignIn'
import SignUp from './interface/pages/guest/SignUp/SignUp'
import About from './interface/pages/About/About'
import Profile from './interface/pages/auth/Profile/Profile'
import ProtectedRoutes from './interface/routes/ProtectedRoutes'
import Listings from './interface/pages/auth/Profile/listings/CreateListings'
import Listing from './interface/pages/auth/Profile/listings/Listing'
import UpdateListing from './interface/pages/auth/Profile/listings/UpdateListing'
import ErrorPage from './interface/pages/404Page/ErrorPage'
import Search from './interface/pages/Search/Search'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/signin' element={<SignIn />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/listing/:id' element={<Listing />}/>
      <Route path='/search' element={<Search />}/>
      <Route element={<ProtectedRoutes />}>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/create-listing' element={<Listings />}/>
        <Route path='/edit-listing/:id' element={<UpdateListing />}/>
      </Route>
      <Route path='/about' element={<About />}/>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default App
