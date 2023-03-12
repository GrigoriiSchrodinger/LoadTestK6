<div align="center">
	     <h1>k6 LoadTesting</h1>
</div>

---

![](k6_logo.png)

# Installation
> Запуск docker compose
```bash
docker compose up
```
скорее всего после запуска compose, при открытий grafana dashboards будет кричать об ошибки,
мне честно неизвестно почему. Решить проблему можно при ручном перезапуске контейнера grafana
---
> Запуск тестов
```bash
docker-compose run -v $PWD/scripts:/scripts k6 run /scripts/SimpleTest.js
```

# Grafana
- После запуска docker compose Grafana будет доступна по адресу "http://localhost:3000".
- Есть две заготовленные dashboard
