# Código Azul: Batalla de Hospitales V2

Actualización del juego multijugador con fondo médico, avatares seleccionables, 15 segundos por pregunta, dificultad mezclada, 100/200/300 puntos, bonificación por responder en los primeros 5 segundos y ranking en vivo.

## Actualizar el mismo juego en Render

1. Conserva tu repositorio de GitHub actual y el servicio Render existente.
2. En GitHub, reemplaza `server.js`, `README.md` y `public/index.html` con los de este ZIP. Sube también `public/hospital.png`. `questions.js`, `package.json` y `render.yaml` pueden permanecer como están.
3. Comprueba que `index.html` y `hospital.png` estén dentro de `public/`.
4. Confirma los cambios con **Commit changes**. Render desplegará automáticamente si Auto-Deploy está activo; de lo contrario, utiliza Manual Deploy → Deploy latest commit.
5. Espera al estado Live y prueba desde computadora y al menos dos celulares.

## Reglas

- 20 preguntas. Las primeras 17 tienen valores intercalados de 100 y 200 puntos; las últimas tres valen 300.
- Se dispone de 15 segundos por pregunta. Respuestas correctas recibidas durante los primeros 5 segundos obtienen el valor completo. Después obtienen el 80%. Respuestas incorrectas valen 0.
- Si todas las mesas conectadas responden, se muestra inmediatamente la solución y la clasificación.
- El anfitrión controla cuándo comienza la siguiente pregunta para que todos vean el ranking.
- El ranking se calcula en el servidor para evitar que un celular manipule sus puntos.

## Limitaciones

- Las salas están en memoria: un reinicio del servidor o desconexión del anfitrión cierra la partida.
- Si un equipo se desconecta durante la partida, queda en la clasificación y no puede reconectarse a la misma sala en esta versión.
- El fondo es una ilustración de hospital incluida localmente, no una fotografía real.
