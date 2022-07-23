import { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Button: FC = () => {
  const { totalPrice, product } = useSelector((state: RootState) => state.cart);
  const productCount = product.reduce(
    (sum: number, item) => sum + item.count,
    0
  );

  return (
    <button type="button" className="header__order">
      <div className="header__sum">{totalPrice} ₽</div>
      <div className="header__positions">
        <img src="./img/cart.svg" alt="" className="header__busket" />
        <div className="header__busketSum">{productCount}</div>
      </div>
    </button>
  );
};

export default Button;
