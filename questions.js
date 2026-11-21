// CÓDIGO AZUL V6: 20 preguntas revisadas. Últimas 3 son finales ×3.
export const questions = [
  {
    "difficulty": "Fácil",
    "level": "Inicio de consulta",
    "title": "Un paciente llega por primera vez a consulta. ¿Cuál apertura facilita una relación de confianza?",
    "options": [
      "Revisar el expediente y empezar con los antecedentes",
      "Solicitar los síntomas y explicar el plan al terminar",
      "Presentarse, confirmar su nombre y explicar el encuentro",
      "Pedir los estudios y dejar las preguntas para después"
    ],
    "correct": 2,
    "explanation": "Presentarse, identificar al paciente y explicar el propósito de la consulta establece el encuadre y favorece la confianza."
  },
  {
    "difficulty": "Media",
    "level": "Escucha activa",
    "title": "La paciente dice: «Me preocupa que el tratamiento afecte mi trabajo». ¿Qué respuesta permite comprender mejor su preocupación?",
    "options": [
      "«¿Qué parte de su trabajo le preocupa que cambie?»",
      "«El tratamiento es seguro y podrá seguir trabajando»",
      "«Primero revisemos sus síntomas y luego hablamos de eso»",
      "«Es normal preocuparse; muchas personas sienten lo mismo»"
    ],
    "correct": 0,
    "explanation": "La pregunta abierta y específica explora qué significa el trabajo para la paciente sin anticipar su respuesta ni minimizarla."
  },
  {
    "difficulty": "Media",
    "level": "Verificación de comprensión",
    "title": "Después de explicar un medicamento, el paciente asegura haber entendido. ¿Qué intervención comprueba mejor la claridad de la explicación?",
    "options": [
      "«¿Le quedó claro todo lo que acabo de explicar?»",
      "«¿Puede repetir exactamente las indicaciones que di?»",
      "«¿Promete que seguirá el tratamiento como indiqué?»",
      "«Para ver si fui claro, ¿cómo lo tomará en casa?»"
    ],
    "correct": 3,
    "explanation": "Teach-back pide explicar con palabras propias cómo aplicará las indicaciones. Evalúa la claridad de la comunicación, no la obediencia."
  },
  {
    "difficulty": "Difícil",
    "level": "Confidencialidad",
    "title": "Un adulto con capacidad para decidir prohíbe informar a su hija del diagnóstico. Ella insiste porque paga el tratamiento. ¿Qué procede?",
    "options": [
      "Informar solo del diagnóstico, pues financia la atención",
      "Respetar su decisión y explorar cómo desea involucrarla",
      "Pedir a la hija que confirme si él comprendió los riesgos",
      "Compartir el pronóstico, pero reservar el diagnóstico"
    ],
    "correct": 1,
    "explanation": "El pago no concede acceso a información confidencial. Si el paciente conserva capacidad, se respeta su decisión y se puede explorar si desea involucrar a su hija."
  },
  {
    "difficulty": "Media",
    "level": "Empatía",
    "title": "Una persona comienza a llorar cuando se le indica realizar otro estudio. ¿Cuál respuesta combina validación y exploración?",
    "options": [
      "«No se preocupe; todavía no tenemos un diagnóstico»",
      "«Podemos hablar cuando se sienta menos alterada»",
      "«Le explicaré la prueba para que deje de preocuparse»",
      "«Veo que esto le afecta; ¿qué le preocupa más?»"
    ],
    "correct": 3,
    "explanation": "Nombrar con prudencia la emoción y preguntar por su origen permite comprender la preocupación sin minimizarla ni imponer explicaciones."
  },
  {
    "difficulty": "Fácil",
    "level": "Lenguaje claro",
    "title": "¿Cómo explicarías un resultado negativo sin recurrir a tecnicismos ni prometer certeza absoluta?",
    "options": [
      "«El resultado descarta cualquier problema relacionado»",
      "«La hipótesis clínica inicial no tuvo confirmación»",
      "«La prueba no encontró lo que estábamos buscando»",
      "«Su estudio es negativo, así que puede estar tranquilo»"
    ],
    "correct": 2,
    "explanation": "La formulación sencilla describe lo que encontró la prueba, sin afirmar que descarta todas las enfermedades."
  },
  {
    "difficulty": "Media",
    "level": "Comunicación no verbal",
    "title": "Un paciente evita mirar a los ojos, pero responde con claridad. ¿Qué interpretación es la más prudente?",
    "options": [
      "El gesto aislado no permite concluir cómo se siente",
      "Probablemente oculta datos relevantes de la consulta",
      "Su lenguaje corporal confirma una actitud defensiva",
      "Conviene pedirle que mantenga contacto visual continuo"
    ],
    "correct": 0,
    "explanation": "El contacto visual varía con el contexto, la cultura y las características personales. No permite inferir por sí solo desconfianza o engaño."
  },
  {
    "difficulty": "Media",
    "level": "Estructura de entrevista",
    "title": "El paciente lleva varios minutos narrando detalles y necesitas precisar cuándo comenzó el dolor. ¿Cómo intervenir?",
    "options": [
      "Interrumpir con una pregunta cerrada para ahorrar tiempo",
      "Pedir permiso para precisar el inicio y luego continuar",
      "Esperar sin intervenir, aunque se pierda la cronología",
      "Pedirle que omita detalles para centrarse en el dolor"
    ],
    "correct": 1,
    "explanation": "Una interrupción señalizada con permiso permite orientar la entrevista y conservar la alianza terapéutica."
  },
  {
    "difficulty": "Difícil",
    "level": "Comunicación de incertidumbre",
    "title": "Un estudio inicial no explica los síntomas. El paciente pregunta: «¿Entonces no tengo nada?». ¿Qué respuesta es más adecuada?",
    "options": [
      "«Si salió normal, lo más probable es que no sea grave»",
      "«Este estudio no explica los síntomas; revisemos qué sigue»",
      "«Necesitamos más pruebas antes de hablar de resultados»",
      "«Puede ser estrés; observemos si los síntomas desaparecen»"
    ],
    "correct": 1,
    "explanation": "Se debe explicar el alcance limitado del estudio, reconocer la incertidumbre y acordar los siguientes pasos sin invalidar los síntomas."
  },
  {
    "difficulty": "Media",
    "level": "Decisión compartida",
    "title": "Dos tratamientos son razonables, pero difieren en efectos secundarios y frecuencia de visitas. ¿Qué facilita decidir?",
    "options": [
      "Elegir el más eficaz y comunicar sus inconvenientes",
      "Enumerar los riesgos y pedir que el paciente decida solo",
      "Sugerir el más cómodo para reducir dudas y ansiedad",
      "Comparar las opciones y explorar prioridades personales"
    ],
    "correct": 3,
    "explanation": "La decisión compartida combina información clínica sobre las alternativas con preferencias, circunstancias y valores del paciente."
  },
  {
    "difficulty": "Media",
    "level": "Barreras de idioma",
    "title": "Una persona con dominio limitado del español debe consentir un procedimiento. ¿Qué estrategia favorece una decisión informada?",
    "options": [
      "Pedir a su acompañante que traduzca el formulario",
      "Explicar más despacio y repetir las frases difíciles",
      "Usar intérprete capacitado y dirigirse al paciente",
      "Entregar el consentimiento y solicitar su firma luego"
    ],
    "correct": 2,
    "explanation": "Un intérprete capacitado favorece precisión, privacidad y participación directa; hablar más despacio no resuelve la barrera idiomática."
  },
  {
    "difficulty": "Fácil",
    "level": "Pregunta abierta",
    "title": "¿Cuál pregunta invita al paciente a contar su problema con sus propias palabras?",
    "options": [
      "«¿Qué ha notado desde que empezó a sentirse mal?»",
      "«¿El dolor comenzó después de comer?»",
      "«¿Le duele más al respirar o al moverse?»",
      "«¿Tiene náuseas además de la molestia?»"
    ],
    "correct": 0,
    "explanation": "La pregunta abierta permite una narración inicial sin limitar de entrada la respuesta a categorías sugeridas por el entrevistador."
  },
  {
    "difficulty": "Media",
    "level": "Participación del paciente",
    "title": "La pareja responde constantemente por el paciente, quien intenta hablar. ¿Cuál es la mejor intervención inicial?",
    "options": [
      "Pedir a la pareja que espere fuera sin consultarlo antes",
      "Dejar que la pareja termine para evitar un conflicto",
      "Preguntar al paciente cómo desea que participe su pareja",
      "Dirigir todas las preguntas a la pareja por eficiencia"
    ],
    "correct": 2,
    "explanation": "La preferencia del paciente guía la participación del acompañante. Se protege su voz sin asumir que desea excluir a su pareja."
  },
  {
    "difficulty": "Difícil",
    "level": "Malas noticias",
    "title": "Antes de revelar un hallazgo preocupante, el paciente pregunta: «¿Es grave?». No sabes cuánto detalle quiere. ¿Cómo responder?",
    "options": [
      "«Primero escucharé qué le dijeron sobre el estudio»",
      "«Hay un hallazgo importante; ¿qué desea saber ahora?»",
      "«Es mejor explicárselo todo de una vez para ser claros»",
      "«Podemos llamar a su familia antes de darle detalles»"
    ],
    "correct": 1,
    "explanation": "La respuesta reconoce honestamente la importancia del hallazgo y explora cuánto desea saber el paciente, sin ocultarlo ni imponer información."
  },
  {
    "difficulty": "Media",
    "level": "Reparación de confianza",
    "title": "El paciente comenta: «Sentí que no me escuchó porque miraba la pantalla». ¿Qué respuesta ayuda más a reparar la relación?",
    "options": [
      "«Lamento que se sintiera así; ¿qué no pude escuchar?»",
      "«Revisaba datos para atenderlo con mayor seguridad»",
      "«La computadora es obligatoria durante la consulta»",
      "«La próxima vez tomaré notas cuando usted se vaya»"
    ],
    "correct": 0,
    "explanation": "Reconocer el impacto y ofrecer espacio para recuperar lo que faltó es más reparador que justificarse o prometer algo poco realista."
  },
  {
    "difficulty": "Media",
    "level": "Barreras económicas",
    "title": "Un paciente dice que no puede pagar el medicamento recomendado. ¿Qué respuesta inicial favorece un plan viable?",
    "options": [
      "«Es importante que haga el esfuerzo por conseguirlo»",
      "«Pregunte si su familia puede ayudarle con el costo»",
      "«Por ahora deje el tratamiento hasta tener dinero»",
      "«Revisemos qué costo le dificulta y otras opciones»"
    ],
    "correct": 3,
    "explanation": "Explorar la barrera económica sin juzgar permite buscar alternativas seguras y factibles con el paciente."
  },
  {
    "difficulty": "Media",
    "level": "Consentimiento informado",
    "title": "Una paciente firmó el consentimiento, pero pregunta qué pasaría si no se opera. ¿Qué debe hacer el médico?",
    "options": [
      "Recordar que la firma indica aceptación del procedimiento",
      "Explicar la alternativa de no operarse y revisar su decisión",
      "Detallar de nuevo la técnica sin discutir otras opciones",
      "Pedir a su familiar que confirme que está de acuerdo"
    ],
    "correct": 1,
    "explanation": "La firma no sustituye la comprensión. Deben explicarse las alternativas, incluida la no intervención, antes de confirmar una decisión informada."
  },
  {
    "difficulty": "Difícil",
    "level": "FINAL · Capacidad de decisión",
    "title": "Un adulto ansioso rechaza un procedimiento urgente. Su motivo parece contradictorio, pero conversa con claridad. ¿Qué paso es prioritario?",
    "options": [
      "Evaluar si comprende, aprecia y razona sobre la decisión",
      "Solicitar que su familiar autorice por el nivel de ansiedad",
      "Asumir que su rechazo demuestra falta de capacidad",
      "Aceptar el rechazo sin aclarar los riesgos inmediatos"
    ],
    "correct": 0,
    "explanation": "La ansiedad o el desacuerdo no eliminan automáticamente la capacidad. Debe evaluarse para esa decisión, considerando comprensión, apreciación, razonamiento, expresión de elección y urgencia."
  },
  {
    "difficulty": "Difícil",
    "level": "FINAL · Privacidad",
    "title": "Un paciente pidió no informar a su pareja. Luego pierde temporalmente la capacidad para decidir. ¿Cómo manejar la información?",
    "options": [
      "Compartir todo con la pareja al no poder decidir él",
      "Mantener secreto absoluto incluso ante una urgencia",
      "Pedir a la pareja autorización para revisar su expediente",
      "Limitar la información a lo necesario y a quien corresponda"
    ],
    "correct": 3,
    "explanation": "La incapacidad no elimina automáticamente la confidencialidad ni convierte a la pareja en representante. Se comparte solo lo necesario conforme a representación y normativa aplicable."
  },
  {
    "difficulty": "Difícil",
    "level": "FINAL · Transparencia",
    "title": "Se informó como definitivo un resultado que era preliminar. Todavía no se conocen las consecuencias. ¿Cómo comunicarlo?",
    "options": [
      "Esperar hasta conocer todas las consecuencias del error",
      "Corregir el dato sin mencionar la comunicación anterior",
      "Reconocer el error, aclarar la incertidumbre y dar un plan",
      "Atribuir el problema al laboratorio y pedir paciencia"
    ],
    "correct": 2,
    "explanation": "La transparencia exige corregir el error, distinguir lo conocido de lo incierto y explicar los próximos pasos sin culpar ni especular."
  }
];
