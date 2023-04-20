const Masha = [1, 1];
const Diana = [1, 2];
const Dasha = [1, 3];
const Katya = [1, 4];
const Dana = [1, 5];
const Anya = [1, 6];

const Oleg = [2, 1];
const Egor = [2, 2];
const VanyaH = [2, 3];
const Sasha = [2, 4];
const Lesha = [2, 5];
const VanyaL = [2, 6];

export const quiz = [
    {
        id: 1,
        title: "Кто ты?",
        answers: [
            {
                text: "Мисс",
                value: [1],
            },
            {
                text: "Мистер",
                value: [2],
            },
        ],
    },
    {
        id: 2,
        title: "Как ты ведёшь себя в компании друзей?",
        answers: [
            {
                text: "Я душа компании",
                value: [Egor, Diana],
            },
            {
                text: "Я главный заводила, всегда пою песни",
                value: [Oleg, Masha],
            },
            {
                text: "Веду себя спокойно, наблюдаю за всеми",
                value: [Lesha, Dana],
            },
            {
                text: "Благодаря мне команда не остаётся без стендапа",
                value: [VanyaH, Dasha],
            },
            {
                text: "Я активен 24/7, поэтому вижусь с ними только на мероприятии",
                value: [Sasha, Katya],
            },
            {
                text: "Все творчество и креативность в компании держатся на моих плечах",
                value: [VanyaL, Anya],
            },
        ],
    },
    {
        id: 3,
        title: "Какое у тебя хобби?",
        answers: [
            {
                text: "Пою 24/7",
                value: [Oleg, Masha],
            },
            {
                text: "Не представляю свою жизнь без танца",
                value: [Egor, Anya],
            },
            {
                text: "Спорт и я - вещи неделимые",
                value: [Sasha, Katya],
            },
            {
                text: "Театр-любовь",
                value: [Diana, Lesha],
            },
            {
                text: "Рисую на всем, чем только можно",
                value: [VanyaL, Dasha],
            },
            {
                text: "Дайте мне гитару, и я сыграю на ней все песни мира",
                value: [VanyaH, Dana],
            },
        ],
    },
    {
        id: 4,
        title: "Если бы ты участвовал в Мисс и Мистер, какую номинацию ты бы забрал?",
        answers: [
            {
                text: "Мисс/мистер спорт",
                value: [Sasha, Katya],
            },
            {
                text: "Мисс/мистер стиль",
                value: [Egor, Diana],
            },
            {
                text: "Мисс/мистер творчество",
                value: [VanyaL, Anya],
            },
            {
                text: "Мисс/мистер юмор",
                value: [VanyaH, Dasha],
            },
            {
                text: "Мисс/мистер грация",
                value: [Lesha, Dana],
            },
            {
                text: "Мисс/мистер интеллект",
                value: [Oleg, Masha],
            },
        ],
    },
    {
        id: 5,
        title: "Какую музыку ты слушаешь?",
        answers: [
            {
                text: "Постоянно на тусовках, поэтому слушаю только то, что в топах",
                value: [Egor, Diana],
            },
            {
                text: "Энергичную - под нее удобно заниматься спортом",
                value: [Sasha, Katya],
            },
            {
                text: "Предпочитаю петь, чем слушать",
                value: [Oleg, Masha],
            },
            {
                text: "Устрой дестрой, порядок - это отстой",
                value: [VanyaH, Dasha],
            },
            {
                text: "Двигаюсь в ритме хип-хопа",
                value: [VanyaL, Anya],
            },
            {
                text: "Люблю спокойную и расслабленную музыку",
                value: [Lesha, Dana],
            },
        ],
    },
    {
        id: 6,
        title: "Какие шоу любишь смотреть:",
        answers: [
            {
                text: "Бьюти блоги… ну а как без них?",
                value: [Dana],
            },
            {
                text: "Посмотрел(-a) все танцевальные шоу и теперь могу научить вас любому стилю",
                value: [Anya],
            },
            {
                text: "Зачем мне смотреть шоу, если моя жизнь покруче сериала на нетфликсе",
                value: [VanyaH, Dasha],
            },
            {
                text: "Не смотрю шоу, предпочитаю слушать оперу Витаса",
                value: [Oleg, Masha],
            },
            {
                text: "Бои без правил, ММА поинтереснее ваших шоу будут",
                value: [Sasha, Katya],
            },
            {
                text: "Ни одно шоу Импровизация не проходит мимо меня",
                value: [Egor, Diana],
            },
            {
                text: "Знаю все шутки в «ЧБД» от и до",
                value: [Lesha, VanyaL],
            },
        ],
    },
    {
        id: 7,
        title: "Какой из этих фактов лучше всего описывает тебя:",
        answers: [
            {
                text: "У меня в детстве была асфальтная болезнь(я падала везде и всегда)",
                value: [Masha],
            },
            {
                text: "Люблю играть в баскетбол, но крутить мяч на пальце так и не научилась",
                value: [Egor],
            },
            {
                text: "У меня есть мой личный клон",
                value: [Anya],
            },
            {
                text: "Уже сто раз забыла имя своего напарника",
                value: [Diana],
            },
            {
                text: "Пародирую Дашу карейку, так что она бы задумалась - настоящая она или нет",
                value: [Oleg],
            },
            {
                text: "Главный хейтор бургер Кинга",
                value: [Lesha],
            },
            {
                text: "Амбассадор шаурмы",
                value: [Dasha],
            },
            {
                text: "Продам душу за сыр косичку",
                value: [VanyaL],
            },
            {
                text: "Мечтал стать архитектором, но пока строю дома только в майнкрафт",
                value: [VanyaH],
            },
            {
                text: "Платите мне зарплату не деньгами, а сливочными сырками «Чудо»",
                value: [Katya],
            },
            {
                text: "Ехал домой, а в итоге поступил в РГУ",
                value: [Sasha],
            },
            {
                text: "Уже второй раз участвую в мим",
                value: [Dana],
            },
        ],
    },
    {
        id: 8,
        title: "Ты подписался на телеграмм канал участников?",
        answers: [
            {
                text: "Да, подписался",
                value: [],
            },
            {
                text: "Уже бегу подписываться",
                value: [],
            },
        ],
    },
];

