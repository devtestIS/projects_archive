export default function(moment) {
  return [
    {
      name: 'dateRange',
      callback: function(row, query) {
        const selectedDate = moment(query);
        const selectedMonth = selectedDate.month();
        const selectedYear = selectedDate.year();
        const currentDate = moment(row.date);
        const currentMonth = currentDate.month();
        const currentYear = currentDate.year();
        return selectedYear === currentYear && selectedMonth === currentMonth;
      },
    },
  ];
}
