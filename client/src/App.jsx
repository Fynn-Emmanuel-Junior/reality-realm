import React from 'react'
import { Routes , Route } from 'react-router-dom'

const Home = React.lazy(() => import('./interface/pages/guest/Home/Home'))
const SignIn = React.lazy(() => import('./interface/pages/guest/SignIn/SignIn'))
const SignUp = React.lazy(() => import('./interface/pages/guest/SignUp/SignUp'))
const About = React.lazy(() => import('./interface/pages/guest/About/About'))
const Profile = React.lazy(() => import('./interface/pages/auth/Profile/Profile'))
const ProtectedRoutes = React.lazy(() => import('./interface/pages/routes/ProtectedRoutes'))
const Listings = React.lazy(() => import('./interface/pages/auth/Profile/CreateListings'))
const Listing = React.lazy(() => import( './interface/pages/guest/listing/Listing'))
const UpdateListing = React.lazy(() => import('./interface/pages/auth/Profile/UpdateListing'))
const ErrorPage = React.lazy(() => import('./interface/pages/guest/404Page/ErrorPage'))
const Search = React.lazy(() => import('./interface/pages/guest/Search/Search'))
const Contact = React.lazy(() => import('./interface/pages/guest/Contact/Contact'))
const AccountLayout = React.lazy(() => import('./interface/components/pageComponents/AccountLayout'))


const App = () => {
  return (
    <React.Suspense>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/signin' element={<SignIn />}/>
     <Route path='/signup' element={<SignUp />}/>
      <Route path='/listing/:id' element={<Listing />}/>
      <Route path='/search' element={<Search />}/>
     <Route path='/contact' element={<Contact />}/>
      <Route element={<ProtectedRoutes />}>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/create-listing' element={<Listings />}/>
        <Route path='/edit-listing/:id' element={<UpdateListing />}/>
      </Route>
      <Route path='/about' element={<About />}/>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
    </React.Suspense>
  )
}

export default App
