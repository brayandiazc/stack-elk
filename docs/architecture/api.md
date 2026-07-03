# Referencia de API

> Endpoints HTTP de la app Node.js del **Laboratorio ELK Stack**. Cada endpoint
> existe para **generar logs** de distintos tipos que luego se analizan en Kibana.
>
> **Última actualización**: 2026-07-02

## Convenciones generales

- **URL base**: `http://localhost:5001`
- **Formato**: JSON (`Content-Type: application/json`).
- **Fechas**: ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`).
- **Sin autenticación**: es un laboratorio local (ver [`auth.md`](auth.md)).

## Logging

Cada request pasa por un middleware que registra un evento `info` con método,
ruta, código de estado, duración, User-Agent e IP. Además, cada endpoint emite su
propio log. Ver el esquema completo del documento de log en
[`database.md`](database.md).

## Endpoints

### `GET /`

Página principal. Emite un log `info`.

```json
{ "message": "OK", "timestamp": "...", "service": "ELK Lab App" }
```

Respuesta: `200 OK`.

### `GET /health`

Health check. Emite un log `info`. Usado por `check-services.sh`.

```json
{ "status": "healthy", "timestamp": "..." }
```

Respuesta: `200 OK`.

### `GET /error`

Error simulado. Emite un log `error` (con tag `error` en Logstash).

```json
{ "error": "Internal Server Error", "message": "This is a simulated error for testing purposes", "timestamp": "..." }
```

Respuesta: `500 Internal Server Error`.

### `GET /logs/:level`

Genera un log del nivel indicado. Útil para producir tráfico de niveles variados.

```bash
curl http://localhost:5001/logs/info
curl http://localhost:5001/logs/warn
curl http://localhost:5001/logs/error
curl http://localhost:5001/logs/debug
```

```json
{ "message": "Generated info log", "timestamp": "..." }
```

Respuesta: `200 OK`.

### `GET /*` (ruta no encontrada)

Cualquier ruta desconocida emite un log `warn` (tag `warning`).

```json
{ "error": "Not Found", "message": "Route /xyz not found" }
```

Respuesta: `404 Not Found`.

## Resumen

| Endpoint       | Método | Log emitido | Código |
| -------------- | ------ | ----------- | ------ |
| `/`            | GET    | `info`      | 200    |
| `/health`      | GET    | `info`      | 200    |
| `/error`       | GET    | `error`     | 500    |
| `/logs/:level` | GET    | `:level`    | 200    |
| `/*`           | GET    | `warn`      | 404    |

## Ejemplos de uso

```bash
# Tráfico manual básico
curl http://localhost:5001/
curl http://localhost:5001/error
curl http://localhost:5001/logs/warn

# Simulación automática de tráfico
./simulate-traffic.sh
```
