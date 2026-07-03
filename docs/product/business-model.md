# Laboratorio ELK Stack — Propósito y Valor

> Este proyecto no es un producto comercial sino un **recurso educativo**. En vez
> de un Lean Canvas de negocio, este documento describe por qué existe el
> laboratorio, a quién sirve y qué valor entrega.
>
> **Última actualización**: 2026-07-02

## 1. Problema

- Aprender el stack ELK "en seco" (solo leyendo documentación) es difícil: hay
  muchas piezas que deben encajar (ingesta, parseo, indexado, visualización).
- Montar un entorno funcional desde cero consume tiempo y frustra a quien empieza.
- **Alternativas actuales**: tutoriales dispersos, imágenes sueltas de Docker sin
  una app que genere logs realistas, o servicios gestionados que ocultan el flujo.

## 2. Para quién es

| Segmento                    | Descripción                                             |
| --------------------------- | ------------------------------------------------------- |
| Estudiantes de DevOps/SRE   | Quieren entender observabilidad y centralización de logs |
| Desarrolladores backend     | Buscan practicar logging estructurado y su análisis     |
| Instructores / bootcamps    | Necesitan un lab reproducible para clases               |

- **Aprendiz ideal**: alguien con nociones básicas de Docker y línea de comandos
  que quiere ver el pipeline ELK completo funcionando en minutos.

## 3. Propuesta de valor

- Un laboratorio **listo para levantar con un comando** que muestra el flujo ELK
  de punta a punta con una app real que emite logs variados (info, warn, error).
- **Concepto de alto nivel**: "un mini entorno de observabilidad para aprender
  haciendo".

## 4. Qué entrega (capacidades)

| Módulo / Capacidad          | Qué resuelve                                        |
| --------------------------- | --------------------------------------------------- |
| App Node.js con endpoints   | Genera logs realistas de distintos niveles          |
| Pipeline Logstash           | Enseña parseo y enriquecimiento de logs             |
| Elasticsearch + Kibana      | Enseña indexado, búsqueda y visualización           |
| Scripts (`quick-start`, etc.)| Reducen la fricción de arranque y verificación     |
| Ejercicios guiados          | Rutas de aprendizaje básica → avanzada              |

## 5. Cómo llega a la gente

- Repositorio público en GitHub, README y guías paso a paso.
- Uso en talleres, clases y autoestudio.

## 6. Métricas de éxito (educativas)

- Tiempo desde `git clone` hasta ver logs en Kibana (< 10 min es el objetivo).
- Ejercicios completados por el aprendiz.
- Reutilización del lab en cursos/talleres.

## 7. Costos

- Sin costo de licencias (todo el stack es open source / gratuito para uso local).
- Costo principal: **RAM** de la máquina (>= 4 GB recomendado).

## 8. Fuera de alcance

- No pretende ser un despliegue de producción ni cubrir alta disponibilidad,
  seguridad endurecida, ILM o multi-nodo (eso queda como ejercicios avanzados).

## Decisiones pendientes

- [ ] ¿Añadir una variante con seguridad de Elastic habilitada?
- [ ] ¿Incluir dashboards preconstruidos importables por defecto?
