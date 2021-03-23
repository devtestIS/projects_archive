export default {
  chart: {
    id: 'chart',
    height: 215,
    type: 'line',
    background: '#1C2651',
    foreColor: '#FFFFFF',
    fontFamily: `'Raleway', sans-serif`,
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    defaultLocale: 'de',
    locales: [
      {
        name: 'de',
        options: {
          months: [
            'Januar',
            'Februar',
            'März',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Dezember'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'März',
            'Apr',
            'Mai',
            'Juni',
            'Juli',
            'Aug',
            'Sep',
            'Okt',
            'Nov',
            'Dez'
          ]
        }
      }
    ]
  },
  colors: [
    '#00FFFC',
    '#8051F8',
    '#77028A',
    '#02BC79',
    '#FFFFFF',
    '#00A1FE',
    '#4800FF',
    '#F3A9FF',
    '#005D8C'
  ],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Umsatzentwicklung (brutto)',
    align: 'center',
    margin: 50,
    style: {
      fontSize: '20px',
      fontWeight: 400,
      fontFamily: `'Raleway', sans-serif`,
      color: '#FFFFFF'
    }
  },
  xaxis: {
    type: 'category',
    labels: {
      style: {
        fontSize: '13px'
      }
    },
    axisBorder: {
      color: '#081830',
      height: 2
    },
    axisTicks: {
      color: '#081830',
      height: 7
    },
    tickPlacement: 'on'
  },
  yaxis: {
    min: 0,
    range: 100000,
    forceNiceScale: true,
    labels: {
      style: {
        fontSize: '13px'
      },
      formatter: val => `${val} € `
    }
  },
  grid: {
    borderColor: '#081830'
  },
  tooltip: {
    enabled: true,
    shared: true,
    y: {
      formatter: val => `${Number(val)} €`
    }
  },
  legend: {
    fontSize: '16px',
    fontFamily: `'Raleway', sans-serif`,
    height: 141,
    width: 830,
    horizontalAlign: 'left',
    markers: {
      width: 8,
      height: 8,
      strokeWidth: 0,
      radius: 0
    },
    itemMargin: {
      horizontal: 20,
      vertical: 0
    }
  }
}
