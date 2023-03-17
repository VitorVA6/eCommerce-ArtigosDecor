import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Base from './pages/Base'
import Home from './pages/Home'
import Produto from './pages/Produto'
import axios from 'axios'
import Cart from './pages/Cart'
import PageNotFound from './pages/PageNotFound'
import CarrinhoProvider from './contexts/Carrinho'
import ProductProvider from './contexts/Product'
import CatalogProvider from './contexts/Catalog'
import UserProvider from './contexts/User'
import Admin from './pages/Admin'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'

axios.defaults.baseURL = 'http://[::1]:4000'
axios.defaults.withCredentials = true

function App() {

  return (
    <BrowserRouter>
      <CarrinhoProvider>
      <UserProvider>
      <ProductProvider>
      <CatalogProvider>
      <Routes>
        <Route path='/' element={<Base />}>
          <Route index element={<Home />} />
          <Route path='/produto/:id' element = {<Produto />}/>
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/404' element={<PageNotFound />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/admin' element={<Admin />} />
        <Route path='/users/verify/:token' element={<EmailVerify />}/>
      </Routes>
      </CatalogProvider>
      </ProductProvider>
      </UserProvider>
      </CarrinhoProvider>
    </BrowserRouter>
  )
}

export default App
