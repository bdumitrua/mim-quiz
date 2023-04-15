import { Link, useLocation } from "react-router-dom";
import "./components.scss";

import { memersInfo } from "../data";

const Result = () => {
    const path = useLocation().search.substring(1);
    const sex = path[0] - 1;
    const id = path[1] - 1;
    const { photo, name, desc } = memersInfo[sex][id];

    return (
        <>
            <section className="answer">
                <div className="left">
                    <h2>Твой результат:</h2>
                    <img src={photo} alt="photo" />
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
