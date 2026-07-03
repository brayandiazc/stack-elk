# Glosario

Vocabulario compartido del laboratorio. Definiciones cortas y sin ambigüedad para
que todos usen los términos de la misma forma.

| Término            | Definición                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Dashboard          | Colección de visualizaciones de Kibana en una sola vista.                                   |
| Discover           | Vista de Kibana para explorar documentos crudos de un índice.                               |
| Elasticsearch      | Motor de búsqueda y almacenamiento distribuido donde se indexan los logs.                   |
| ELK                | Acrónimo de Elasticsearch + Logstash + Kibana.                                              |
| Enriquecimiento    | Agregar campos derivados o constantes a un log en el pipeline (p. ej. `service`, `tags`).   |
| grok               | Filtro de Logstash que extrae campos de texto con patrones (aquí extrae `endpoint`).        |
| Index pattern      | Definición en Kibana que agrupa índices por un patrón (`app-logs-*`) para consultarlos.     |
| Índice             | Colección de documentos en Elasticsearch; aquí uno por día: `app-logs-YYYY.MM.dd`.          |
| Ingesta            | Proceso de leer los logs de la app y llevarlos a Elasticsearch vía Logstash.                |
| Kibana             | Interfaz web para explorar, visualizar y alertar sobre los datos de Elasticsearch.          |
| Logstash           | Pipeline que lee, parsea y enriquece los logs antes de indexarlos.                          |
| Log estructurado   | Log emitido como JSON con campos discretos, en vez de texto plano.                          |
| Pipeline           | Definición `input → filter → output` de Logstash (`logstash/pipeline/logstash.conf`).       |
| Single-node        | Configuración de Elasticsearch con un solo nodo, usada para desarrollo local.               |
| `@timestamp`       | Campo de tiempo canónico de Elasticsearch; aquí derivado del `timestamp` de la app.         |
| Winston            | Librería de logging de Node.js usada por la app para emitir logs JSON.                       |
| xpack.security     | Módulo de seguridad de Elastic; deshabilitado en este laboratorio.                          |

> Convención: mantén los términos ordenados alfabéticamente.
