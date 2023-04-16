// Многа букав, потому что работа с Map
export const getResult = (answersValues) => {
    const sex = answersValues.get(0)[0];

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
    let answer;
    let max;

    if (sex === 1) {
        const womenArray = [];
        women.forEach((value) => {
            womenArray.push(value);
        });

        max = Math.max(...womenArray);
        answer = [1, womenArray.indexOf(max) + 1];
    } else {
        const menArray = [];
        men.forEach((value) => {
            menArray.push(value);
        });

        max = Math.max(...menArray);
        answer = [2, menArray.indexOf(max) + 1];
    }

    window.location.replace(`/result/?${answer.join("")}#answer`);
};
