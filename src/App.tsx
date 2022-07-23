import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components";
import { Home, ErrorPage } from "./pages";

const Cart = React.lazy(
  () => import(/* webpackChunkName: 'Cart' */ "./pages/Cart")
);

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Cart"
            element={
              <Suspense
                fallback={
                  <div className="container">
                    <div className="basket__false">
                      <h5>Корзина загружается</h5>
                      <p> Подождите еще немного!</p>
                      <img src="./components/assets/Logo.png" alt="" />
                    </div>
                  </div>
                }
              >
                <Cart />
              </Suspense>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
