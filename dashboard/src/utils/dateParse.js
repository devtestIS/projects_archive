import moment from 'moment';
const dateParse = results => {
  results.forEach(element => {
    const month = Number(element.month_id.slice(4)) - 1;
    const year = Number(element.month_id.slice(0, 4));
    const date = new Date(year, month);
    moment.locale('ru');
    element.month_id = moment(date.toISOString()).format('MMMM YYYY');
  });
};

export default dateParse;
