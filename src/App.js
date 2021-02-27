import './App.css'

import {Switch, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Home from './view/Home'
import About from './view/About'
import Header from './components/Header'
import History from './view/History'

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/history' component={History}/>
        <Route path='/about' component={About}/>
      </Switch>
      <Footer/>
    </div>
  )
}

export default App
