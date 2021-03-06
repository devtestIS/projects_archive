# language: ru

Функционал: документация к методам системного API
  Пользователь может просматривать список доступных методов
  Пользователь может просматривать документацию по выбранному методу
  Пользователь видит в документации описание метода
  Пользователь может на странице документации сделать бесплатный тестовый запрос и получить ответ на него

  Предыстория:
    Если пользователь авторизован
    И пользователь зашел в раздел "Документация"
  
  @success
  Структура сценария: в списке методов сокращается строка описания
    Если пользователь видит список методов системного API
    И длина строки <description> больше 30
    Тогда строка обрезается до ближайшего пробела
    Также к описанию добавляется многоточие
    Иначе строка описания остается исходной
    Но строка описания всегда соответствует <short>

    Пример:
      | description                                                        | shortly                        | 
      | Общие показатели по всем проектам                                  | Общие показатели по всем...    | 
      | Сводка по методу освоенного объема                                 | Сводка по методу освоенного... | 
      | Полный список документов                                           | Полный список документов       | 
      | Создание нового документа                                          | Создание нового документа      | 
      | Изменение информации по выбранной задаче по указанным атрибутам    | Изменение информации по...     | 
      | Полный список задач                                                | Полный список задач            | 
      | Список атрибутов, полностью описывающих указанный объект           | Список атрибутов, полностью... | 
      | Проверка ответа по указаному HTTP-коду                             | Проверка ответа по...          | 

  @success
  Структура сценария: пользователь видит список методов
    Если пользователь видит список методов системного API
    Тогда <id> метода соответствует его <name> и <provider>
    Также описание метода <description> сокращается до длины меньше 30 символов

    Пример:
      | id | provider        | name                | description                    | 
      |  1 | Аналитика       | Сводный отчет       | Общие показатели по всем...    | 
      |  2 | Аналитика       | Освоенные объемы    | Сводка по методу освоенного... | 
      |  3 | Документооборот | Список документов   | Полный список документов       | 
      |  4 | Документооборот | Создание документа  | Создание нового документа      | 
      |  5 | Документооборот | Выгрузка истории    | Изменение информации по...     | 
      |  6 | Проекты         | Обновление задачи   | Полный список задач            | 
      |  7 | Проекты         | Список задач        | Список атрибутов, полностью... | 
      |  8 | САПР            | Атрибуты объекта    | Проверка ответа по...          | 

    Допустим что есть список следующих методов подсистем:
      | id | provider        | name                 | urn               | method | description                                                        |
      |  1 | Аналитика       | Сводный отчет        | /reports/total    | GET    | Общие показатели по всем проектам                                  |
      |  2 | Аналитика       | Освоенные объемы     | /reports/moo      | GET    | Сводка по методу освоенного объема                                 |
      |  3 | Документооборот | Список документов    | /documents        | GET    | Полный список документов                                           |
      |  4 | Документооборот | Создание документа   | /documents        | POST   | Создание нового документа                                          |
      |  5 | Проекты         | Обновление задачи    | /task/{id}        | PATCH  | Изменение информации по выбранной задаче по указанным атрибутам    |
      |  6 | Проекты         | Список задач         | /tasks            | GET    | Полный список задач                                                |
      |  7 | САПР            | Атрибуты объекта     | /objects/{id}     | GET    | Список атрибутов, полностью описывающих указанный объект           |
      |  8 | Тестирование    | Проверка кода ответа | /status/{code}    | GET    | Проверка ответа по указаному HTTP-коду                             |

  @success
  Структура сценария: пользователь выбирает метод из списка
    Если пользователь видит список методов системного API
    И пользователь видит ссылку "Подробнее" в каждой строчке
    И пользователь кликает по ней
    Тогда пользователь видит модальное окно документации
    Также заголовок модального окна содержит <name> с меткой <provider>

    Допустим что есть список следующих методов подсистем:
      | id | provider        | name                 |
      |  1 | Аналитика       | Сводный отчет        |
      |  2 | Документооборот | Список документов    |
      |  3 | Проекты         | Список задач         |
      |  4 | САПР            | Атрибуты объекта     |
      |  5 | Тестирование    | Проверка кода ответа |

  @success
  Структура сценария: пользователь получает документацию по методу
    Если пользователь выбрал метод подсистемы
    И на сервер отправляется запрос с <id> метода
    И возвращается ответ с кодом 200
    И ответ содержит полную информацию по методу
    Тогда пользователь видит модальное окно документации
    Также окно содержит форму с описанием метода
    Также форма содержит строку адреса <url> с меткой <method>
    Также форма содержит текстовое описание <description>
    Также форма содержит таблицу параметров запроса <params>
    Также форма содержит указание на установленый <limit> по вызовам

    Пример:
      | id | provider        | name                 | method | url               | uri                               | description                          | params   | limits |
      |  1 | Тестирование    | Проверка кода ответа | GET    | /status/{code}    | https://httpbin.org/status/{code} | Проверка http-кода ответа подсистемы | code:int | 1 000  |
      |  2 | Проекты         | Обновление задачи    | PATCH  | /task/{id}        | http://localhost:8000/task/{id}   | Изменение атрибутов выбранной задачи | id:int   | 0      |

  @fail
  Сценарий: пользователю запрещен просмотр документации для метода
    Если пользователь выбрал метод подсистемы
    И на сервер отправляется запрос для получения данных метода
    И возвращается ответ с кодом 401
    Тогда пользователь видит модальное окно документации
    Также окно содержит сообщение об ошибке доступа
    """
    У вас нет прав для работы с этими методом.
    Пожалуйста, обратитесь в службу поддержки.
    """
