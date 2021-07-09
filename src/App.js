import React from 'react'
import './App.css';
import Header from "./components/header/Header"
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from './pages/about/About';
import E404 from './pages/Errors/E404';
import Login from './pages/login/Login';
import Contact from './pages/contact/Contact';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/contact" component={Contact} />
            <Route path="/admin" component={Admin} />
            <Route component={E404} />
          </Switch>
        </main>

        <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;