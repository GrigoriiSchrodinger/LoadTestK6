<div align="center">
	     <h1>k6 LoadTesting</h1>
</div>

---

<img src="accet/image/k6_logo.png">

# Installation
> Running docker compose
```bash
docker compose up
```
- Most likely after starting compose, when opening grafana dashboards it will scream about errors,
I honestly don't know why. You can solve the problem by manually restarting the grafana container
---
> Running Tests
```bash
docker-compose run -v $PWD/scripts:/scripts k6 run /scripts/SimpleTest.js
```

# Grafana
- After running docker compose, Grafana will be available at "http://localhost:3000".
- There are two prepared dashboard
