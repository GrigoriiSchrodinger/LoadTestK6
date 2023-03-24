<div align="center">
        <img src="accet/image/k6_logo.png" alt="LoadTesting">
</div>

# k6 LoadTesting 📈

---
# Installation
> Запуск docker compose
```bash
docker compose up
```
- После запуска compose возможно возникнут проблемы при открытии дашбордов в Grafana, которые будут явно указывать на наличие ошибок связанных с бд. Причина мне неизвестна. Однако, проблему можно решить, перезапустив контейнер Grafana вручную.
---
> Запуск тестов
```bash
docker-compose run -v $PWD/scripts:/scripts k6 run /scripts/SimpleTest.js
```

# Grafana
- После запуска docker compose Grafana будет доступна по адресу "http://localhost:3000".
- Есть две заготовленные dashboard
