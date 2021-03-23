export default function() {
  return [
    {
      title: 'Главное меню',
      items: [
        {
          title: 'Общие сведения',
          to: '/user-profile',
          htmlBefore: '<i class="material-icons">&#xE7FD;</i>',
        },
        {
          title: 'Подписка и тарифы',
          to: '/subscription',
          htmlBefore: '<i class="material-icons">payment</i>',
        },
        {
          title: 'Статистика',
          to: '/statistics',
          htmlBefore: '<i class="material-icons">&#xE917;</i>',
        },
        {
          title: 'История операций',
          to: '/history',
          htmlBefore: '<i class="material-icons">&#xE889;</i>',
        },
        {
          title: 'Реквизиты для акта',
          to: '/requisites',
          htmlBefore: '<i class="material-icons">&#xE2C7;</i>',
        },
        {
          title: 'Документация',
          to: '/documentation',
          htmlBefore: '<i class="material-icons">&#xE873;</i>',
        },
      ],
    },
  ];
}
