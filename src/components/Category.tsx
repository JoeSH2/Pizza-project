import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory } from "../redux/sortingSlice/sortingSlice";
import { RootState } from "../redux/store";

export const arrSorting = ["Все", "Мясные", "Классические", "Гриль", "Острые"];

const Category: FC = () => {
  const activeCategory = useSelector(
    (state: RootState) => state.sorting.activeCategory
  );
  const dispatch = useDispatch();

  return (
    <ul className="sorting__list">
      {arrSorting &&
        arrSorting.map((item, index) => (
          <li
            key={`${item}_${index}`}
            className={
              activeCategory === index
                ? "sorting__element active"
                : "sorting__element"
            }
            onClick={() => dispatch(setActiveCategory(index))}
          >
            {item}
          </li>
        ))}
    </ul>
  );
};

export default Category;
