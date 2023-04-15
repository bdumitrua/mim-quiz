import { Link, useLocation } from "react-router-dom";
import "./components.scss";

import { memersInfo } from "../data";

const Result = () => {
    if (useLocation().search.length !== 3) {
        window.location.replace("/");
    }
    console.log(useLocation().search);

    const path = useLocation().search.substring(1);
    const sex = path[0] - 1;
    const id = path[1] - 1;

    if (sex !== 0 && sex !== 1) {
        window.location.replace("/");
    }

    if (id < 0 || id > 5) {
        window.location.replace("/");
    }

    const { photo, name, desc } = memersInfo[sex][id];
    return (
        <>
            <section className="answer">
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
                <Link to="/">
                    <button className="button button-xl">
                        пройти тест еще раз
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Result;
