import { useEffect, useRef, useState } from "react";

import { quiz } from "../data";
import arrowLeft from "../images/arrow-left.svg";
import arrowRight from "../images/arrow-right.svg";
import logo from "../images/logo-circle.svg";
import "./components.scss";

const QuizBody = () => {
    // Для пролистывания вопросов
    const [questionNumber, setQuestionNumber] = useState(0);
    // Берём данные для вопросов
    const { title, answers, id } = quiz[questionNumber];

    // Для правильной работы кнопок перехода между вопросами
    const [nextDisable, setNextDisable] = useState(true);
    const prevDisable = questionNumber === 0 ? true : false;

    // Для хранения вариантов ответов
    const [answersData, setAnswersData] = useState(new Map());
    // Для хранения данных этих ответов
    const [answersValues, setAnswersValues] = useState(new Map());

    // При каждом новом выбранном варианте ответа - записываются его данные и делается бэкап
    const inputHandler = (index, value) => {
        answersData.set(questionNumber, index);
        answersValues.set(questionNumber, value);
        setNextDisable(false);

        doBackUps();
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

    // Бэкапы
    const doBackUps = () => {
        localStorage.clear();
        doAnswersBackUp();
        doValuesBackUp();
    };

    const doAnswersBackUp = () => {
        const answersArray = [];
        answersData.forEach((value) => {
            answersArray.push(value);
        });

        localStorage.setItem("previous-data", JSON.stringify(answersArray));
    };

    const doValuesBackUp = () => {
        answersValues.forEach((value, index) => {
            localStorage.setItem(index, JSON.stringify(value));
        });
    };

    const getAnswersBackUp = () => {
        const key = "previous-data";
        if (localStorage.getItem(key) === null) {
            setAnswersData(new Map());
            return;
        }
        const result = new Map();

        let localData = JSON.parse(localStorage.getItem(key));
        if (localData.length === 1) {
            result.set(0, localData);
        }

        if (localData.length > 1) {
            localData.map((value, index) => {
                result.set(index, value);
            });
        }
        setAnswersData(result);
    };

    const getValuesBackUp = () => {
        const backups = new Map();
        for (let i = 0; i < 8; i++) {
            if (localStorage.getItem(i) === null) {
                break;
            }
            backups.set(i, JSON.parse(localStorage.getItem(i)));
        }
        setAnswersValues(backups);
    };

    // Фетч бэкапов при загрузке сайта
    const [isRetry, setIsRetry] = useState(false);
    useEffect(() => {
        if (isRetry === false) {
            getAnswersBackUp();
            getValuesBackUp();
            setIsRetry(true);
        }

        if (isRetry && answersData.size > 0) {
            setQuestionNumber(answersData.size - 1);
            setNextDisable(false);
        }
    }, [isRetry]);

    // Для нормального скролла до опроса
    const question = useRef(null);
    useEffect(() => {
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

    // Рассчёт резульатата
    // Многа букав, потому что работа с Map
    const getResult = () => {
        const sex = answersValues.get(0);

        const finalValues = new Map(answersValues);
        finalValues.delete(0);

        const women = new Map();
        const men = new Map();

        for (let index = 1; index <= 6; index++) {
            women.set(index, 0);
            men.set(index, 0);
        }

        // Считаем соответствие каждому участнику, считая сколько раз его вариант был выбран
        for (let data of finalValues) {
            data[1].map((value) => {
                if (value[0] === 1) {
                    women.set(value[1], women.get(value[1]) + 1);
                } else if (value[0] === 2) {
                    men.set(value[1], men.get(value[1]) + 1);
                }
            });
        }

        // Разбираем Map в массив и считаем у какого участника больше всего голосов
        // Если у нескольких одинаково - вроде как выбирается первый из них)
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

        window.location.replace(`/result/?${answer.join("")}`);
    };

    // Очистка массивов и localStorage
    const resetData = () => {
        answersValues.clear();
        answersData.clear();
        localStorage.clear();

        // Вместо перезагрузки страницы
        setQuestionNumber(0);
        document.getElementById(`radio-${questionNumber}-${0}`).checked = false;
        document.getElementById(`radio-${questionNumber}-${1}`).checked = false;
    };

    return (
        <>
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
                                        getResult();
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
