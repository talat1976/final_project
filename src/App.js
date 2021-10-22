import React from 'react'
import './App.css';
import Header from "./components/header/Header"
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from './pages/about/About';
import E404 from './pages/Errors/E404';
import Contact from './pages/contact/Contact';
import Admin from './pages/admin/Admin';
import Product from './pages/product/Product';
import Reports from './pages/reports/Reports';
import Cart from './pages/cart/Cart';
import Payment from './pages/payment/Payment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/admin" component={Admin} />
            <Route path="/product/:id" component={Product} />
            <Route path="/reports" component={Reports} />
            <Route path="/cart" component={Cart} />
            <Route path="/payment/:amount" component={Payment} />
            <Route component={E404} />
          </Switch>
        </main>

        <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;
