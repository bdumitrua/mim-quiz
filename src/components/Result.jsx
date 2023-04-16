import { useLocation } from "react-router-dom";
import "./components.scss";

import { useEffect } from "react";
import { memersInfo } from "../data";

const Result = () => {
    const path = useLocation().search.substring(1);
    const sex = path[0] - 1;
    const id = path[1] - 1;

    if (path.length !== 2 || (sex !== 0 && sex !== 1) || id < 0 || id > 5) {
        window.location.replace("/");
    }

    const resetData = () => {
        localStorage.clear();
        window.location.replace("/#quiz");
    };

    // Для скролла при загрузке страницы
    const { innerHeight: height, innerWidth: weight } = window;
    useEffect(() => {
        setTimeout(() => {
            let scrollBack;
            if (weight > 650) {
                scrollBack = 0;
            } else {
                scrollBack = height + 170;
            }
            window.scrollTo({
                top: document.body.scrollHeight - scrollBack,
                left: 0,
                behavior: "smooth",
            });
        }, 200);
    }, []);

    const { photo, name, desc } = memersInfo[sex][id];

    return (
        <>
            <section className="answer" id="answer">
                <div className="left">
                    <h2>Твой результат:</h2>
                    <img src={photo} alt="" />
                </div>
                <div className="right">
                    <h2>{name}</h2>
                    <p>{desc}</p>
                    <p>Осторожно, ты можешь влюбить в себя 1000 людей</p>
                </div>
            </section>
            <div className="answer-button">
                <button
                    className="button button-xl"
                    onClick={() => {
                        resetData();
                    }}
                >
                    пройти тест еще раз
                </button>
            </div>
        </>
    );
};

export default Result;
