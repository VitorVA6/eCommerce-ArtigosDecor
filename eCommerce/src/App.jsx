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
import PaymentProvider from './contexts/Payment'
import UserProvider from './contexts/User'
import Admin from './pages/Admin'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import RecoveryPw from './pages/RecoveryPw'
import Category from './pages/Category'
import CategoryProvider from './contexts/Category'
import VariationProvider from './contexts/Variation'
import Payment from './pages/PaymentPage'
import About from './pages/About'
import PolicyPage from './pages/PolicyPage'
import pagestexts from './utils/pagesText'

axios.defaults.baseURL = 'http://[::1]:4000'

function App() {

  return (
    <BrowserRouter>
      <VariationProvider>
      <CategoryProvider>
      <CarrinhoProvider>
      <UserProvider>
      <ProductProvider>
      <CatalogProvider>
      <PaymentProvider>
      <Routes>
        <Route path='/' element={<Base />}>
          <Route index element={<Home />} />
          <Route path='/produto/:id' element = {<Produto />}/>
          <Route path='/category/:name' element = {<Category />}/>
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/devolution-policy' element={<PolicyPage title={'Política de reembolso'} text={pagestexts.devolution} />} />
          <Route path='/privacy-policy' element={<PolicyPage title={'Política de privacidade'} text={pagestexts.privacy} />} />
        </Route>
        <Route path='/404' element={<PageNotFound />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/admin' element={<Admin />} />
        <Route path='/users/verify/:token' element={<EmailVerify />}/>
        <Route path='/recovery-pw' element={<RecoveryPw />}/>
      </Routes>
      </PaymentProvider>
      </CatalogProvider>
      </ProductProvider>
      </UserProvider>
      </CarrinhoProvider>
      </CategoryProvider>
      </VariationProvider>
    </BrowserRouter>
  )
}

export default App
