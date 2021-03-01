import './App.css'
import React, {Suspense, lazy} from 'react'
import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import 'antd/dist/antd.css';

const Home = lazy(() => import('./view/Home'))
const About = lazy(() => import('./view/About'))
const History = lazy(() => import('./view/History'))
const Login = lazy(() => import('./view/Login'))
const Register = lazy(() => import('./view/Register'))

function App() {
  return (
    <>
      <Header/>
      <main>
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/history' component={History}/>
            <Route path='/about' component={About}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
          </Switch>
        </Suspense>
      </main>
      <Footer/>
    </>
  )
}

export default App
