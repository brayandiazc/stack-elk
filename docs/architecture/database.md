# Modelo de Datos (índices de Elasticsearch)

> Este proyecto no usa una base de datos relacional: su "modelo de datos" es el
> **documento de log** que se indexa en Elasticsearch. Para las reglas reusables
> de modelado ver [`../conventions/`](../conventions/README.md).
>
> **Última actualización**: 2026-07-02

## Índice

- **Patrón**: `app-logs-YYYY.MM.dd` (un índice por día).
- **Index pattern en Kibana**: `app-logs-*`.
- **Time field**: `@timestamp` (derivado del campo `timestamp` por Logstash).

## Documento de log

Cada línea de `logs/app.log` es un objeto JSON generado por Winston y enriquecido
por Logstash. Campos principales:

| Campo         | Tipo     | Origen        | Descripción                                   |
| ------------- | -------- | ------------- | --------------------------------------------- |
| `@timestamp`  | date     | Logstash      | Timestamp del evento (parseado de `timestamp`)|
| `timestamp`   | date     | App (Winston) | Marca de tiempo ISO 8601 original             |
| `level`       | keyword  | App           | `info` \| `warn` \| `error` \| `debug` \| ... |
| `message`     | text     | App           | Descripción legible del evento                |
| `path`        | keyword  | App           | Ruta del endpoint (`/`, `/error`, ...)        |
| `method`      | keyword  | App           | Método HTTP (solo en logs de request)         |
| `statusCode`  | integer  | App           | Código de respuesta HTTP                      |
| `duration`    | keyword  | App           | Duración de la request (`"15ms"`)             |
| `userAgent`   | text     | App           | Cabecera User-Agent                           |
| `ip`          | ip/text  | App           | IP de origen                                  |
| `endpoint`    | keyword  | Logstash grok | Ruta sin query string, extraída de `path`     |
| `service`     | keyword  | Logstash      | Constante `elk-lab-app`                        |
| `environment` | keyword  | Logstash      | Constante `development`                        |
| `tags`        | keyword[]| Logstash      | `error` \| `warning` \| `info` según `level`  |

## Ejemplo de documento

```json
{
  "@timestamp": "2023-12-01T10:30:00.000Z",
  "timestamp": "2023-12-01T10:30:00.000Z",
  "level": "info",
  "message": "GET /health - 200",
  "path": "/health",
  "method": "GET",
  "statusCode": 200,
  "duration": "15ms",
  "userAgent": "curl/7.68.0",
  "ip": "172.18.0.1",
  "endpoint": "/health",
  "service": "elk-lab-app",
  "environment": "development",
  "tags": ["info"]
}
```

## Enriquecimiento en Logstash

El pipeline ([`logstash/pipeline/logstash.conf`](../../logstash/pipeline/logstash.conf)):

1. **`date`** — copia `timestamp` (ISO8601) a `@timestamp`.
2. **`mutate`** — agrega `service` y `environment`; normaliza `level`.
3. **`grok`** — extrae `endpoint` desde `path` (sin query string).
4. **`mutate add_tag`** — etiqueta según el nivel (`error`, `warning`, `info`).

## Retención y rotación

- La rotación es **diaria** por el sufijo de fecha del índice.
- En este laboratorio no hay política de borrado automática (ILM). Como ejercicio
  avanzado se puede configurar Index Lifecycle Management para expirar índices
  antiguos.

## Limpieza de datos

```bash
# Borra los volúmenes de Elasticsearch (pierde todos los índices)
docker-compose down -v
```
