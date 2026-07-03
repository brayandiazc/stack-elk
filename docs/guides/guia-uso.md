# 📖 Guía Paso a Paso - Laboratorio ELK Stack

## 🎯 Objetivo

Esta guía te llevará desde cero hasta tener un stack ELK completamente funcional para análisis de logs en tiempo real.

## 📋 Prerrequisitos

- Docker y Docker Compose instalados
- Al menos 4GB de RAM disponible
- Puertos 5001, 9200, 5601 disponibles
- Terminal con acceso a comandos bash

## 🚀 Paso 1: Preparación del Entorno

### 1.1 Verificar Docker

```bash
# Verificar que Docker esté instalado
docker --version
docker-compose --version

# Si no está instalado, seguir las instrucciones en:
# https://docs.docker.com/get-docker/
```

### 1.2 Clonar o descargar el proyecto

```bash
# Si tienes el proyecto en tu máquina local
cd /ruta/a/tu/proyecto/stack-elk

# Verificar que todos los archivos estén presentes
ls -la
```

### 1.3 Verificar estructura del proyecto

```bash
# Deberías ver estos archivos principales:
# - docker-compose.yml
# - app.js
# - package.json
# - README.md
# - quick-start.sh
# - check-services.sh
# - simulate-traffic.sh
```

## 🚀 Paso 2: Inicio Rápido

### 2.1 Ejecutar script de inicio automático

```bash
# Dar permisos de ejecución (si no los tiene)
chmod +x *.sh

# Ejecutar inicio automático
./quick-start.sh
```

**¿Qué hace este script?**

- ✅ Verifica que Docker esté instalado
- ✅ Verifica que los puertos estén disponibles
- ✅ Crea directorios necesarios
- ✅ Levanta todos los servicios con Docker Compose
- ✅ Espera a que los servicios estén listos
- ✅ Verifica que todo funcione correctamente

### 2.2 Verificación manual (alternativa)

Si prefieres hacerlo paso a paso:

```bash
# 1. Crear directorio de logs
mkdir -p logs

# 2. Instalar dependencias de Node.js
npm install

# 3. Levantar servicios
docker-compose up -d

# 4. Verificar estado
./check-services.sh
```

## 🔍 Paso 3: Verificación de Servicios

### 3.1 Verificar que todos los servicios estén funcionando

```bash
./check-services.sh
```

**Resultado esperado:**

```
🎯 Servicios funcionando: 4/4
🎉 ¡Todo el stack ELK está funcionando correctamente!
```

### 3.2 Verificación manual de cada servicio

```bash
# Aplicación Node.js
curl http://localhost:5001/health

# Elasticsearch
curl http://localhost:9200/_cluster/health

# Kibana (verificar en navegador)
open http://localhost:5601
```

## 📊 Paso 4: Configuración de Kibana

### 4.1 Acceder a Kibana

1. Abrir navegador web
2. Ir a: http://localhost:5601
3. Esperar a que Kibana cargue completamente

### 4.2 Crear Index Pattern

1. En Kibana, ir a **Stack Management** (ícono de engranaje)
2. Seleccionar **Index Patterns**
3. Hacer clic en **Create index pattern**
4. En **Index pattern name** escribir: `app-logs-*`
5. Hacer clic en **Next step**
6. En **Time field** seleccionar: `@timestamp`
7. Hacer clic en **Create index pattern**

### 4.3 Verificar que el index pattern funcione

1. Ir a **Discover** (ícono de lupa)
2. Seleccionar el index pattern `app-logs-*`
3. Deberías ver logs apareciendo en tiempo real

## 🧪 Paso 5: Generación de Datos de Prueba

### 5.1 Simulación automática

```bash
# Ejecutar simulación completa
./simulate-traffic.sh
```

### 5.2 Simulación manual

```bash
# Generar algunos requests de prueba
curl http://localhost:5001/
curl http://localhost:5001/error
curl http://localhost:5001/logs/info
curl http://localhost:5001/logs/warn
```

### 5.3 Simulación intensiva

```bash
# Generar 50 requests rápidos
for i in {1..50}; do
  curl -s "http://localhost:5001/" > /dev/null &
  curl -s "http://localhost:5001/error" > /dev/null &
  curl -s "http://localhost:5001/logs/info" > /dev/null &
done
wait
echo "Simulación completada"
```

## 📈 Paso 6: Creación de Visualizaciones

### 6.1 Gráfico de Torta - Logs por Nivel

