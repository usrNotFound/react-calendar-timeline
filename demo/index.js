import React from 'react'
import { createRoot } from 'react-dom/client';
import 'react-calendar-timeline-css'
import App from './app'

const root = createRoot(document.getElementById("root"));
root.render(<App />)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default

    root.render(NextApp)
  })
}
