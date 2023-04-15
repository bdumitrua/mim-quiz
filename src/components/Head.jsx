import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import "./components.scss";

const Head = () => {
    return (
        <section className="head">
            <h1>Кто ты из участников Мисс и Мистер 2023</h1>
            <div className="intro">
                <span className="content">
                    <p>Привет. Рады видеть тебя здесь.</p>
                    <p>
                        Скорее проходи тест и узнай, на кого из участников
                        ты больше похож.
                    </p>
                    <Link to="/#quiz">
                        <button className="button button-lg">
                            Перейти к тесту
                        </button>
                    </Link>
                </span>
                <span className="image">
                    <img src={logo} alt="Мисс и Мистер РГУ ИМ. А.Н.Косыгина" />
                </span>
            </div>
        </section>
    );
};

export default Head;
