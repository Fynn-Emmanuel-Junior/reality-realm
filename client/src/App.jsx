import { Routes , Route } from 'react-router-dom'
import Home from './interface/pages/guest/Home/Home'
import SignIn from './interface/pages/guest/SignIn/SignIn'
import SignUp from './interface/pages/guest/SignUp/SignUp'
import About from './interface/pages/guest/About/About'
import Profile from './interface/pages/auth/Profile/Profile'
import ProtectedRoutes from './interface/routes/ProtectedRoutes'
import Listings from './interface/pages/auth/Profile/CreateListings'
import Listing from './interface/pages/guest/listing/Listing'
import UpdateListing from './interface/pages/auth/Profile/UpdateListing'
import ErrorPage from './interface/pages/guest/404Page/ErrorPage'
import Search from './interface/pages/guest/Search/Search'

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
