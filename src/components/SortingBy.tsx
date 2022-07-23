import { useRef, useState, useEffect, memo, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveSort, Sort } from "../redux/sortingSlice/sortingSlice";
import { RootState } from "../redux/store";

interface IArrSortType {
  name: string;
  sortProperty: "raiting" | "price" | "title";
}

export const arrSort: IArrSortType[] = [
  { name: "популярности", sortProperty: "raiting" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

const SortingBy: FC = memo(() => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const activeSort = useSelector(
    (state: RootState) => state.sorting.activeSort
  );
  const dispatch = useDispatch();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const onSelectSort = (obj: Sort) => {
    dispatch(setActiveSort(obj));
    setShowPopup(false);
  };

  useEffect(() => {
    const catchClick = (e: any) => {
      if (!e.path.includes(sortRef.current)) {
        setShowPopup(false);
      }
    };

    document.body.addEventListener("click", catchClick);

    return () => {
      document.body.removeEventListener("click", catchClick);
    };
  }, []);

  return (
    <div ref={sortRef} className="sorting__by">
      <img
        src="./img/arrow-top.svg"
        className={showPopup ? "rotate" : ""}
        alt=""
      />
      <b>Соортировка по:</b>
      <span onClick={togglePopup}>{activeSort.name}</span>
      <div
        onClick={(e) => e.stopPropagation()}
        className="sorting__popup popup-sorting"
      >
        {showPopup && (
          <ul className="popup-sorting">
            {arrSort &&
              arrSort.map((obj, index) => (
                <li
                  key={`${obj.name}_${index}`}
                  className={
                    activeSort.sortProperty === obj.sortProperty
                      ? "popup-active"
                      : "popup-sorting__list"
                  }
                  onClick={() => onSelectSort(obj as Sort)}
                >
                  {obj.name}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default SortingBy;
