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
    const [prevData] = useState(new Map());

    const { title, questions, id } = quiz[questionNumber];
    const prevDisable = questionNumber === 0 ? true : false;

    const inputHandler = (index, value) => {
        setActualAnswer([index, value]);
    };

    const nextQuestion = () => {
        prevData.get(questionNumber + 1) !== undefined
            ? setNextDisable(false)
            : setNextDisable(true);

        if (questionNumber !== 7) {
            setQuestionNumber((prev) => prev + 1);
        }
    };

    const prevQuestion = () => {
        prevData.get(questionNumber - 1) !== undefined
            ? setNextDisable(false)
            : setNextDisable(true);

        if (questionNumber !== 0) {
            setQuestionNumber((prev) => prev - 1);
        }
    };

    // Короче, фронт-ендер, я тебе зачистку радио-боксов сделал и в благородство играть не буду:
    // Если сможешь сделать возвращение старых вариантов и удаление автоматически-поставленных новых лучше - делай
    // Фиг знает на кой тебе нужен читабельный код, но я в чужие дела не лезу, хочешь чище - значит есть зачем
    const setPrevAnswer = () => {
        let element = document.getElementById(
            `radio-${questionNumber}-${prevData.get(questionNumber)}`
        );

        // Ставим чекбокс из сохранённых ответов
        if (prevData.get(questionNumber) !== undefined) {
            element.checked = true;
        }

        // Проверяем, не совпадает ли сохранённый ответ и тот, что мы поставили перед ним
        if (prevData.get(questionNumber) !== prevData.get(questionNumber - 1)) {
            // Убираем checked, который автоматически ставится при обновлении вопросов/инпутов
            element = document.getElementById(
                `radio-${questionNumber}-${prevData.get(questionNumber - 1)}`
            );
            if (element !== null) {
                element.checked = false;
            }
        }
    };

    // При клике на вариант ответа
    useEffect(() => {
        if (actualAnswer && Array.isArray(actualAnswer)) {
            // Запись данных
            prevData.set(questionNumber, actualAnswer[0]);

            // Даём доступ к следующему вопросу
            setNextDisable(false);
            console.log(prevData);
        }
    }, [actualAnswer, prevData]);

    useEffect(() => {
        setPrevAnswer();
    }, [questionNumber, setPrevAnswer]);

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
                                            type="radio"
                                            name="answers"
                                            id={`radio-${questionNumber}-${index}`}
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
                                <button
                                    className={`button ${
                                        nextDisable ? "disable" : ""
                                    }`}
                                    disabled={nextDisable}
                                >
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
