export default function() {
  return [
    {
      title: 'Главное меню',
      items: [
        {
          title: 'Управление документацией',
          to: '/admin/document-management',
          htmlBefore: '<i class="material-icons">&#xE7FD;</i>',
        },
        {
          title: 'Управление доступными методами',
          to: '/admin/methods-management',
          htmlBefore: '<i class="material-icons">payment</i>',
        },
        {
          title: 'Управление пользователями',
          to: '/admin/users-management',
          htmlBefore: '<i class="material-icons">&#xE917;</i>',
        },
        {
          title: 'Мониторинг активности пользователей',
          to: '/admin/user-activity',
          htmlBefore: '<i class="material-icons">&#xE889;</i>',
        },
        {
          title: 'Аналитический дэшборд',
          to: '/admin/analytics',
          htmlBefore: '<i class="material-icons">&#xE2C7;</i>',
        },
      ],
    },
  ];
}
