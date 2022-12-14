import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'

import { BrowserRouter as Router} from 'react-router-dom'

import '@tabler/core/dist/css/tabler.min.css'

const root = ReactDOM.createRoot(document.body)
root.render(
  <Router>
    <App />
  </Router>
)