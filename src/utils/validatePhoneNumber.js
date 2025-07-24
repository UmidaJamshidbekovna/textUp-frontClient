function validatePhoneNumber(number) {
    const pattern = /\998\d{9}$/;
    return pattern.test(number);
}

export const numberAutoSpace = (phoneNumber) => {
    if (typeof phoneNumber !== 'string') return phoneNumber;

    // Удаляем все символы, кроме цифр, кроме знака +
    let hasPlus = phoneNumber.startsWith('+');
    phoneNumber = phoneNumber.replace(/\D/g, '');

    // Добавляем плюс обратно, если он был
    if (hasPlus) phoneNumber = '+' + phoneNumber;

    // Форматируем в зависимости от длины номера
    if (phoneNumber.length === 12 || (hasPlus && phoneNumber.length === 13)) {
        return phoneNumber.replace(/(\+?)(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
            '$1$2 $3 $4 $5 $6'
        );
    } else if (phoneNumber.length === 9 || (hasPlus && phoneNumber.length === 10)) {
        return phoneNumber.replace(/(\+?)(\d{2})(\d{3})(\d{2})(\d{2})/,
            '$1$2 $3 $4 $5'
        );
    } else if (phoneNumber.length === 7 || (hasPlus && phoneNumber.length === 8)) {
        return phoneNumber.replace(/(\+?)(\d{3})(\d{2})(\d{2})/,
            '$1$2 $3 $4'
        );
    }

    // Если длина не соответствует ни одному из шаблонов, возвращаем номер без изменений
    return phoneNumber;
};


export default validatePhoneNumber;
