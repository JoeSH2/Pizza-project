import qs from "qs";
import { useNavigate } from "react-router-dom";
import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";

import { fetchPizza } from "../redux/fetchSlice/fetchSlice";
import { setFilter } from "../redux/sortingSlice/sortingSlice";

import {
  Card,
  Category,
  SortingBy,
  CardSkelet,
  ModalCart,
} from "../components";
import { arrSort } from "../components/SortingBy";
import { arrSorting } from "../components/Category";
import ScrollBtn from "../components/UI/ScrollBtn/ScrollBtn";

const Home: FC = () => {
  const { items, statusLoading } = useSelector(
    (state: RootState) => state.fetch
  );

  const { activeCategory, activeSort, inputSearch } = useSelector(
    (state: RootState) => state.sorting
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function fetchProduct() {
    dispatch(fetchPizza({ activeCategory, inputSearch, activeSort }));
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const activeSort = arrSort.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilter({
          inputSearch: inputSearch,
          activeCategory: activeCategory,
          activeSort: activeSort || arrSort[0],
        })
      );
    }
  }, []);
  ///////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: activeSort.sortProperty,
      activeCategory: activeCategory,
    });

    navigate(`?${queryString}`);
  }, [activeCategory, activeSort.sortProperty]);
  ///////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    fetchProduct();

    window.scrollTo(0, 0);
  }, [activeCategory, activeSort.sortProperty, inputSearch]);
  ///////////////////////////////////////////////////

  return (
    <div>
      <div className="sorting">
        <div className="container">
          <div className="sorting__row">
            <Category />
            <SortingBy />
          </div>
          <div className="sorting__menu">
            {arrSorting[activeCategory]} пиццы
          </div>
        </div>
      </div>
      <div className="menu">
        <div className="container">
          {statusLoading === "rejected" || items.length < 1 ? (
            <div className="menu__inner">
              {[...new Array(8)].map((_, index) => (
                <CardSkelet key={index} />
              ))}
            </div>
          ) : (
            <div className="menu__inner">
              {statusLoading === "pending"
                ? [...new Array(8)].map((_, index) => (
                    <CardSkelet key={index} />
                  ))
                : items.map((element, index) => (
                    <Card {...element} key={`${element.id}_${index}`} />
                  ))}
            </div>
          )}
        </div>
      </div>
      <ModalCart />
      <ScrollBtn />
    </div>
  );
};

export default Home;
