const padTo2Digits = (num) => num.toString().padStart(2, '0');
export const formatDate = (date) => {
    return [date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate())
    ].join('-') + "T00:00:00";
};