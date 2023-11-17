import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './assets/Home';
import Login from './assets/Login';
import Signup from './assets/Signup';
import Reviews from './assets/Reviews';
import Settings from './assets/Settings';
import MovieInfo from './components/MovieInfo';





function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main>
          <Routes>

            {/* Routing */}

            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/movieinfo/:id" element={<MovieInfo/>}/>


          </Routes>
        </main>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;