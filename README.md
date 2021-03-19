# Проект Mesto бэкенд

### Описание

Бекенд для проекта [Mesto](https://github.com/romanlesnoy/react-mesto-auth) 

Отвечает за авторизицию пользователей на сайте. Сохранение данных пользователя и карточек с изображениями в базе mongoDB. 
Взаимодействие с базой данных происходит с помощью mongoose. Для валидации запросов используется celebrate. Пароли шифруются bcryptjs.
Централизованная обработка ошибок.

### Стек

- Javascript
- Node.js
- Express.js
- mongoose
- MongoDB

### Запуск приложения

- Клонировать репозиторий
    ```bash
    $ git clone https://github.com/romanlesnoy/express-mesto.git
    ```
- Перейти в директорию проекта и установить записимости
    ```bash
    $ cd express-mesto && npm install
    ```
- Запустить приложение
    ```bash
    npm run start
    ```

Также для работы с приложением вам понадобиться [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)), и для взаимодействие с Mongo [Compass](https://www.mongodb.com/try/download/compass)
