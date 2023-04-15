import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { quiz } from "../data";
import arrowLeft from "../images/arrow-left.svg";
import arrowRight from "../images/arrow-right.svg";
import logo from "../images/logo-circle.svg";
import "./components.scss";

const QuizBody = () => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [actualAnswer, setActualAnswer] = useState(null);
    const [nextDisable, setNextDisable] = useState(true);
    const [prevData, setPrevData] = useState(new Map());

    const { title, questions, id } = quiz[questionNumber];
    const prevDisable = questionNumber === 0 ? true : false;

    const inputHandler = (index, value) => {
        setActualAnswer([index, value]);
    };

    const prevQuestion = () => {
        if (questionNumber !== 0) {
            setQuestionNumber((prev) => prev - 1);
        }
    };

    const nextQuestion = () => {
        if (questionNumber !== 7) {
            setQuestionNumber((prev) => prev + 1);
        }
    };

    // Проверка доступности кнопки перехода на следующий вопрос
    // Запись данных в "кэш"
    useEffect(() => {
        if (actualAnswer && Array.isArray(actualAnswer)) {
            prevData.set(questionNumber, actualAnswer[0]);
            console.log(prevData);
            setNextDisable(false);
        }
    }, [actualAnswer]);

    return (
        <section className="quiz" id="quiz">
            <div className="content">
                <span className="top">
                    <img src={logo} alt="МиМ" />
                    <h2>{title}</h2>
                </span>
                <div className="body">
                    <ul>
                        {questions.map(({ text, value }, index) => {
                            return (
                                <li key={index}>
                                    <label>
                                        <input
                                            autoComplete="off"
                                            type="radio"
                                            className="question__input"
                                            name="answers"
                                            id={`radio-${index}`}
                                            onChange={() => {
                                                inputHandler(index, value);
                                            }}
                                            value={value}
                                        />
                                        <p>{text}</p>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <span className="bottom">
                    <p className="number">{`${id}/8`}</p>
                    <span className="buttons">
                        <button
                            className={`button button-sm ${
                                prevDisable ? "disable" : ""
                            }`}
                            disabled={prevDisable}
                            onClick={() => {
                                prevQuestion();
                            }}
                        >
                            <img src={arrowLeft} alt="Назад" />
                        </button>
                        {questionNumber !== 7 && (
                            <button
                                className={`button button-sm ${
                                    nextDisable ? "disable" : ""
                                }`}
                                disabled={nextDisable}
                                onClick={() => {
                                    nextQuestion();
                                }}
                            >
                                <img src={arrowRight} alt="Вперёд" />
                            </button>
                        )}
                        {questionNumber === 7 && (
                            <Link to="/result">
                                <button className="button">
                                    завершить тест
                                </button>
                            </Link>
                        )}
                    </span>
                </span>
            </div>
        </section>
    );
};

export default QuizBody;
