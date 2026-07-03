# 🚀 Resumen Ejecutivo - Laboratorio ELK Stack

## ⚡ Inicio Rápido (5 minutos)

### 1. Verificar prerrequisitos

```bash
docker --version
docker-compose --version
```

### 2. Levantar el stack

```bash
./quick-start.sh
```

### 3. Verificar funcionamiento

```bash
./check-services.sh
```

### 4. Generar datos de prueba

```bash
./simulate-traffic.sh
```

### 5. Acceder a Kibana

- Abrir navegador: http://localhost:5601
- Crear index pattern: `app-logs-*`
- Ir a Discover para ver logs en tiempo real

## 📊 URLs de Acceso

| Servicio          | URL                   | Descripción                        |
| ----------------- | --------------------- | ---------------------------------- |
| **Aplicación**    | http://localhost:5001 | API Node.js que genera logs        |
| **Elasticsearch** | http://localhost:9200 | Motor de búsqueda y almacenamiento |
| **Kibana**        | http://localhost:5601 | Interfaz de visualización          |

## 🔧 Comandos Esenciales

### Verificar estado

```bash
./check-services.sh
```

### Generar tráfico

```bash
./simulate-traffic.sh
```

### Ver logs en tiempo real

```bash
docker-compose logs -f
```

### Detener servicios

```bash
docker-compose down
```

### Reiniciar todo

```bash
docker-compose down && docker-compose up -d
```

## 📈 Configuración de Kibana (Paso a Paso)

### 1. Crear Index Pattern

1. Abrir http://localhost:5601
2. Stack Management → Index Patterns
3. Create index pattern: `app-logs-*`
4. Time field: `@timestamp`

### 2. Crear Visualizaciones Básicas

1. **Gráfico de Torta**: Logs por nivel

   - Tipo: Pie Chart
   - Campo: level

2. **Histograma**: Logs por endpoint

   - Tipo: Vertical Bar
   - Eje X: @timestamp
   - Split Series: path

3. **Tabla**: Endpoints más visitados
   - Tipo: Data Table
   - Campo: path

### 3. Crear Dashboard

1. Dashboard → Create Dashboard
2. Agregar las 3 visualizaciones
3. Configurar auto-refresh: 5 segundos

## 🧪 Generación de Datos

### Simulación automática

```bash
./simulate-traffic.sh
```

### Simulación manual

```bash
curl http://localhost:5001/
curl http://localhost:5001/error
curl http://localhost:5001/logs/info
```

### Simulación intensiva

```bash
for i in {1..100}; do
  curl -s "http://localhost:5001/" > /dev/null &
  curl -s "http://localhost:5001/error" > /dev/null &
done
wait
```

## 🔍 Consultas Útiles en Kibana

### Filtros básicos

```
level:error                    # Solo errores
@timestamp:[now-1h TO now]     # Última hora
path:/error                    # Endpoint específico
level:error AND path:/error    # Combinación
```

### Análisis de patrones

```
# Errores por hora
level:error

# Endpoints más activos
path:*

# Logs de alta latencia
duration:>100ms
```

## 🚨 Troubleshooting Rápido

### Problema: Servicios no inician

```bash
docker-compose logs
docker-compose restart
```

### Problema: No aparecen datos en Kibana

```bash
curl "http://localhost:9200/app-logs-*/_count"
docker-compose logs logstash
```

### Problema: Kibana no carga

```bash
curl http://localhost:5601/api/status
docker-compose restart kibana
```

## 📚 Estructura del Proyecto

```
stack-elk/
├── app.js                    # Aplicación Node.js
├── package.json              # Dependencias
├── docker-compose.yml        # Orquestación de servicios
├── quick-start.sh           # Script de inicio automático
├── check-services.sh        # Verificación de estado
├── simulate-traffic.sh      # Generación de datos
├── README.md                # Documentación completa
├── GUIA-USO.md             # Guía paso a paso
├── EJERCICIOS.md           # Ejercicios prácticos
├── logstash/
│   ├── config/logstash.yml
│   └── pipeline/logstash.conf
└── logs/                    # Archivos de logs (ignorados en git)
```

## 🎯 Objetivos de Aprendizaje

### ✅ Conceptos Básicos

- Centralización de logs
- Procesamiento con Logstash
- Almacenamiento en Elasticsearch
- Visualización en Kibana

### ✅ Habilidades Prácticas

- Configuración de index patterns
- Creación de visualizaciones
- Análisis de datos en tiempo real
- Configuración de dashboards

### ✅ Buenas Prácticas

- Logs estructurados en JSON
- Índices con rotación diaria
- Monitoreo en tiempo real
- Alertas y notificaciones

## 🔄 Flujo de Datos

```
Node.js App → Logs JSON → Logstash → Elasticsearch → Kibana
     ↓              ↓           ↓           ↓           ↓
  Genera logs   logs/app.log  Procesa   Almacena   Visualiza
```

## 📊 Métricas del Stack

- **Aplicación**: Puerto 5001
- **Elasticsearch**: Puerto 9200
- **Kibana**: Puerto 5601
- **Logstash**: Puertos 5044, 9600
- **Memoria**: ~4GB recomendado
- **Almacenamiento**: ~2GB para datos de prueba

## 🎉 Resultado Final

Al completar esta guía tendrás:

- ✅ Stack ELK completamente funcional
- ✅ Dashboard con visualizaciones en tiempo real
- ✅ Datos de prueba generados automáticamente
- ✅ Conocimientos para análisis de logs
- ✅ Base para implementar en producción

---

**¡El laboratorio está listo para usar! 🚀**

Para más detalles, consulta `GUIA-USO.md` y `EJERCICIOS.md`.
