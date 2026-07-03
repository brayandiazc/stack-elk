# Convenciones de testing

> Cómo verificamos el Laboratorio ELK Stack.
> **Última actualización**: 2026-07-02

## Estado actual

Este laboratorio **no incluye una suite de tests unitarios automatizados** todavía:
al ser un entorno educativo centrado en infraestructura, la verificación es
principalmente **funcional / de humo** sobre el stack en ejecución.

## Verificación funcional (smoke tests)

| Qué se verifica            | Cómo                                             |
| -------------------------- | ------------------------------------------------ |
| Servicios arriba y sanos   | `./check-services.sh`                            |
| App responde               | `curl http://localhost:5001/health`             |
| Elasticsearch sano         | `curl http://localhost:9200/_cluster/health`    |
| Logs fluyen a Kibana       | Generar tráfico y ver documentos en Discover     |

```bash
# Flujo completo de verificación manual
docker-compose up -d
./check-services.sh
./simulate-traffic.sh
# Abrir Kibana y confirmar que aparecen documentos en app-logs-*
```

## Reglas (para cuando se agreguen tests)

- Todo cambio funcional de la app se acompaña de una verificación reproducible.
- Estructura **Arrange-Act-Assert**; un test verifica una sola cosa.
- Los tests deben ser deterministas (sin dependencia de red o de orden).

## Roadmap de testing

- Añadir tests de humo automatizados en CI que levanten el stack y validen
  `/health` y la presencia de índices `app-logs-*` (ver [`../product/roadmap.md`](../product/roadmap.md)).

## Referencias

- [`deploy.md`](deploy.md) — verificación y operación del stack.
