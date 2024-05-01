import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store,persistor} from './logic/ReduxStore/app/store'
import { PersistGate } from 'redux-persist/es/integration/react'
import { SkeletonTheme } from 'react-loading-skeleton'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme>
      <Provider store={store}>
        <Router>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Router>
      </Provider>
    </SkeletonTheme>
  </React.StrictMode>
)
