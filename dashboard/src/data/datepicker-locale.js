const locale = {
  ru: {
    full: [
      'Январь ',
      'Февраль ',
      'Март ',
      'Апрель ',
      'Май ',
      'Июнь ',
      'Июль ',
      'Август ',
      'Сентябрь ',
      'Октябрь ',
      'Ноябрь ',
      'Декабрь',
    ],
    short: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
  },
};

const monthsHead = lang => {
  return locale[lang].full.join('_').split('_');
};

const months = lang => {
  return locale[lang].short.join('_').split('_');
};

export { monthsHead, months };
