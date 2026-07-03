# Diseño — Visualizaciones y Dashboards en Kibana

> Cómo se diseña la capa de análisis del laboratorio: index pattern, Discover,
> visualizaciones y alertas. Las decisiones relevantes se promueven a ADRs en
> [`../decisions/`](../decisions/README.md).
>
> **Última actualización**: 2026-07-02

## Contexto y objetivos

- **Problema**: los logs dispersos de una app no permiten ver patrones ni errores
  en tiempo real.
- **Objetivo**: dar una vista unificada (dashboard) de la salud y el tráfico de la
  app a partir de los logs indexados.
- **No-objetivo**: no es un sistema de observabilidad de producción (sin APM, sin
  trazas distribuidas, sin métricas de infraestructura).

## Index pattern

- Crear el index pattern `app-logs-*` en **Stack Management → Index Patterns**.
- Seleccionar `@timestamp` como *Time field*.

## Visualizaciones sugeridas

| Visualización              | Tipo          | Métrica / Ejes                                  |
| -------------------------- | ------------- | ----------------------------------------------- |
| Logs por nivel             | Pie / Donut   | Count, segmentado por `level`                   |
| Logs por endpoint          | Vertical Bar  | Date Histogram (`@timestamp`) × Count, split por `path` |
| Errores por hora           | Line          | Date Histogram (1h) × Count, filtro `level:error` |
| Latencia por endpoint      | Data Table    | `duration` por `endpoint` (ejercicio intermedio)|
| Tráfico por IP             | Bar           | Count por `ip` (ejercicio intermedio)           |

> El archivo [`kibana-setup.json`](../../kibana-setup.json) contiene objetos
> guardados de Kibana para acelerar la creación de estas visualizaciones, y
> [`kibana-alerts.json`](../../kibana-alerts.json) define reglas de alerta.

## Estados de la interfaz

Al construir un dashboard contempla:

- **Sin datos**: aún no hay logs → generar tráfico con `./simulate-traffic.sh`.
- **Rango temporal**: ajustar el *time picker* (p. ej. *Last 15 minutes*).
- **Error de conexión**: Kibana no alcanza Elasticsearch → revisar el servicio.

## Alertas

En **Stack Management → Rules and Alerts** se puede crear una regla, por ejemplo:
"más de 5 errores (`level:error`) en 1 hora" con notificación por email o webhook.

## Riesgos y mitigaciones

| Riesgo                                   | Impacto | Mitigación                                  |
| ---------------------------------------- | ------- | ------------------------------------------- |
| Timezone incorrecta en gráficos          | Medio   | Configurar la zona horaria en Kibana        |
| `level` no agregable (mapeado como text) | Medio   | Usar `.keyword` o mapping explícito         |
| Crecimiento ilimitado de índices         | Bajo    | ILM / borrado manual (`docker-compose down -v`) |

## Referencias

- [`database.md`](database.md) — campos disponibles para visualizar.
- [Kibana — Dashboards](https://www.elastic.co/guide/en/kibana/7.17/dashboard.html)
