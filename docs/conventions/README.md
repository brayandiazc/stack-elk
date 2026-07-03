# Convenciones

Esta carpeta documenta **cómo trabajamos** en el Laboratorio ELK Stack: reglas y
estándares transversales, independientes de cualquier feature concreta.

> Diferencia con `docs/architecture/`: aquí van las **reglas** ("cómo desplegamos");
> en `architecture/` va **este** proyecto en concreto ("cómo está construido").

## Convenciones incluidas

| Convención                               | Tema                              |
| ---------------------------------------- | --------------------------------- |
| [deploy.md](deploy.md)                   | Levantar y operar el stack        |
| [secrets.md](secrets.md)                 | Manejo de secretos y credenciales |
| [quality-tooling.md](quality-tooling.md) | Formato, linters y calidad        |
| [testing.md](testing.md)                 | Estrategia de pruebas             |

## Agregar una convención

Copia [`_template.md`](_template.md), renómbralo en `kebab-case` y documenta el
nuevo tema. Añádelo a la tabla de arriba.

> Se eliminaron de la plantilla las convenciones que no aplican a este laboratorio
> (autenticación de app, i18n, SEO, emails transaccionales, sistema de diseño,
> branding, vistas/layouts y modelado de base de datos relacional).