export const memersInfo = [
    [
        {
            photo: require("./images/members/woman-1.png"),
            name: "Маша Гаранина",
            desc: "Ты творческая и никогда не упускаешь возможности спеть! Ты точно, как Маша Гаранина, интеллигентная, рассудительная и искренняя. Ты очень мудрая.",
        },
        {
            photo: require("./images/members/woman-2.png"),
            name: "Диана Замалеева",
            desc: "Ты не успела зайти в комнату, а все уже обратили на тебя внимание? Тогда ты точно похожа на Диану Замалиеву. Ты такая же крутая и можешь запросто собрать самую лучшую тусовку в городе",
        },
        {
            photo: require("./images/members/woman-3.png"),
            name: "Даша Улыбина",
            desc: "Вау! Ты яркая, позитивная девушка. Ты как Даша Улыбина, ты та у кого всегда есть миллион забавных историй из своей жизни, каждый раз ты открываешься с другой стороны и еще ты очень добрая",
        },
        {
            photo: require("./images/members/woman-4.png"),
            name: "Катя Щербань",
            desc: "Любой активный вид деятельности, это твоя стихия, 17 посещений для тебя слишком мало? Ты вторая Катя Щербань. Ты такая же добрая, отзывчивая и дружелюбная",
        },
        {
            photo: require("./images/members/woman-5.png"),
            name: "Дана Улахович",
            desc: "Если бы слово уют было бы человеком, это был бы ты. С тобой можно поговорить о чем угодно. Ты точно, как Дана Улахович, такая же яркая, харизматичная и загадочная.",
        },
        {
            photo: require("./images/members/woman-6.png"),
            name: "Аня Лезина",
            desc: "Творчество у тебя в крови и даже в простых вещах ты видишь искусство? Тогда ты похожа Аню Лезину. Ты такая же разносторонняя, креативная и позитивная.",
        },
    ],
    [
        {
            photo: require("./images/members/man-1.png"),
            name: "Олег Морозихин",
            desc: "Ты творческий и никогда не упускаешь возможности спеть! Ты точно, как Олег Морозихин, интеллигентный, рассудительный и искренний. Ты очень мудрый.",
        },
        {
            photo: require("./images/members/man-2.png"),
            name: "Егор Филонов",
            desc: "Ты не успел зайти в комнату, а все уже обратили на тебя внимание? Тогда ты точно похож на Егора Филонова. Ты такой же крутой и можешь запросто собрать самую лучшую тусовку в городе.",
        },
        {
            photo: require("./images/members/man-3.png"),
            name: "Ваня Хоменок",
            desc: "Вау! Ты яркий позитивный парень. Ты, как Ваня Хоменок. Ты тот, у кого всегда есть миллион забавных историй из своей жизни. Каждый раз ты открываешься с другой стороны и очень добрый",
        },
        {
            photo: require("./images/members/man-4.png"),
            name: "Саша Мудрецов",
            desc: "Любой активный вид деятельности, это твоя стихия, 17 посещений для тебя слишком мало? Ты второй Саша Мудрецов. Ты такой же добрый, отзывчивый и дружелюбный",
        },
        {
            photo: require("./images/members/man-5.png"),
            name: "Леша Степанов",
            desc: "Если бы слово уют было бы человеком, это был бы ты, с тобой можно поговорить о чем угодно. Ты точно как Леша Степанов, такой же яркий, харизматичный и загадочный.",
        },
        {
            photo: require("./images/members/man-6.png"),
            name: "Ваня Лукашенко",
            desc: "Творчество у тебя в крови и даже в простых вещах ты видишь искусство? Тогда ты похож Ваня Лукашенко. Ты такой же разнообразный, креативный и позитивный.",
        },
    ],
];
