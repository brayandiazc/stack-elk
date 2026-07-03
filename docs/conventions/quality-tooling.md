# Convenciones de calidad y tooling

> Formato, estilo y checks de calidad del Laboratorio ELK Stack.
> **Última actualización**: 2026-07-02

## Stack

- **Estilo de editor**: [`.editorconfig`](../../.editorconfig) (UTF-8, LF, indent 2).
- **Formato de Markdown**: `.github/scripts/format-markdown.sh` (si tienes
  `prettier`/`markdownlint` disponibles).
- **Auditoría de dependencias**: `npm audit`.
- **CI**: `.github/workflows/ci.yml` valida la app y `docker-compose config`.

## Reglas

- Sigue el estilo definido por `.editorconfig`: UTF-8, finales de línea LF,
  indentación de 2 espacios, líneas de máximo 100 caracteres.
- El código de la app usa las convenciones idiomáticas de JavaScript (`camelCase`).
- Los commits siguen [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)
  (ver [CONTRIBUTING.md](../../CONTRIBUTING.md)).
- La CI debe pasar antes de mergear a `main`/`develop`.

## Comandos útiles

```bash
# Verificar sintaxis de la app
node --check app.js

# Validar la definición de docker-compose
docker compose config

# Auditar dependencias de la app
npm audit

# Formatear Markdown (si hay herramientas instaladas)
bash .github/scripts/format-markdown.sh
```

## Referencias

- [CONTRIBUTING.md](../../CONTRIBUTING.md) — flujo de trabajo y estándares.
- [EditorConfig](https://editorconfig.org).
