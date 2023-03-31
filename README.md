# 🐞 Мой Баг Трекер

[![Build Status](https://img.shields.io/github/repo-size/Rewive/bugtracker.back-end?label=%D0%A0%D0%B0%D0%B7%D0%BC%D0%B5%D1%80%20%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F)]
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## 📝 Описание
Это баг трекер, который позволяет пользователям отслеживать и управлять ошибками в их проектах.

## 🚀 API
### Получить список ошибок
`GET /bugs`

Возвращает список всех ошибок.

### Получить информацию об ошибке
`GET /bugs/:id`

Возвращает информацию об ошибке с указанным ID.

### Создать новую ошибку
`POST /bugs`

Создает новую ошибку с указанными данными.

### Обновить информацию об ошибке
`PUT /bugs/:id`

Обновляет информацию об ошибке с указанным ID.

### Удалить ошибку
`DELETE /bugs/:id`

Удаляет ошибку с указанным ID.

## 🚀 Как начать
1. Клонируйте репозиторий
2. Установите зависимости: `npm install`
3. Запустите сервер: `npm start`
4. Откройте [http://localhost:3000](http://localhost:3000) в своем браузере

## 📄 Лицензия
[MIT](LICENSE)