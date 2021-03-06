# language: ru

Функционал: вход в систему
  Вход в систему зарегистрированных пользователей
  Осуществляется через форму, содержащую поля: логин и пароль
  Помимо этого имеются опции "запомнить меня" и "восстановить пароль"

  Предыстория:
    Зарегистрированный пользователь зашел на страницу входа
    Он точно знает свои данные и хочет, используя их, зайти в свой личый кабинет

  @fail
  Сценарий: не заполнено поле логина
    Если поле логина пустое
    Тогда кнопка входа остается неактивной

  @fail
  Сценарий: не заполнено поле пароля
    Если пользователь ввел валидный логин
    И поле пароля пустое
    Тогда кнопка входа остается неактивной

  @fail
  Структура сценария: невалидный логин
    Если пользователь ввел <login>
    И пользователь ввел <password>
    Тогда кнопка входа остается неактивной

    Примеры:
      | login         | password |
      | abc           | ABC456z# |
      | @abc          | ABC456z# |
      | abc@          | ABC456z# |
      | abc@abc       | ABC456z# |
      | abc@abc.      | ABC456z# |
      | abc@abc.a     | ABC456z# |
      | abc@123.abc   | ABC456z# |

  @fail
  Структура сценария: невалидный пароль
    Если пользователь ввел <login>
    И пользователь ввел <password>
    Тогда кнопка входа остается неактивной

    Примеры:
      | login         | password |
      | user@nekor.ru | 123      |
      | user@nekor.ru | abc      |
      | user@nekor.ru | abc123   |

  @success
  Структура сценария: валидные данные для входа
    Если пользователь ввел <login>
    И пользователь ввел <password>
    Тогда кнопка входа становится активной

    Примеры:
      | login         | password |
      | user@nekor.ru | ABC456z! |
      | boss@nekor.ru | _123#abc |

  @request
  @success
  Структура сценария: успешный вход в систему
    Если пользователь ввел <login>
    И ввел валидный <password>
    И нажал кнопку входа
    И отправляется запрос к сервису аутентификации
    И сервис возвращает ответ с http-кодом "200"
    Тогда перенаправляется в личный кабинет

    Допустим в системе зарегистрированы пользователи:
      | login         | password |
      | user@nekor.ru | ABC456z! |
      | boss@nekor.ru | _123#abc |

    Примеры:
      | login         | password |
      | user@nekor.ru | ABC456z! |
      | boss@nekor.ru | _123#abc |

  @request
  @fail
  Структура сценария: отказ входа в систему
    Если пользователь ввел <login>
    И пользователь ввел <password>
    И нажал кнопку входа
    И отправляется запрос к сервису аутентификации
    Но сервис возвращает ответ с http-кодом "401"
    Тогда пользователь видит сообщение "Неверный логин или пароль"

    Примеры:
      | login         | password |
      | user@nekor.ru | ABC456z! |
      | boss@nekor.ru | _123#abc |

  @request
  @fail
  Сценарий: ошибка входа
    Если пользователь ввел валидный логин
    И пользователь ввел валидный пароль
    И нажал кнопку входа
    И отправляется запрос к сервису аутентификации
    Но сервис возвращает ответ с http-кодом "500"
    Тогда пользователь видит сообщение "Ошибка входа"

