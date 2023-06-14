// Функция для проверки длины строки

const сheckStringLenth = (string, number) => {
  if (string.length <= number) {
    return true;
  } else {
    return false;
  }
};

сheckStringLenth('проверяемая строка', 20);

// Функция для проверки, является ли строка палиндромом

const isPalindrome = (string) => {
  const newString = string.toLowerCase().replaceAll(' ', '');
  let result = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    result += newString[i];
  }
  if (newString === result) {
    return true;
  } else {
    return false;
  }
};

isPalindrome('Лёша на полке клопа нашёл ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа

const getNumber = (string) => {
  let number = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      number += string[i];
    }
  }
  return parseInt(number, 10);
};

getNumber('а я томат');