1. Ir a **Visualize Library**
2. Hacer clic en **Create visualization**
3. Seleccionar **Pie**
4. Seleccionar index pattern: `app-logs-*`
5. En **Buckets** → **Split Slices**:
   - Aggregation: Terms
   - Field: level
   - Size: 5
6. Hacer clic en **Save** y nombrar: "Logs por Nivel"

### 6.2 Histograma - Logs por Endpoint

1. Crear nueva visualización
2. Seleccionar **Vertical Bar**
3. En **Buckets** → **X-Axis**:
   - Aggregation: Date Histogram
   - Field: @timestamp
   - Interval: Auto
4. En **Buckets** → **Split Series**:
   - Aggregation: Terms
   - Field: path
   - Size: 10
5. Guardar como: "Logs por Endpoint"

### 6.3 Tabla - Endpoints Más Visitados

1. Crear nueva visualización
2. Seleccionar **Data Table**
3. En **Buckets** → **Split Rows**:
   - Aggregation: Terms
   - Field: path
   - Size: 10
   - Order By: Count
4. Guardar como: "Endpoints Más Visitados"

## 📊 Paso 7: Creación de Dashboard

### 7.1 Crear Dashboard

1. Ir a **Dashboard**
2. Hacer clic en **Create dashboard**
3. Hacer clic en **Add** para agregar visualizaciones
4. Agregar las 3 visualizaciones creadas anteriormente
5. Organizar el layout como desees
6. Guardar como: "ELK Lab Dashboard"

### 7.2 Configurar Auto-refresh

1. En el dashboard, hacer clic en **Auto-refresh**
2. Seleccionar intervalo: 5 seconds
3. Activar auto-refresh

## 🔍 Paso 8: Análisis de Datos

### 8.1 Consultas básicas en Discover

```bash
# Logs de error
level:error

# Logs de los últimos 15 minutos
@timestamp:[now-15m TO now]

# Endpoints específicos
path:/error

# Combinación de filtros
level:error AND path:/error
```

### 8.2 Análisis de patrones

1. En **Discover**, usar filtros para analizar:
   - Horarios de mayor actividad
   - Endpoints con más errores
   - Patrones de latencia

## 🚨 Paso 9: Configuración de Alertas (Opcional)

### 9.1 Crear alerta básica

1. Ir a **Stack Management** → **Rules and Alerts**
2. Crear nueva regla
3. Configurar para detectar errores
4. Configurar notificaciones

## 🛠️ Paso 10: Troubleshooting

### 10.1 Problemas comunes y soluciones

#### Servicios no inician

```bash
# Verificar logs
docker-compose logs

# Reiniciar servicios
docker-compose restart

# Reconstruir desde cero
docker-compose down
docker-compose up --build
```

#### No aparecen datos en Kibana

```bash
# Verificar que Elasticsearch tenga datos
curl "http://localhost:9200/app-logs-*/_count"

# Verificar que Logstash esté procesando
docker-compose logs logstash

# Verificar archivo de logs
tail -f logs/app.log
```

#### Kibana no carga

```bash
# Verificar que Kibana esté funcionando
curl http://localhost:5601/api/status

# Reiniciar Kibana
docker-compose restart kibana
```

## 📚 Paso 11: Ejercicios Prácticos

### 11.1 Ejercicios básicos

1. Crear visualización de errores por hora
2. Analizar latencia promedio por endpoint
3. Identificar patrones de uso

### 11.2 Ejercicios avanzados

1. Crear alertas personalizadas
2. Configurar filtros complejos
3. Analizar correlaciones entre eventos

## 🎯 Paso 12: Próximos Pasos

### 12.1 Explorar más funcionalidades

- Configurar índices con diferentes retenciones
- Implementar autenticación
- Conectar con otros sistemas de monitoreo

### 12.2 Recursos adicionales

- Documentación oficial de Elasticsearch
- Comunidad de usuarios
- Cursos de formación

## 🔧 Comandos Útiles de Referencia

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

### Limpiar todo

```bash
docker-compose down -v
rm -rf logs/*
```

---

## 🎉 ¡Felicidades!

Has completado la configuración y uso del laboratorio ELK Stack. Ahora tienes:

- ✅ Stack ELK completamente funcional
- ✅ Visualizaciones configuradas
- ✅ Dashboard operativo
- ✅ Datos en tiempo real
- ✅ Conocimientos para análisis de logs

**¡Disfruta explorando el poder del stack ELK! 🚀**
