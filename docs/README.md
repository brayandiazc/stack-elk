# Documentación de Laboratorio ELK Stack

Mapa de la documentación del proyecto. Empieza por aquí para saber qué documento
responde cada pregunta.

| Documento                                                      | Pregunta que responde                | Cuándo leerlo                    |
| -------------------------------------------------------------- | ------------------------------------ | -------------------------------- |
| [`architecture/architecture.md`](architecture/architecture.md) | ¿Cómo está construido el sistema?    | Al entender el panorama general  |
| [`architecture/stack.md`](architecture/stack.md)               | ¿Con qué tecnologías y versiones?    | Al configurar el entorno         |
| [`architecture/database.md`](architecture/database.md)         | ¿Qué esquema tienen los logs?        | Al analizar datos en Kibana      |
| [`architecture/auth.md`](architecture/auth.md)                 | ¿Cómo se maneja la seguridad?        | Antes de exponer el stack        |
| [`architecture/api.md`](architecture/api.md)                   | ¿Qué endpoints expone la app?        | Al generar tráfico / logs        |
| [`architecture/design.md`](architecture/design.md)             | ¿Cómo se visualiza en Kibana?        | Al crear dashboards y alertas    |
| [`product/business-model.md`](product/business-model.md)       | ¿Por qué existe y a quién sirve?     | Para entender el propósito       |
| [`product/roadmap.md`](product/roadmap.md)                     | ¿Hacia dónde va?                     | Para conocer prioridades         |
| [`decisions/`](decisions/README.md)                            | ¿Por qué tomamos cada decisión?      | Antes de re-debatir algo         |
| [`conventions/`](conventions/README.md)                        | ¿Cómo trabajamos en este repo?       | Antes de escribir código         |
| [`guides/`](guides/README.md)                                  | ¿Cómo lo uso paso a paso?            | Al empezar a usar el laboratorio |
| [`glossary.md`](glossary.md)                                   | ¿Qué significa cada término?         | Ante vocabulario desconocido     |

## Sobre la distinción `architecture/` vs `conventions/`

- **`architecture/`** describe **este** proyecto en concreto (su pipeline, su
  esquema de logs, su postura de seguridad).
- **`conventions/`** describe **reglas reusables** de cómo trabajamos
  (cómo testeamos, cómo desplegamos, cómo manejamos secretos) — transversales.

## Cómo mantener esta documentación

- Actualiza la línea **"Última actualización"** al editar un documento.
- Registra las decisiones relevantes como [ADRs](decisions/README.md).
- Mantén este índice al día si agregas o quitas documentos.
