# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [1.0.0] - 2026-07-02

### Added

- Estructura de documentación y gobernanza basada en `project-starter-template-es`:
  `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`,
  `.editorconfig` y `.env.example`.
- Carpeta `docs/` con arquitectura (stack, arquitectura, API, modelo de datos,
  seguridad, diseño), producto (modelo de negocio, roadmap), decisiones (ADRs),
  convenciones y glosario.
- Configuración de `.github/`: plantillas de issues y PR, `dependabot.yml`,
  `labeler.yml`, workflow de CI y scripts de labels.
- Guías educativas reubicadas en `docs/guides/` (inicio rápido, guía paso a paso,
  ejercicios prácticos).

### Changed

- `README.md` reescrito siguiendo la estructura de la plantilla, conservando el
  contenido del laboratorio ELK.
- `LICENSE` actualizada con el titular del copyright.

## [0.1.0] - 2024

### Added

- Versión inicial del laboratorio ELK Stack: aplicación Node.js con logging
  estructurado (Winston), stack Elasticsearch + Logstash + Kibana orquestado con
  Docker Compose y scripts de arranque, verificación y simulación de tráfico.

<!--
Enlaces de comparación entre versiones:
[Unreleased]: https://github.com/brayandiazc/stack-elk/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/brayandiazc/stack-elk/releases/tag/v1.0.0
[0.1.0]: https://github.com/brayandiazc/stack-elk/releases/tag/v0.1.0
-->
