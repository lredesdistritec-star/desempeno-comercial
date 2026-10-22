DISTRITEC | DESEMPEÑO COMERCIAL
README DEL PROYECTO — V3.7.2 (EFICIENCIA DE PAUTA)
Fecha: 22 de octubre de 2026

1. PROPÓSITO

Convertir los reportes diarios de Redes y los resultados de Marketing en información clara para la toma de decisiones de Gerencia. La plataforma busca reducir la dependencia de informes dispersos por WhatsApp, visualizar el avance comercial y analizar la calidad de los contactos, no solo su cantidad.

2. TRES PREGUNTAS FUNDAMENTALES

1) ¿CUÁNTO ESTÁ INVIRTIENDO MARKETING?
   Registrar inversión publicitaria y cantidad de leads por campaña y por mes. Calcular el costo por lead (CPL) para dimensionar el costo de adquisición de contactos.

2) ¿QUÉ CALIDAD TIENEN LOS CONTACTOS QUE RECIBE REDES?
   Separar los leads recibidos de las conversaciones efectivas. Distinguir contactos informativos, sin interacción y accidentales/no válidos. Esto permite interpretar el esfuerzo comercial con mayor justicia y detectar oportunidades de mejora en la captación y gestión.

3) ¿CUÁNTO DE ESA GESTIÓN TERMINA EN OPORTUNIDADES Y VENTAS?
   Relacionar, cuando exista atribución verificable, las conversaciones y ventas con una campaña. Examinar estudios, aprobaciones y ventas en los reportes comerciales. Diferenciar volumen, conversión y resultado económico.

OBJETIVO CENTRAL
No medir el éxito publicitario únicamente por la cantidad de leads, sino comprender cuánto se invierte, qué proporción de contactos genera conversaciones reales y qué resultados comerciales se obtienen.

3. INTERPRETACIÓN DE INDICADORES

- Leads: contactos registrados; no equivalen automáticamente a clientes interesados.
- Conversaciones efectivas: contactos que sí generan una interacción comercial real, según la clasificación diligenciada por Redes.
- Tasa de conversación efectiva: conversaciones efectivas / leads clasificados x 100.
- CPL: inversión publicitaria / leads atribuidos a la campaña.
- Costo por conversación atribuible: inversión / conversaciones atribuibles, solo cuando ese dato es confiable.
- Costo por venta atribuible: inversión / ventas atribuibles, cuando exista una asociación válida con la campaña.
- Cumplimiento comercial: ventas en COP / meta del asesor x 100.

IMPORTANTE: costo por venta NO equivale a rentabilidad o ROI. Para calcular rentabilidad se requieren al menos márgenes y costos adicionales.

4. FUNCIONES PRINCIPALES DE LA V3.7.2

- Reporte diario de los asesores, con clasificación de leads y conversaciones efectivas.
- Resumen con indicadores de actividad, conversión y calidad de leads.
- Historial para consultar los reportes, incluidos los datos de calidad cuando existen.
- Equipo y metas: rankings, metas editables y evolución comercial.
- Eficiencia de pauta: sección de Admin para registrar campaña, mes, inversión, leads de Marketing y, opcionalmente, conversaciones y ventas atribuibles.
- Importación y exportación de reportes comerciales en CSV según la funcionalidad disponible.

5. REGLAS PARA TOMAR DECISIONES

- No asumir que todos los leads son oportunidades de compra.
- No atribuir automáticamente resultados de Redes a una campaña de Marketing.
- Comparar periodos equivalentes y señalar meses parciales cuando corresponda.
- No tomar un indicador aislado como explicación de bajo desempeño: considerar calidad de leads, respuesta, horarios, aprobación financiera, inventario y cierre.
- Usar las métricas para mejorar la pauta y el proceso comercial, no para buscar culpables.

6. LIMITACIONES DE LA VERSIÓN ACTUAL

- Es una demo frontend con almacenamiento local del navegador: los dispositivos no están sincronizados.
- Los reportes comerciales usan la clave local 'distritec-performance-v3-demo'.
- Las campañas de Marketing se almacenan separadamente en 'distritec-marketing-v372'.
- El panel de pauta muestra los leads clasificados de Redes como referencia paralela; no los vincula automáticamente con campañas.
- Los registros comerciales anteriores sin clasificación de leads permanecen sin reinterpretar; ausencia de clasificación no significa cero leads.
- Las campañas de pauta NO se incluyen en el CSV de exportación de reportes comerciales; se necesita un respaldo separado para esos datos.
- La autenticación de la demo no reemplaza un sistema de usuarios y permisos de servidor.

7. ESTRUCTURA GENERAL

index.html
assets/css/    Estilos generales y de los módulos
assets/js/     Lógica de reportes, metas, tendencias, calidad de leads y pauta
assets/        Logos del proyecto

Mantener esta estructura y sus rutas al publicar o trasladar la aplicación.

8. RECOMENDACIONES PARA PRESENTAR A MARKETING Y GERENCIA

- Comenzar por las tres preguntas fundamentales.
- Mostrar un ejemplo de campaña con inversión, leads, CPL y atribución disponible.
- Revisar después los leads clasificados por Redes y las conversaciones efectivas.
- Explicar con transparencia qué cifras están vinculadas a campañas y cuáles son solo contexto del mismo mes.
- Recoger las decisiones y necesidades prioritarias antes de añadir más campos al reporte diario.

9. CUIDADO DE DATOS Y SIGUIENTES PASOS

Antes de actualizar o publicar, respaldar los reportes comerciales y las campañas almacenadas en el navegador. Probar acceso Admin/asesor, registro diario, historial, rankings y panel de pauta. A futuro, priorizar una base de datos centralizada y una atribución verificable por campaña, sin sobrecargar el trabajo de los asesores.

VISIÓN DEL PROYECTO
DISTRITEC: de los reportes dispersos a las decisiones comerciales basadas en información clara, comparable y útil.
