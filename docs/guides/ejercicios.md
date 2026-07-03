# 🎯 Ejercicios Prácticos - Laboratorio ELK Stack

## 📚 Objetivos de Aprendizaje

Al completar estos ejercicios, serás capaz de:

- Configurar y desplegar un stack ELK completo
- Procesar y enriquecer logs con Logstash
- Crear visualizaciones y dashboards en Kibana
- Configurar alertas y monitoreo
- Analizar logs en tiempo real
- Implementar buenas prácticas de logging

## 🚀 Ejercicios Básicos

### Ejercicio 1: Configuración Inicial

**Objetivo**: Familiarizarse con la arquitectura del stack ELK

**Tareas**:

1. Levantar el stack completo con `docker-compose up -d`
2. Verificar que todos los servicios estén funcionando con `./check-services.sh`
3. Acceder a Kibana en http://localhost:5601
4. Crear un index pattern para `app-logs-*`
5. Verificar que el time field sea `@timestamp`

**Preguntas de reflexión**:

- ¿Por qué es importante usar un formato de timestamp consistente?
- ¿Qué ventajas tiene usar índices con rotación diaria?

### Ejercicio 2: Generación de Logs

**Objetivo**: Entender cómo se generan y estructuran los logs

**Tareas**:

1. Ejecutar `./simulate-traffic.sh` para generar tráfico
2. Examinar el archivo `logs/app.log` para ver el formato JSON
3. Hacer requests manuales a diferentes endpoints:
   ```bash
   curl http://localhost:5001/
   curl http://localhost:5001/error
   curl http://localhost:5001/logs/warn
   ```
4. Verificar que los logs aparezcan en Elasticsearch:
   ```bash
   curl "http://localhost:9200/app-logs-*/_search?pretty"
   ```

**Preguntas de reflexión**:

- ¿Qué campos son más importantes para el análisis de logs?
- ¿Cómo podrías mejorar la estructura de los logs?

### Ejercicio 3: Visualizaciones Básicas

**Objetivo**: Crear visualizaciones fundamentales en Kibana

**Tareas**:

1. Crear un gráfico de torta mostrando la distribución de logs por nivel
2. Crear un histograma temporal de logs por endpoint
3. Crear una tabla con los endpoints más visitados
4. Crear un dashboard combinando estas visualizaciones

**Configuración sugerida**:

- **Gráfico de torta**: Count por `level`
- **Histograma**: Date Histogram de `@timestamp` con Split Series por `path`
- **Tabla**: Terms aggregation de `path` con Count

## 🔧 Ejercicios Intermedios

### Ejercicio 4: Análisis de Errores

**Objetivo**: Implementar monitoreo específico de errores

**Tareas**:

1. Crear una visualización de línea temporal mostrando errores por hora
2. Configurar un filtro para mostrar solo logs de nivel "error"
3. Crear una alerta que se active cuando hay más de 3 errores en 30 minutos
4. Analizar patrones en los errores (endpoints, horarios, etc.)

**Consulta de ejemplo**:

```
level:error AND @timestamp:[now-1h TO now]
```

### Ejercicio 5: Análisis de Performance

**Objetivo**: Monitorear la performance de la aplicación

**Tareas**:

1. Crear una visualización de latencia promedio por endpoint
2. Identificar endpoints con mayor latencia
3. Crear una alerta para latencia alta (>500ms)
4. Analizar correlación entre carga y latencia

**Métricas a analizar**:

- Duración promedio por endpoint
- Picos de latencia
- Distribución de códigos de respuesta

### Ejercicio 6: Enriquecimiento de Logs

**Objetivo**: Mejorar el procesamiento de logs con Logstash

**Tareas**:

1. Modificar el pipeline de Logstash para agregar campos adicionales:
   - Día de la semana
   - Hora del día (mañana/tarde/noche)
   - Tipo de request (API/Web)
2. Crear visualizaciones usando estos nuevos campos
3. Analizar patrones de uso por hora del día

**Campos sugeridos**:

