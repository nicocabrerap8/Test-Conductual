// Cuestionario ampliado de conductas observables (Teoría Conductista)
const questions = [
    // --- DIMENSIÓN: RESPONSABILIDAD ---
    { id: 'q1', trait: 'responsabilidad', text: '1. Entrego mis tareas, proyectos o informes en la fecha límite establecida o antes de la misma.' },
    { id: 'q2', trait: 'responsabilidad', text: '2. Planifico mi rutina diaria anotando tareas en listas, agendas o aplicaciones móviles.' },
    { id: 'q3', trait: 'responsabilidad', text: '3. Reviso sistemáticamente mi trabajo en busca de errores antes de darlo por terminado.' },
    { id: 'q4', trait: 'responsabilidad', text: '4. Guardo y archivo cada documento o herramienta de trabajo en su ubicación asignada inmediatamente después de usarlo.' },
    { id: 'q5', trait: 'responsabilidad', text: '5. Configuro alarmas o recordatorios externos para evitar retrasos en mis citas o compromisos.' },
    { id: 'q6', trait: 'responsabilidad', text: '6. Sigo al pie de la letra los manuales de procedimientos o instrucciones escritas cuando realizo una labor.' },
    { id: 'q7', trait: 'responsabilidad', text: '7. Completo una tarea asignada en su totalidad antes de iniciar otra actividad recreativa o secundaria.' },
    { id: 'q8', trait: 'responsabilidad', text: '8. Registro formalmente el tiempo invertido en cada una de mis actividades diarias.' },

    // --- DIMENSIÓN: EXTRAVERSIÓN ---
    { id: 'q9', trait: 'extraversion', text: '9. Inicio la conversación verbalmente cuando me encuentro con personas desconocidas en un entorno social.' },
    { id: 'q10', trait: 'extraversion', text: '10. Hablo en un tono de voz audible y participo activamente dando opiniones en reuniones de grupo.' },
    { id: 'q11', trait: 'extraversion', text: '11. Asisto físicamente a reuniones sociales, fiestas o eventos masivos por lo menos una vez a la semana.' },
    { id: 'q12', trait: 'extraversion', text: '12. Respondo de inmediato a las llamadas telefónicas o mensajes directos que recibo de otras personas.' },
    { id: 'q13', trait: 'extraversion', text: '13. Realizo preguntas en voz alta frente a audiencias o grupos cuando una instrucción no me queda clara.' },
    { id: 'q14', trait: 'extraversion', text: '14. Me acerco físicamente a saludar y dialogar con grupos de personas ya formados en un espacio público.' },
    { id: 'q15', trait: 'extraversion', text: '15. Utilizo gestos corporales amplios y expresivos (movimientos de manos, sonrisa abierta) al interactuar con otros.' },
    { id: 'q16', trait: 'extraversion', text: '16. Organizo o propongo activamente encuentros grupales o salidas recreativas con otras personas.' },

    // --- DIMENSIÓN: ESTABILIDAD EMOCIONAL ---
    { id: 'q17', trait: 'estabilidad', text: '17. Ante un problema inesperado, mi respiración se mantiene constante y mi tono de voz no se altera.' },
    { id: 'q18', trait: 'estabilidad', text: '18. Retomo mi tarea motora inmediatamente después de haber recibido una corrección o crítica verbal.' },
    { id: 'q19', trait: 'estabilidad', text: '19. Mis manos y mi pulso se mantienen firmes al realizar una presentación frente a un público o bajo presión.' },
    { id: 'q20', trait: 'estabilidad', text: '20. Mantengo mi ritmo de trabajo constante sin realizar pausas prolongadas ante situaciones de alta exigencia de tiempo.' },
    { id: 'q21', trait: 'estabilidad', text: '21. Respondo con un volumen de voz neutro y controlado cuando recibo llamadas de atención o reclamos.' },
    { id: 'q22', trait: 'estabilidad', text: '22. Permanezco sentado en mi lugar de trabajo o estudio de manera continua durante los periodos de mayor crisis o caos.' },
    { id: 'q23', trait: 'estabilidad', text: '23. Evito realizar conductas repetitivas de escape (como caminar de un lado a otro o morderse las uñas) ante estímulos estresantes.' },
    { id: 'q24', trait: 'estabilidad', text: '24. Mantengo la misma velocidad de ejecución en mis tareas habituales a pesar de los cambios repentinos en el entorno.' }
];

