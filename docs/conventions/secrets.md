# Convenciones de secretos y credenciales

> Cómo gestionamos secretos en el Laboratorio ELK Stack.
> **Última actualización**: 2026-07-02

## Filosofía

- Los secretos **nunca** se commitean en texto plano.
- Separación clara entre **configuración** (no sensible) y **secretos** (sensible).

## Contexto de este laboratorio

Por diseño, el lab corre **sin credenciales** (Elasticsearch y Kibana sin
seguridad). Aun así, aplican las siguientes reglas para cuando se endurezca el
entorno o se conecten servicios externos.

## Dónde vive cada cosa

| Tipo                         | Dónde                                         |
| ---------------------------- | --------------------------------------------- |
| Configuración local          | `.env` (nunca versionado)                     |
| Contrato de variables        | `.env.example` (versionado, sin valores)      |
| Secretos de CI/CD            | GitHub Actions Secrets                        |

## Reglas

- El archivo `.env` está en `.gitignore`; solo se versiona `.env.example`.
- Comparte secretos con nuevos colaboradores **fuera de banda** (nunca por git,
  email plano ni chat público).
- Si habilitas la seguridad de Elastic, **no** hardcodees las contraseñas en
  `docker-compose.yml`: pásalas por variables de entorno / secretos.
- Rota credenciales periódicamente y de inmediato ante sospecha de fuga.
- Si un secreto se commitea por error: **rota el secreto primero**, luego limpia la
  historia (asume que ya está comprometido).

## Ejemplo

```bash
cp .env.example .env
# Completar valores reales (que nunca se suben)
```

## Referencias

- [SECURITY.md](../../SECURITY.md) — política de seguridad.
- [`../architecture/auth.md`](../architecture/auth.md) — postura de seguridad del lab.