```ruby
# En el filtro de Logstash
date {
  match => [ "@timestamp", "ISO8601" ]
  target => "parsed_timestamp"
}

mutate {
  add_field => {
    "day_of_week" => "%{parsed_timestamp[day_of_week]}"
    "hour_of_day" => "%{parsed_timestamp[hour]}"
  }
}
```

## 🎯 Ejercicios Avanzados

### Ejercicio 7: Alertas Inteligentes

**Objetivo**: Implementar un sistema de alertas sofisticado

**Tareas**:

1. Crear alertas basadas en múltiples condiciones:
   - Error rate > 5% en 10 minutos
   - Sin logs por más de 2 minutos
   - Latencia p95 > 1 segundo
2. Configurar diferentes canales de notificación
3. Implementar escalado de alertas (warning → critical)

### Ejercicio 8: Análisis de Usuarios

**Objetivo**: Implementar análisis de comportamiento de usuarios

**Tareas**:

1. Crear visualizaciones de:
   - IPs más activas
   - User agents más comunes
   - Patrones de navegación
2. Identificar comportamiento anómalo
3. Crear alertas para actividad sospechosa

### Ejercicio 9: Optimización de Performance

**Objetivo**: Optimizar el rendimiento del stack ELK

**Tareas**:

1. Analizar el uso de recursos de cada componente
2. Optimizar configuración de Elasticsearch:
   - Ajustar número de shards
   - Configurar refresh interval
   - Optimizar mappings
3. Optimizar pipeline de Logstash:
   - Reducir procesamiento innecesario
   - Implementar filtros eficientes
4. Medir impacto de las optimizaciones

## 🔬 Ejercicios de Investigación

### Ejercicio 10: Escalabilidad

**Objetivo**: Entender cómo escalar el stack ELK

**Tareas**:

1. Investigar configuración multi-node de Elasticsearch
2. Implementar Logstash con múltiples workers
3. Configurar Kibana con load balancing
4. Medir performance con diferentes configuraciones

### Ejercicio 11: Seguridad

**Objetivo**: Implementar seguridad en el stack ELK

**Tareas**:

1. Configurar autenticación en Elasticsearch
2. Implementar SSL/TLS entre componentes
3. Configurar roles y permisos en Kibana
4. Implementar audit logging

### Ejercicio 12: Integración con Otros Sistemas

**Objetivo**: Conectar ELK con otros sistemas de monitoreo

**Tareas**:

1. Integrar con sistemas de métricas (Prometheus, Grafana)
2. Conectar con sistemas de tickets (Jira, ServiceNow)
3. Implementar webhooks para notificaciones
4. Crear APIs para consultas programáticas

## 📊 Métricas de Evaluación

### Criterios de Evaluación

- **Funcionalidad**: ¿El stack funciona correctamente?
- **Visualización**: ¿Las visualizaciones son útiles y claras?
- **Alertas**: ¿Las alertas son apropiadas y efectivas?
- **Performance**: ¿El sistema es eficiente?
- **Documentación**: ¿El código está bien documentado?

### Checklist de Completitud

- [ ] Stack ELK funcionando correctamente
- [ ] Logs siendo procesados y indexados
- [ ] Dashboard con visualizaciones útiles
- [ ] Alertas configuradas y funcionando
- [ ] Análisis de performance implementado
- [ ] Documentación completa del setup

## 🎓 Recursos Adicionales

### Documentación

- [Elasticsearch Reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Logstash Reference](https://www.elastic.co/guide/en/logstash/current/index.html)
- [Kibana User Guide](https://www.elastic.co/guide/en/kibana/current/index.html)

### Herramientas Útiles

- **Elasticsearch Head**: Plugin para administrar ES
- **Kibana Dev Tools**: Para consultas directas a ES
- **Logstash Config Validator**: Para validar configuración

### Comunidad

- [Elastic Community](https://discuss.elastic.co/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/elasticsearch)
- [GitHub Issues](https://github.com/elastic/elasticsearch/issues)

---

**¡Felicitaciones por completar el laboratorio ELK Stack! 🎉**

Recuerda que el aprendizaje continuo es clave en el mundo de la observabilidad y el monitoreo.
