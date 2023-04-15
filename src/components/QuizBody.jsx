import { useEffect, useState } from "react";

import { quiz } from "../data";
import arrowLeft from "../images/arrow-left.svg";
import arrowRight from "../images/arrow-right.svg";
import logo from "../images/logo-circle.svg";
import "./components.scss";

const QuizBody = () => {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [nextDisable, setNextDisable] = useState(true);
    const [answersData] = useState(new Map());
    const [answersValues] = useState(new Map());
    const prevDisable = questionNumber === 0 ? true : false;

    const inputHandler = (index, value) => {
        answersData.set(questionNumber, index);
        answersValues.set(questionNumber, value);
        setNextDisable(false);
    };

    const nextQuestion = () => {
        answersData.get(questionNumber + 1) !== undefined
            ? setNextDisable(false)
            : setNextDisable(true);

        if (questionNumber !== 7) {
            setQuestionNumber((prev) => prev + 1);
        }
    };

    const prevQuestion = () => {
        answersData.get(questionNumber - 1) !== undefined
            ? setNextDisable(false)
            : setNextDisable(true);

        if (questionNumber !== 0) {
            setQuestionNumber((prev) => prev - 1);
        }
    };

    const handleData = () => {
        const sex = answersValues.get(0);

        const ABS = new Map(answersValues);
        ABS.delete(0);

        const women = new Map();
        const men = new Map();

        for (let index = 1; index <= 6; index++) {
            women.set(index, 0);
            men.set(index, 0);
        }

        for (let data of ABS) {
            data[1].map((value) => {
                if (value[0] === 1) {
                    women.set(value[1], women.get(value[1]) + 1);
                } else if (value[0] === 2) {
                    men.set(value[1], men.get(value[1]) + 1);
                }
            });
        }

        let answer = [];

        if (sex === 1) {
            const womenArray = [];
            women.forEach((value) => {
                womenArray.push(value);
            });

            answer = [1, Math.max(...womenArray)];
        } else {
            const menArray = [];
            men.forEach((value) => {
                menArray.push(value);
            });

            answer = [2, Math.max(...menArray)];
        }
        console.log(answer);

        window.location.replace(`/result/?${answer.join("")}`);
    };

    useEffect(() => {
        setPrevAnswer();
    }, [questionNumber]);

    // Короче, фронт-ендер, я тебе зачистку радио-боксов сделал и в благородство играть не буду:
    // Если сможешь сделать возвращение старых вариантов и удаление автоматически-поставленных новых лучше - делай
    // Фиг знает на кой тебе нужен читабельный код, но я в чужие дела не лезу, хочешь чище - значит есть зачем
    const setPrevAnswer = () => {
        let element = document.getElementById(
            `radio-${questionNumber}-${answersData.get(questionNumber)}`
        );

        // Ставим чекбокс из сохранённых ответов
        if (answersData.get(questionNumber) !== undefined) {
            element.checked = true;
        }

        // Проверяем, не совпадает ли сохранённый ответ и тот, что мы поставили перед ним
        if (
            answersData.get(questionNumber) !==
            answersData.get(questionNumber - 1)
        ) {
            // Убираем checked, который автоматически ставится при обновлении вопросов/инпутов
            element = document.getElementById(
                `radio-${questionNumber}-${answersData.get(questionNumber - 1)}`
            );
            if (element !== null) {
                element.checked = false;
            }
        }
    };

    const { title, answers, id } = quiz[questionNumber];
    return (
        <section className="quiz" id="quiz">
            <div className="content">
                <span className="top">
                    <img src={logo} alt="МиМ" />
                    <h2>{title}</h2>
                </span>
                <div className="body">
                    <ul>
                        {answers.map(({ text, value }, index) => {
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
                            <button
                                className={`button ${
                                    nextDisable ? "disable" : ""
                                }`}
                                disabled={nextDisable}
                                onClick={() => {
                                    handleData();
                                }}
                            >
                                завершить тест
                            </button>
                        )}
                    </span>
                </span>
            </div>
        </section>
    );
};

export default QuizBody;
