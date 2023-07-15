import './styles.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { HashRouter as Router, Route, Link, useLocation, useNavigate, useParams, Routes } from 'react-router-dom'

const demos = {
  main: require('./demo-main').default,
  performance: require('./demo-performance').default,
  treeGroups: require('./demo-tree-groups').default,
  linkedTimelines: require('./demo-linked-timelines').default,
  elementResize: require('./demo-element-resize').default,
  renderers: require('./demo-renderers').default,
  verticalClasses: require('./demo-vertical-classes').default,
  customItems: require('./demo-custom-items').default,
  customHeaders: require('./demo-headers').default,
  customInfoLabel: require('./demo-custom-info-label').default,
  controledSelect: require('./demo-controlled-select').default,
  controlledScrolling: require('./demo-controlled-scrolling').default
}

// A simple component that shows the pathname of the current location
class Menu extends Component {
  static propTypes = {
    location: PropTypes.object/*.isRequired*/
  }

  render() {
    let pathname = (this.props.location || {}).pathname

    if (!pathname || pathname === '/') {
      pathname = `/${Object.keys(demos)[0]}`
    }

    return (
      <div
        className={`demo-row${
          pathname.indexOf('sticky') >= 0 ? ' sticky' : ''
        }`}
      >
        Choose the demo:
        {Object.keys(demos).map(key => (
          <Link
            key={key}
            className={pathname === `/${key}` ? 'selected' : ''}
            to={`/${key}`}
          >
            {key}
          </Link>
        ))}
      </div>
    )
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    )
  }

  return ComponentWithRouterProp
}

const MenuWithRouter = withRouter(Menu)


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MenuWithRouter />
          <div className='demo-demo'>
            <Routes>
              <Route path='/' exact element={React.createElement(demos[Object.keys(demos)[0]])} />
              {Object.keys(demos).map(key => (
                <Route key={key} path={`/${key}`} element={React.createElement(demos[key])} />
              ))}
            </Routes>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
