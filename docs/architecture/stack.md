# Stack Tecnológico

> Fuente de verdad de las tecnologías y versiones del proyecto.
> **Última actualización**: 2026-07-02

## Aplicación

| Categoría | Tecnología | Versión   | Por qué                                                     |
| --------- | ---------- | --------- | ----------------------------------------------------------- |
| Runtime   | Node.js    | 18-alpine | LTS ligero, ideal para una API mínima de demostración       |
| Framework | Express    | ^4.18.2   | Servidor HTTP minimalista para exponer los endpoints del lab |
| Logging   | Winston    | ^3.11.0   | Logs estructurados en JSON, fáciles de parsear por Logstash  |
| Dev       | nodemon    | ^3.0.1    | Recarga en caliente durante el desarrollo local             |

## Stack de observabilidad (ELK)

| Componente     | Tecnología    | Versión | Por qué                                                    |
| -------------- | ------------- | ------- | ---------------------------------------------------------- |
| Almacenamiento | Elasticsearch | 7.17.0  | Motor de búsqueda/almacenamiento de logs; modo single-node |
| Procesamiento  | Logstash      | 7.17.0  | Pipeline de ingesta, parseo y enriquecimiento de logs      |
| Visualización  | Kibana        | 7.17.0  | Dashboards, Discover y alertas sobre los índices de logs   |

> Las tres piezas ELK se fijan a la **misma versión (7.17.0)** para garantizar
> compatibilidad entre ellas.

## DevOps & Herramientas

| Categoría    | Tecnología                                                          |
| ------------ | ------------------------------------------------------------------ |
| Contenedores | Docker                                                             |
| Orquestación | Docker Compose                                                     |
| CI           | GitHub Actions (`.github/workflows/ci.yml`)                        |
| Scripts      | Bash (`quick-start.sh`, `check-services.sh`, `simulate-traffic.sh`) |

## Justificación de elecciones

| Tecnología elegida     | Alternativa descartada            | Razón                                                      |
| ---------------------- | --------------------------------- | ---------------------------------------------------------- |
| ELK 7.17.0 single-node | Clúster multi-nodo / OpenSearch   | Suficiente para un laboratorio local; menor consumo de RAM |
| Winston (JSON)         | `console.log` plano               | Logs estructurados que Logstash parsea sin grok complejo   |
| Logstash               | Envío directo app → Elasticsearch | El objetivo pedagógico es mostrar el pipeline de ingesta   |
| Docker Compose         | Kubernetes                        | Complejidad innecesaria para un lab de una sola máquina    |

## Versiones mínimas soportadas

- Node.js >= 18
- Docker >= 20.10 y Docker Compose v2
- Elasticsearch / Logstash / Kibana = 7.17.0
- RAM disponible >= 4 GB (Elasticsearch reserva 512 MB de heap)
