# Convenciones de despliegue y operación

> Cómo se levanta, verifica y opera el stack del Laboratorio ELK Stack.
> **Última actualización**: 2026-07-02

## Stack de infraestructura

- **Contenedores / orquestación**: Docker + Docker Compose.
- **Red**: bridge `elk-network` (comunicación interna entre servicios).
- **Persistencia**: volumen `elasticsearch-data` y volumen bind `./logs`.

## Ambientes

Este proyecto es un **laboratorio local**; no tiene ambientes remotos. Todo corre
en `localhost` vía `docker-compose`.

| Servicio      | URL local             |
| ------------- | --------------------- |
| App Node.js   | http://localhost:5001 |
| Elasticsearch | http://localhost:9200 |
| Kibana        | http://localhost:5601 |

## Reglas

- Cada `up` debe ser reproducible: todo el estado deriva de `docker-compose.yml`,
  el `Dockerfile` y la config de Logstash versionados.
- Verificar la salud del stack tras cada arranque (`./check-services.sh`).
- No exponer los puertos 9200/5601 fuera de la máquina (ver [`../architecture/auth.md`](../architecture/auth.md)).

## Procedimiento de arranque

```bash
# Opción guiada
./quick-start.sh

# Opción manual
docker-compose up -d
docker-compose ps
./check-services.sh
```

## Verificación

```bash
curl http://localhost:5001/health              # App
curl http://localhost:9200/_cluster/health     # Elasticsearch
open http://localhost:5601                      # Kibana
```

## Rollback / reinicio

```bash
docker-compose restart <servicio>   # Reiniciar un servicio
docker-compose down                 # Detener el stack (conserva datos)
docker-compose down -v              # Detener y borrar datos de Elasticsearch
```

## Health checks y monitoreo

- Endpoint de salud de la app: `GET /health`.
- Logs de un servicio: `docker-compose logs -f <servicio>`.
- Uso de recursos: `docker stats`.

## Referencias

- [`../architecture/architecture.md`](../architecture/architecture.md) — arquitectura del stack.
- [Documentación de Docker Compose](https://docs.docker.com/compose/).
