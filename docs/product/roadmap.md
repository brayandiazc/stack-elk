# Roadmap — Laboratorio ELK Stack

> Estado y dirección del laboratorio. Documento vivo.
> **Última actualización**: 2026-07-02

## Leyenda

- ✅ Hecho
- 🚧 En curso
- 📋 Planificado
- ⏸️ Diferido

## Visión

Ser el laboratorio de referencia, reproducible en minutos, para aprender el flujo
completo del stack ELK con una aplicación que genera logs realistas.

## Estado actual

- ✅ App Node.js con endpoints que generan logs JSON estructurados.
- ✅ Pipeline de Logstash con parseo, enriquecimiento y tags.
- ✅ Elasticsearch + Kibana orquestados con Docker Compose.
- ✅ Scripts de arranque, verificación y simulación de tráfico.
- ✅ Documentación y gobernanza basadas en `project-starter-template-es`.

## Próximos pasos

### v1.1 — Experiencia de análisis

- 📋 Dashboards de Kibana importables por defecto (saved objects).
- 📋 Documentar la importación de `kibana-setup.json` / `kibana-alerts.json`.
- 📋 Añadir ejemplos de consultas en Dev Tools.

### v1.2 — Robustez del lab

- 📋 Healthchecks en `docker-compose.yml` con `depends_on: condition`.
- 📋 Mapping explícito del índice (`level` como keyword) para agregaciones.
- 📋 Tests de humo automatizados en CI (levantar stack y verificar `/health`).

### v2.0 — Seguridad y retención (avanzado)

- 📋 Variante con `xpack.security` habilitado y TLS.
- 📋 Index Lifecycle Management (ILM) para expirar índices antiguos.
- ⏸️ Migración opcional a la versión 8.x del stack.

## Backlog / ideas sin agendar

- Añadir Filebeat como alternativa al `file input` de Logstash.
- Métricas de la app (no solo logs) con Metricbeat.
- Versión en inglés de la documentación.

## Fuera de alcance

- Despliegue en producción / multi-nodo con alta disponibilidad.
- Orquestación con Kubernetes.

## Cómo se actualiza este documento

- Revisar al cerrar cada versión/fase.
- Las decisiones que cambian el rumbo se registran como ADRs en [`../decisions/`](../decisions/README.md).
