import { useEffect, useRef, useState } from "react";

import { quiz } from "../data";
import ScrollToHash from "../hooks/ScrollToHash";
import arrowLeft from "../images/arrow-left.svg";
import arrowRight from "../images/arrow-right.svg";
import logo from "../images/logo-circle.svg";
import {
    doBackups,
    getAnswersBackup,
    getValuesBackup,
} from "../scripts/backup";
import { getResult } from "../scripts/getResult";
import "./components.scss";

const QuizBody = () => {
    // Для пролистывания вопросов
    const [questionNumber, setQuestionNumber] = useState(0);
    // Берём данные для вопросов
    const { title, answers, id } = quiz[questionNumber];

    // Для правильной работы кнопок перехода между вопросами
    const [nextDisable, setNextDisable] = useState(true);
    const [prevDisable, setPrevDisable] = useState(true);

    // Для хранения вариантов ответов
    const [answersData, setAnswersData] = useState(new Map());
    // Для хранения данных этих ответов
    const [answersValues, setAnswersValues] = useState(new Map());

    // При каждом новом выбранном варианте ответа - записываются его данные и делается бэкап
    const inputHandler = (index, value) => {
        answersData.set(questionNumber, index);
        answersValues.set(questionNumber, value);
        setNextDisable(false);

        doBackups(answersData, answersValues);
    };

    // Обработчики смены вопроса
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

    // Фетч бэкапов при загрузке сайта
    const [isRetry, setIsRetry] = useState(false);
    useEffect(() => {
        if (isRetry === false) {
            setAnswersData(getAnswersBackup());
            setAnswersValues(getValuesBackup());

            setIsRetry(true);
        }

        if (isRetry && answersData.size > 0) {
            answersData.size < 8
                ? setQuestionNumber(answersData.size)
                : getResult(answersValues);
            setNextDisable(true);
        }
    }, [isRetry]);

    // Для скролл до опроса
    const question = useRef(null);
    useEffect(() => {
        questionNumber === 0 ? setPrevDisable(true) : setPrevDisable(false);
        if (questionNumber !== 0 && isRetry) {
            prepareToScroll();
        }
    }, [questionNumber]);

    const prepareToScroll = () => {
        if (question.current) {
            if (question.current.clientHeight < 500) {
                scrollToBottom(0);
            } else {
                scrollToBottom(question.current.clientHeight);
            }
        }
    };

    const scrollToBottom = (height) => {
        window.scrollTo({
            top: document.body.scrollHeight - height - 200,
            left: 0,
            behavior: "smooth",
        });
    };

    // Короче, фронт-ендер, я тебе зачистку радио-боксов сделал и в благородство играть не буду:
    // Если сможешь сделать возвращение старых вариантов и удаление автоматически-поставленных новых лучше - делай
    // Фиг знает на кой тебе нужен читабельный код, но я в чужие дела не лезу, хочешь чище - значит есть зачем
    useEffect(() => {
        setPrevAnswer();
    }, [questionNumber]);

    const setPrevAnswer = () => {
        let element = document.getElementById(
            `radio-${answersData.get(questionNumber)}`
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
                `radio-${answersData.get(questionNumber - 1)}`
            );
            if (element !== null) {
                element.checked = false;
            }
        }
    };

    // Очистка массивов и localStorage
    const resetData = () => {
        answersValues.clear();
        answersData.clear();
        localStorage.clear();

        // Вместо перезагрузки страницы
        setQuestionNumber(0);
        setNextDisable(true);
        setPrevDisable(true);
        document.getElementById(`radio-${0}`).checked = false;
        document.getElementById(`radio-${1}`).checked = false;
    };

    return (
        <>
            <ScrollToHash />
            <section className="quiz" id="quiz" ref={question}>
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
                        <p className="number hideOnMobile">{`${id}/8`}</p>
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
                            {id < 8 && (
                                <p className="number showOnMobile">{`${id}/8`}</p>
                            )}
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
                                    className={`button button-last ${
                                        nextDisable ? "disable" : ""
                                    }`}
                                    disabled={nextDisable}
                                    onClick={() => {
                                        getResult(answersValues);
                                    }}
                                >
                                    завершить тест
                                </button>
                            )}
                        </span>
                    </span>
                </div>
            </section>
            <button
                className="button button-sm reset__button"
                onClick={() => {
                    resetData();
                }}
            >
                Сбросить ответы
            </button>
        </>
    );
};

export default QuizBody;
