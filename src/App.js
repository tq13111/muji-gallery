import './App.css'
import React, {Suspense, lazy} from 'react'
import {Switch, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Loading from './components/Loading'


const Home = lazy(() => import('./view/Home'))
const About = lazy(() => import('./view/About'))
const History = lazy(() => import('./view/History'))

function App() {
  return (
    <div className="App">
      <Header/>
      <Suspense fallback={<Loading/>}>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/history' component={History}/>
          <Route path='/about' component={About}/>
        </Switch>
      </Suspense>
      <Footer/>
    </div>
  )
}

export default App
