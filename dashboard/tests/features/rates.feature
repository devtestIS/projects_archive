# language: ru

Функционал: окно смены тарифа
  Выбор оплаты по подписке
  Выбор оплаты поштучно
  Есть возможность смены тарифа

  Предыстория:
    Допустим пользователь открыл окно с выбором оплаты по подписке
    И видит компонент информации о подписке
    И есть возможность выбрать тариф по подписке
    И есть возможность выбрать тариф поштучно

  @request
  @success
  Сценарий: пользователь может оплатить подписку
    Когда пользователь имеет право на выбор тарифа
    И нажимает выбрать тариф
    Тогда тариф меняется
    И показывается алерт
    И сообщение в алерте "Тариф успешно изменен"
    К тому же показывается модальное окно
    И сообщение в модальном окне "Тариф успешно изменен"

  @request
  @error
  Сценарий: пользователь может оплатить подписку и недостаточно средств
    Когда пользователь имеет право на выбор тарифа
    И нажимает выбрать тариф
    Тогда тариф не меняется
    И показывается алерт
    И сообщение в алерте "Недостаточно средств для выбора данного тарифа"
    К тому же показывается модальное окно
    И сообщение в модальном окне "Недостаточно средств для выбора данного тарифа"

  @request
  @error
  Сценарий: пользователь может оплатить подписку и ошибка 401
    Когда пользователь имеет право на выбор тарифа
    И нажимает выбрать тариф
    Тогда тариф не меняется
    И показывается алерт
    И сообщение в алерте "Недопустимый токен"
    К тому же производится переход на "/login"

  @request
  @error
  Сценарий: пользователь может оплатить подписку и ошибка 500
    Когда пользователь имеет право на выбор тарифа
    И нажимает выбрать тариф
    Тогда тариф не меняется
    И показывается алерт
    И сообщение в алерте "Ошибка 500"
    К тому же производится переход на "/errors"

# 'Недостаточно средств для выбора данного тарифа.'
# 'Тариф успешно изменен.'
# 'Данный тариф уже выбран.'
# 'Тариф не найден.'