document.addEventListener('DOMContentLoaded', () => {
    const questionsWrapper = document.getElementById('questions-wrapper');
    const form = document.getElementById('behavioral-test');
    const btnSubmit = document.getElementById('btn-submit');
    const resultsSection = document.getElementById('results-section');
    const resultsContent = document.getElementById('results-content');
    const btnRestart = document.getElementById('btn-restart');

    // Generar el HTML de las preguntas dinámicamente
    questions.forEach((q) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        
        let radioButtonsHtml = '';
        for (let i = 1; i <= 5; i++) {
            radioButtonsHtml += `
                <label class="scale-option">
                    <input type="radio" name="${q.id}" value="${i}" required>
                    ${i}
                </label>
            `;
        }

        questionDiv.innerHTML = `
            <div class="question-text">${q.text}</div>
            <div class="scale-options">
                <span style="font-size: 12px; color: #888;">Totalmente<br>en desacuerdo</span>
                ${radioButtonsHtml}
                <span style="font-size: 12px; color: #888;">Totalmente<br>de acuerdo</span>
            </div>
        `;
        questionsWrapper.appendChild(questionDiv);
    });

    // Función para validar en tiempo real si todas las preguntas tienen respuesta
    function checkFormCompletion() {
        const formData = new FormData(form);
        let answeredCount = 0;

        questions.forEach(q => {
            if (formData.get(q.id)) {
                answeredCount++;
            }
        });

        // Si el número de respuestas coincide con el total de preguntas, se habilita el botón
        if (answeredCount === questions.length) {
            btnSubmit.removeAttribute('disabled');
        } else {
            btnSubmit.setAttribute('disabled', 'true');
        }
    }

    // Escuchar cambios en los inputs para validar el estado de bloqueo
    form.addEventListener('change', checkFormCompletion);

    // Procesar el formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Inicializar puntuaciones
        const scores = {
            responsabilidad: { total: 0, count: 0, label: 'Responsabilidad' },
            extraversion: { total: 0, count: 0, label: 'Extraversión' },
            estabilidad: { total: 0, count: 0, label: 'Estabilidad Emocional' }
        };

        // Recolectar respuestas
        const formData = new FormData(form);
        questions.forEach(q => {
            const value = parseInt(formData.get(q.id));
            if (!isNaN(value)) {
                scores[q.trait].total += value;
                scores[q.trait].count += 1;
            }
        });

        // Generar informe
        let resultsHtml = '';
        for (const key in scores) {
            const trait = scores[key];
            const maxScore = trait.count * 5;
            const percentage = ((trait.total / maxScore) * 100).toFixed(1);
            
            let interpretation = '';
            if (percentage >= 80) interpretation = 'Alta frecuencia de emisión de estas conductas operantes.';
            else if (percentage >= 50) interpretation = 'Frecuencia moderada de emisión de estas conductas.';
            else interpretation = 'Baja frecuencia de emisión de estas conductas en el repertorio actual.';

            resultsHtml += `
                <div class="result-card">
                    <h3 class="result-title">${trait.label}</h3>
                    <p>Puntuación: <span class="result-score">${trait.total} / ${maxScore}</span> (${percentage}%)</p>
                    <p style="font-size: 14px; color: #555;">${interpretation}</p>
                </div>
            `;
        }

        resultsContent.innerHTML = resultsHtml;
        form.classList.add('hidden');
        resultsSection.classList.remove('hidden');
    });

    // Reiniciar el test
    btnRestart.addEventListener('click', () => {
        form.reset();
        btnSubmit.setAttribute('disabled', 'true'); // Volver a bloquear el botón al reiniciar
        resultsSection.classList.add('hidden');
        form.classList.remove('hidden');
        window.scrollTo(0, 0);
    });
});