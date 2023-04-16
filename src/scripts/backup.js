// Бэкапы
export const doBackups = (answersData, answersValues) => {
    localStorage.clear();
    doAnswersBackup(answersData);
    doValuesBackup(answersValues);
};

const doAnswersBackup = (answersData) => {
    const answersArray = [];
    answersData.forEach((value) => {
        answersArray.push(value);
    });

    localStorage.setItem("previous-data", JSON.stringify(answersArray));
};

const doValuesBackup = (answersValues) => {
    answersValues.forEach((value, index) => {
        localStorage.setItem(index, JSON.stringify(value));
    });
};

export const getAnswersBackup = () => {
    const result = new Map();
    const key = "previous-data";
    if (localStorage.getItem(key) === null) {
        return result;
    }

    const localData = JSON.parse(localStorage.getItem(key));
    if (localData.length === 1) {
        result.set(0, localData);
    }

    if (localData.length > 1) {
        localData.map((value, index) => {
            result.set(index, value);
        });
    }

    return result;
};

export const getValuesBackup = () => {
    const backups = new Map();

    if (localStorage.getItem(0) === null) {
        return backups;
    }

    for (let i = 0; i < 8; i++) {
        if (localStorage.getItem(i) === null) {
            break;
        }
        backups.set(i, JSON.parse(localStorage.getItem(i)));
    }
    return backups;
};
