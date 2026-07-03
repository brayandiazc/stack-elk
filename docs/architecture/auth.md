# Seguridad y Acceso

> Postura de seguridad del **Laboratorio ELK Stack**. Este proyecto es un entorno
> **educativo local**, por lo que corre deliberadamente sin autenticación. Este
> documento explica esa decisión y cómo endurecerlo. Para la política completa ver
> [SECURITY.md](../../SECURITY.md).
>
> **Última actualización**: 2026-07-02

## Visión general

- **Autenticación de la app**: ninguna. Los endpoints son públicos dentro del host.
- **Seguridad de Elasticsearch**: `xpack.security.enabled=false`.
- **Kibana**: sin login; acceso directo en `http://localhost:5601`.
- **Alcance**: solo `localhost` / red interna de Docker (`elk-network`).

## Por qué sin seguridad

El objetivo del laboratorio es enseñar el **flujo de logs** (ingesta → indexado →
visualización) con la menor fricción posible. Habilitar TLS, usuarios y roles
añade complejidad que distrae del objetivo pedagógico. **No exponer estos puertos
a Internet.**

## Superficie expuesta

| Puerto | Servicio      | Riesgo si se expone públicamente          |
| ------ | ------------- | ----------------------------------------- |
| 5001   | App Node.js   | Endpoints abiertos (incluye `/error`)     |
| 9200   | Elasticsearch | Lectura/escritura total sin credenciales  |
| 5601   | Kibana        | Acceso completo a los datos y a Dev Tools  |

## Cómo endurecerlo (ejercicio avanzado)

Para un entorno más realista:

1. **Habilitar seguridad de Elastic**: `xpack.security.enabled=true` y definir
   contraseñas (`elasticsearch-setup-passwords`).
2. **TLS** entre nodos y para las APIs HTTP.
3. **Usuarios y roles** en Kibana (RBAC), con un usuario de solo lectura para
   análisis.
4. **Reverse proxy** (nginx/Traefik) con autenticación delante de Kibana.
5. **No publicar** los puertos 9200/5601 fuera de la red de Docker.

## Referencias

- [SECURITY.md](../../SECURITY.md) — política de seguridad del repositorio.
- [`../conventions/secrets.md`](../conventions/secrets.md) — manejo de secretos.
- [Elastic — Configurar seguridad](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/secure-cluster.html)
