import { FC, useEffect, useState } from "react";
import style from "./ScrollBtn.module.scss";
import Icons from "../../Icons/Icons";

const ScrollBtn: FC = () => {
  const [scroll, setScroll] = useState<boolean>();

  const scrollState = (e: any) => {
    setScroll(e.target.documentElement.scrollTop > 160);
  };

  const handleScrollUp = () => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      window.scrollBy(0, -50);
      setTimeout(handleScrollUp, 10);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollState);
  }, []);

  return (
    <>
      {scroll && (
        <div onClick={handleScrollUp} className={style.scroll}>
          <Icons
            name="arrow"
            className={style.arrowUp}
            color={undefined}
            size={undefined}
          />
        </div>
      )}
    </>
  );
};

export default ScrollBtn;
