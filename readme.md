# Критерії прийому

Завдання виконано на гілці hw7-swagger
При здачі домашньої роботи є посилання на вихідні файли на Github та посилання на задеплоєний проєкт цієї ДЗ (гілка hw7-swagger) на [render.com](https://render.com/)
При виконанні коду завдання немає помилок
При виконанні завдання дотримано файлової структури застосунку, що вказана в матеріалах курсу

# Покрокове виконання завдання

## Крок 1

Створіть гілку hw7-swagger з гілки hw6-email-and-imagesі виконуйте це завдання в гілці hw7-swagger.

# Крок 2

Встановіть пакет @redocly/cli як Dev залежність:

`npm install @redocly/cli --save-dev`

Додайте в розділ із скриптами в package.json нові команди:

```java script
{
  "scripts": {
    "build": "npm run build-docs",
    "build-docs": "redocly bundle --ext json -o docs/swagger.json",
    "preview-docs": "redocly preview-docs"
  }
}
```

Створіть файл redocly.yaml із таким вмістом:

```yaml
# See https://redocly.com/docs/cli/configuration/ for more information.

apis:
  sample@v1:
    root: docs/openapi.yaml
extends:
  - recommended
rules:
  no-unused-components: error
theme:
  htmlTemplate: ./docs/index.html
  colors:
    primary:
      main: '#32329f'
  generateCodeSamples:
    languages:
      - lang: curl
      - lang: Node.js
      - lang: JavaScript
```

Створіть в корні проєкту папку docs, в ній створіть файл index.html із таким контентом:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>API Reference | ReDoc</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="favicon.png" />
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
    {{{redocHead}}}
  </head>

  <body>
    {{{redocHTML}}}
  </body>
</html>
```

Створіть файл docs/openapi.yaml з наступним вмістом:

```yaml
openapi: 3.1.0
info:
  version: 1.0.0
  title: <назва вашого додатку>
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
  description:
<опис вашого додатку>
tags:
  # теги, що ви будете використовувати
servers:
  - url: http://localhost:3000
  - url: #посилання на задеплоєний сайт
paths:
  # тут будуть посилання на ендпоінти
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
```

Запустіть команду npm run preview-docs, щоб бачити внесені зміни.

## Крок 3

Створіть папку swagger. У неї додайте папки components та paths. В папці components зберігайте частини сутностей, наприклад, опис відповідей або сутностей. В папці paths зберігайте файли документації відповідно до схеми побудови шляху. Наприклад, для роуту GET /contacts/:contactId відповідним файлом буде /swagger/paths/contacts/{id}/get.yaml.

## Крок 4

Додайте документацію для роута GET /contacts/:contactId у відповідний файл. У ній має бути:

1. tags - тег, до якого цей ендпоінт належить (Contacts)
2. summary - короткий опис ендпоінта
3. operationId - унікальний ідентифікатор операції
4. description - більш розгорнутий опис
5. security - зазначте, що ми використовуємо авторизацію за допомогою Bearer токену
6. parameters - параметри запиту (для цього ендпоінту - параметр шляху :contactId)
7. responses - варіанти відповіді

- 200
- 404
  Додайте посилання на цей ендпоінт до файлу ./docs/openapi.yaml.

## Крок 5

Додайте за тим самим принципом документацію для ендпоінтів:

- GET /contacts
- PATCH /contacts/:contactId
- DELETE /contacts/:contactId
- POST /contacts
  Не забудьте описати query параметри для GET /contacts та body для запитів, що його містять.

## Крок 6 (не обов’язково!)

За бажанням напишіть документацію для ендпоінтів авторизації.

## Крок 7

Додайте окремий роут /api-docs, на якому запустіть відображення документації за допомогою пакету swagger-ui-express.

## Крок 8

Поміняйте гілку, з якої деплоїться проєкт на render.com, на hw7-swagger. Переконайтеся, що зміни успішно задеплоєні, і користувач за допомогою створеної інтерактивної документації може генерувати та направляти запити для тестування API.

Це завдання допоможе вам створити зручну та інформативну документацію для вашого API. Успіхів у виконанні завдання! 🚀

> ! Дуже важливо перед здачею дз на перевірку ментору перевіряти роботу вашого задеплоєного додатка на render.com. Якщо, наприклад, при деплої ви забули додати змінні оточення (env), то задеплоєний бекенд не буде працювати. Також перевірте, що всі створені вами маршрути бекенду працюють як очікується згідно з завданням.
