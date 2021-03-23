# language: ru

@auth
Функционал: регистрация в системе
  Анонимный пользователь регистрируется в системе

  Предыстория:
    Анонимный пользователь зашел на любую публичную страницу сайта
    Пользователь хочет зарегестрироваться в системе

  @success
  Сценарий: кнопка "Регистрация"
    Если пользователь анонимный
    Тогда пользователь видит кнопку "Регистрация"

  @success
  Сценарий: форма регистрации
    Если пользователь анонимный
    И пользователь нажимает кнопку "Регистрация"
    Тогда пользователь видит форму регистрации

  #TODO: определить атрибуты пользователя при регистрации
