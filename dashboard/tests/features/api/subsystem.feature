# language: ru

Функционал: получение данных из внешней подсистемы
  Пользователь может сформировать запрос к подсистеме
  И затем получить ответ от подсистемы

  Предыстория:
    Допустим пользователь авторизован
    И ему предоставлен доступ к ряду подсистем
    И он получает данные с одной из подсистем

  @success
  @request
  Структура сценария: получение полного адреса для запроса
    Если подсистема обладает атрибутом <urn>
    И метод подсистемы иммет атрибут <url>
    Тогда полный адрес <uri> начинается с "http"
    Также полный адрес <uri> не содержит несколько "/" подряд
    Также <url> полного адреса не заканчивается на "/"
    Также полный адрес запроса соответствует <uri>

    Пример:
      | urn                   | url           | uri                                |
      | localhost             | /path/to      | http://localhost/path/to           |
      | localhost:80          | /path/to/     | http://localhost:80/path/to        |
      | http://localhost      | PATH/TO       | http://localhost/path/to           |
      | HTTPs://LOCALHOST     | path/to       | https://localhost/path/to          |
      | https://localhost:80/ | path-to       | https://localhost/path-to          |
      | localhost/            | /path-/to/    | http://localhost/path-/to          |
      | locahost:8000/        | path/?a=1     | http://localhost:8000/path?a=1     |
      | http://locahost/      | path/{to}/    | http://localhost:8000/path/{to}    |
      | https://locahost:8000 | {path}/{to}   | https://localhost:8000/{path}/{to} |

  @success
  @request
  Структура сценария: пользователь получает код ответа от подсистемы
    Если пользователь делает GET-запрос <method> к подсистеме <provider> по адресу: <uri> 
    Тогда пользователь получает ответ с кодом <code>
    Также содержащим сообщение <message>

    Допустим что в системе зарегистрирована подсистема со следующими параметрами:
      | name         | urn                 | description                       |
      | Тестирование | https://httpbin.org | Внешняя система для тестирования  |

    Пример:
      | provider     | method               | url         | uri                            | code | message                       |
      | Тестирование | Проверка кода ответа | /status/200 | https://httpbin.org/status/200 | 200  | OK                            |
      | Тестирование | Проверка кода ответа | /status/201 | https://httpbin.org/status/201 | 201  | CREATED                       |
      | Тестирование | Проверка кода ответа | /status/201 | https://httpbin.org/status/201 | 202  | ACCEPTED                      |
      | Тестирование | Проверка кода ответа | /status/204 | https://httpbin.org/status/204 | 204  | NO CONTENT                    |
      | Тестирование | Проверка кода ответа | /status/400 | https://httpbin.org/status/400 | 400  | BAD REQUEST                   |
      | Тестирование | Проверка кода ответа | /status/401 | https://httpbin.org/status/401 | 401  | UNAUTHORIZED                  |
      | Тестирование | Проверка кода ответа | /status/402 | https://httpbin.org/status/402 | 402  | PAYMENT REQUIRED              |
      | Тестирование | Проверка кода ответа | /status/403 | https://httpbin.org/status/403 | 403  | FORBIDDEN                     |
      | Тестирование | Проверка кода ответа | /status/404 | https://httpbin.org/status/404 | 404  | NOT FOUND                     |
      | Тестирование | Проверка кода ответа | /status/405 | https://httpbin.org/status/405 | 405  | METHOD NOT ALLOWED            |
      | Тестирование | Проверка кода ответа | /status/407 | https://httpbin.org/status/407 | 407  | PROXY AUTHENTICATION REQUIRED |
      | Тестирование | Проверка кода ответа | /status/408 | https://httpbin.org/status/408 | 408  | REQUEST TIMEOUT               |
      | Тестирование | Проверка кода ответа | /status/419 | https://httpbin.org/status/419 | 419  | AUTHENTICATION TIMEOUT        |
      | Тестирование | Проверка кода ответа | /status/429 | https://httpbin.org/status/429 | 429  | TOO MANY REQUESTS             |
      | Тестирование | Проверка кода ответа | /status/500 | https://httpbin.org/status/500 | 500  | INTERNAL SERVER ERROR         |
