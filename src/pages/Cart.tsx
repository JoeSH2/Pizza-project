import React, { FC, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CartProduct } from "../components";
import Icons from "../components/Icons";
import { clearCart } from "../redux/cartSlice/cartSlice";
import { RootState } from "../redux/store";

const Cart: FC = () => {
  const { product, totalPrice } = useSelector((state: RootState) => state.cart);
  const productCount = product.reduce((sum, item) => sum + item.count, 0);

  const dispatch = useDispatch();
  const clickClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (totalPrice < 1) {
    return (
      <div className="container">
        <div className="basket__false">
          <h5>Корзина пуста 😿</h5>
          <p> Добавьте товар и возвращайтесь!</p>
          <img
            src="https://dodopizza-a.akamaihd.net/site-static/dist/121df529925b0f43cc73.svg"
            alt=""
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mainBasket">
        <div className="mainBasket__block">
          <div className="mainBasket__trash basket-trash">
            <div className="basket-trash__left">
              <Icons
                name="basket"
                className="basket-trash__iconBasket"
                color={undefined}
                size={undefined}
              />
              <h1 className="basket-trash__icon-title">Корзина</h1>
            </div>
            <div onClick={clickClearCart} className="basket-trash__right">
              <Icons
                name="trash"
                className="basket-trash__iconTrash"
                color={undefined}
                size={undefined}
              />
              <p className="basket-trash__icon-text">Очистить корзину</p>
            </div>
          </div>
          <div className="mainBasket__pizza basket-pizza">
            {product.map((elem) => (
              <CartProduct
                key={`${elem.id}_${elem.types}_${elem.price}`}
                {...elem}
              />
            ))}
          </div>
          <div className="mainBasket__stand">
            <div className="basket-trash__left">
              Всего пицц: <b> {productCount} шт.</b>
            </div>
            <div className="basket-trash__right">
              Сумма заказа: <b> {totalPrice} ₽</b>
            </div>
          </div>
          <div className="mainBasket__payment basket-payment">
            <Link to="/">
              <button type="button" className="basket-payment__btn btn">
                <Icons
                  name="arrow"
                  className="basket-payment__icon"
                  color={undefined}
                  size={undefined}
                />
                <p>Вернуться назад</p>
              </button>
            </Link>
            <button type="button" className="basket-payment__btnPay btn">
              <div className="basket-payment__btn-text">Оплатить сейчас</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
