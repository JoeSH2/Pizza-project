import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  minusProduct,
  PizzaItems,
  removeProduct,
} from "../redux/cartSlice/cartSlice";

import Icons from "./Icons";

const CartProduct: FC<PizzaItems> = ({
  id,
  price,
  types,
  sizes,
  imageUrl,
  count,
  title,
}) => {
  const dispatch = useDispatch();

  const clickPlus = () => {
    dispatch(addProduct({ id, price, types, sizes } as PizzaItems));
  };

  const clickMinus = () => {
    dispatch(minusProduct({ id, price, types, sizes } as PizzaItems));
  };

  const clickRemove = () => {
    dispatch(removeProduct({ id, price, types, sizes } as PizzaItems));
  };

  return (
    <div className="basket-pizza__position">
      <div className="basket-pizza__pizza">
        <img className="basket-pizza__icon" src={imageUrl} alt="" />
        <div className="basket-pizza__text">
          <h4>{title}</h4>
          <p>
            {types} тесто, {sizes} см.
          </p>
        </div>
      </div>
      <div className="basket-pizza__amount">
        <span onClick={count > 1 ? clickMinus : clickRemove}>-</span>
        <p>{count}</p>
        <span onClick={clickPlus}>+</span>
      </div>
      <div className="basket-pizza__price">{price * count} ₽ </div>
      <div onClick={clickRemove} className="basket-pizza__crossball">
        <Icons
          name="cross"
          className="basket-pizza__cross"
          color={undefined}
          size={undefined}
        />
      </div>
    </div>
  );
};

export default CartProduct;
