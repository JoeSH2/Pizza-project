import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { addProduct } from "../redux/cartSlice/cartSlice";
import { ProductValue } from "../redux/fetchSlice/fetchSlice";
import { setModaleCard, getProduct } from "../redux/modaleSlice/modaleSlice";
import { RootState } from "../redux/store";

const Card: FC<ProductValue> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
}) => {
  const [activeBlock, setActiveBlock] = useState<number>(types[0]);
  const [activeMiniBlock, setActiveMiniBlock] = useState(0);
  const [priceSize, setPriceSize] = useState(price[0]);

  const typeItem = ["тонкое", "традиционное"];

  const cartProduct = useSelector((state: RootState) =>
    state.cart.product.find(
      (obj) =>
        obj.id + obj.price + obj.types + obj.sizes ===
        id + priceSize + typeItem[activeBlock] + sizes[activeMiniBlock]
    )
  );

  const productAdd = cartProduct ? cartProduct.count : 0;

  const onSelectBlock = (type: number) => {
    setActiveBlock(type);
  };

  const onSelectMiniBlock = (index: number) => {
    setActiveMiniBlock(index);
    setPriceSize(price[index]);
  };

  const dispatch = useDispatch();

  const clickAdd = () => {
    const product = {
      id,
      sizes: sizes[activeMiniBlock],
      types: typeItem[activeBlock],
      price: priceSize,
      title,
      imageUrl,
      count: 0,
    };
    dispatch(addProduct(product));
  };

  const clickModale = () => {
    const modaleProduct = {
      id,
      title,
      imageUrl,
    };
    dispatch(getProduct(modaleProduct));
    dispatch(setModaleCard(true));
  };
  return (
    <div className="menu__block">
      <img onClick={clickModale} className="menu__img" src={imageUrl} alt="" />
      <div className="menu__name">{title}</div>
      <div className="menu__card">
        <div className="menu__elem">
          {types.map((type) => (
            <div
              onClick={() => onSelectBlock(type)}
              key={type}
              className={
                activeBlock === type
                  ? "menu__card-block cardBlock blockActive"
                  : "menu__card-block cardBlock"
              }
            >
              {typeItem[type]}
            </div>
          ))}
        </div>
        <div className="menu__elem">
          {sizes.map((size, index) => (
            <div
              onClick={() => onSelectMiniBlock(index)}
              key={`${size}_${index}`}
              className={
                activeMiniBlock === index
                  ? "menu__card-miniblock cardBlock blockActive"
                  : "menu__card-miniblock cardBlock"
              }
            >
              {size} см.
            </div>
          ))}
        </div>
      </div>
      <div className="menu__row">
        <div className="menu__price">от {priceSize} ₽</div>
        <button type="button" className={"menu__basket"} onClick={clickAdd}>
          + Добавить <span>{productAdd}</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
