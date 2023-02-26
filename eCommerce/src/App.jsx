import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Base from './pages/Base'
import Home from './pages/Home'
import Produto from './pages/Produto'
import axios from 'axios'
import Cart from './pages/Cart'
import PageNotFound from './pages/PageNotFound'
import CarrinhoProvider from './contexts/Carrinho'
import Admin from './pages/Admin'
import Login from './pages/Login'

axios.defaults.baseURL = 'http://[::1]:3000'

function App() {

  return (
    <BrowserRouter>
      <CarrinhoProvider>
      <Routes>
        <Route path='/' element={<Base />}>
          <Route index element={<Home />} />
          <Route path='/produto/:id' element = {<Produto />}/>
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/404' element={<PageNotFound />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/admin' element={<Admin />} />
      </Routes>
      </CarrinhoProvider>
    </BrowserRouter>
  )
}

export default App
