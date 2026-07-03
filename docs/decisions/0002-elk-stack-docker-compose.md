# 0002. Usar ELK 7.17 single-node con Docker Compose

- **Estado**: Aceptada
- **Fecha**: 2026-07-02
- **Decisores**: Brayan Díaz C

## Contexto y problema

El objetivo del proyecto es enseñar el flujo completo de centralización de logs
(ingesta → parseo → indexado → visualización) con la menor fricción posible y en
una sola máquina. Necesitábamos elegir el stack de observabilidad, su topología y
cómo orquestarlo.

## Opciones consideradas

- **ELK (Elasticsearch + Logstash + Kibana) 7.17 single-node con Docker Compose** —
  todo local, un contenedor por pieza.
- **Clúster multi-nodo** — más realista para producción, pero pesado en RAM y
  complejo para un laboratorio.
- **OpenSearch** — alternativa open source, pero menos material educativo de
  referencia y objetivo distinto al "ELK clásico".
- **Envío directo app → Elasticsearch** — sin Logstash; más simple pero oculta la
  etapa de pipeline que se quiere enseñar.

## Decisión

Elegimos **ELK 7.17.0 en modo single-node, orquestado con Docker Compose**, con
**Logstash** en medio leyendo un archivo de log compartido. La versión 7.17 se fija
igual en las tres piezas para garantizar compatibilidad, y se deshabilita
`xpack.security` para simplificar el acceso local.

## Consecuencias

**Positivas:**

- Arranque reproducible con un solo comando.
- Muestra explícitamente la etapa de pipeline (Logstash) que es clave pedagógicamente.
- Bajo consumo de recursos (un nodo, 512 MB de heap).

**Negativas / costos:**

- No representa una topología de producción (sin alta disponibilidad ni seguridad).
- Sin seguridad habilitada, no debe exponerse fuera de `localhost`.

**Neutras / a vigilar:**

- Migrar a 8.x o habilitar seguridad/ILM queda como ejercicios avanzados del roadmap.

## Referencias

- [`../architecture/stack.md`](../architecture/stack.md) — versiones del stack.
- [`../architecture/auth.md`](../architecture/auth.md) — postura de seguridad.
- [`../product/roadmap.md`](../product/roadmap.md) — mejoras planificadas.
