# CÓDIGO AZUL: BATALLA DE HOSPITALES

Videojuego competitivo de comunicación médico-paciente: 20 preguntas, un celular por mesa, respuestas simultáneas y ranking en vivo.

## Publicación sin programar

**Importante:** GitHub almacena el código, pero GitHub Pages NO ejecuta este servidor Node.js con Socket.IO. Se necesita un hosting como Render.

1. En GitHub crea un repositorio nuevo, por ejemplo `codigo-azul`.
2. Descomprime el ZIP y en el repositorio selecciona **Add file → Upload files**. Arrastra **todos los archivos y la carpeta `public`**, no el ZIP. Los archivos `server.js`, `package.json` y `render.yaml` deben quedar en la raíz del repositorio. Haz clic en **Commit changes**.
3. En https://dashboard.render.com/ selecciona **New → Blueprint** y conecta el repositorio de GitHub.
4. Render detectará `render.yaml`. Revisa la configuración y confirma **Deploy**. Si el plan gratuito no está disponible, revisa los planes ofrecidos antes de aceptar cualquier cargo.
5. Cuando Render indique que está activo, abre la URL `https://...onrender.com` desde tu computadora y desde dos celulares para probarlo.
6. El anfitrión crea la sala y proyecta el código. Cada mesa entra con su celular y se registra. Se requieren al menos dos mesas.

**Advertencias:** El servicio gratuito puede tardar en despertar tras inactividad. Las salas se pierden si el servidor se reinicia o el anfitrión se desconecta. Prueba todo antes de exponer.

## Ejecutar en computadora

Con Node.js 18 o superior: `npm install` y `npm start`; luego visita `http://localhost:3000`.
