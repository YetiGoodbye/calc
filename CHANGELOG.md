2018-07-03 0.0.0 Initial commit
2018-07-03

# Calculators
Фронтенд web-приложения "Калькуляторы"

## [Unreleased]
### Added
### Changed 
### Removed
### Fixed

## [0.0.3] - 2018-07-24
### Added
- CHANGELOG.md

### Changed
- README.md


## [0.0.2] - 2018-07-23
### Added
- Подключен продакшн конфиг webpack

## [0.0.1] - 2018-07-21
### Added
- Большая часть production и develep зависимостей
- View на React
- app - папка приложения
- dist - папка для продакшн билда
- webpack - папка конфигов webpack
- Один центральный компонент простого калькулятора, без функций памяти (M+, M-, MR, MC)
- Redux не подключен
- Цикл обработки событий пользователя реализован с помощью конечного автомата. Логика: app/components/Calculator/buisness.js
- Поддерживается БЭМ в самопальном виде
- Hello - тестовый компонент
- Компоненты Button, Header, Logon, Menu не реализованы
- Названия CSS классов для компонентов вынесены в конфигурационный файл app/config/namespace.scss (есть импорт для js)
- Константы для составля.щих стилей app/config/constants.scss
- reset.css минимален и растет по мере добавления тегов.


## [0.0.0] - 2018-07-03
### Добавлено
- Initial commit
- README.md
