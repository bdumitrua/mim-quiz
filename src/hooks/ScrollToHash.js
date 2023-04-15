import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            let elem;

            elem = document.getElementById(location.hash.slice(1));

            if (elem) {
                let y;
                if (
                    location.hash === "#services" ||
                    window.screen.width <= 880
                ) {
                    y = elem.getBoundingClientRect().top + window.pageYOffset;
                } else {
                    y =
                        elem.getBoundingClientRect().top +
                        window.pageYOffset -
                        52;
                }
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }, [location]);
};

export default ScrollToHash;
