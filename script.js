
// Banco de frases personalizadas de cumpleaños
const frases = [
    "¡Feliz Cumpleaños! Que este nuevo año de vida esté lleno de momentos increíbles, risas y muchísima felicidad. 🌺",
    "¡Muchas felicidades en tus 12 años! Disfruta al máximo tu día, te deseo lo mejor hoy y siempre. ¡Te quiero mucho prima! 💙",
    "¡Alerta de fiesta! Se ha activado el protocolo de felicitaciones galácticas especialmente para ti. 🎉",
    "Que pases un día espectacular rodeada de toda la gente que te quiere. ¡A disfrutar tu cumpleaños! 🌴"
];
// Elementos del DOM
const botonSorpresa = document.getElementById('btn-surprise');
const botonMusica = document.getElementById('btn-music');
const musica = document.getElementById('bg-music');
const areaSorpresa = document.getElementById('surprise-area');
const textoDinamico = document.getElementById('dynamic-text');
const contenedorConfeti = document.getElementById('confetti-container');
const contenedorBurbujas = document.getElementById('bubbles-container');

// --- 1. Sistema del Reproductor de Música ---
botonMusica.addEventListener('click', () => {
    if (musica.paused) {
        musica.play().then(() => {
            botonMusica.textContent = "⏸️ Pausar Música";
        }).catch(err => {
            console.log("Error al reproducir el archivo de audio local: ", err);
            alert("No se pudo cargar 'musica.mp3'. Asegúrate de que el nombre del archivo coincida exactamente.");
        });
    } else {
        musica.pause();
        botonMusica.textContent = "🎵 Reproducir Música";
    }
});

// --- 2. Evento del Botón Sorpresa (Muestra frases y lanza confeti) ---
botonSorpresa.addEventListener('click', () => {
    // Escoger frase aleatoria
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    textoDinamico.textContent = fraseAleatoria;
    
    // Mostrar el contenedor eliminando la clase oculta
    areaSorpresa.classList.remove('hidden');
    
    // Cambiar texto de acción
    botonSorpresa.textContent = "¡Ver otro mensaje! ⚡";
    
    // Intentar arrancar la música automáticamente al dar clic (Permitido por navegadores)
    if (musica.paused) {
        musica.play().then(() => {
            botonMusica.textContent = "⏸️ Pausar Música";
        }).catch(() => {});
    }

    // Disparar la lluvia de confeti hula-hula
    crearLluviaConfeti();
});

// --- 3. Generador Dinámico de Confeti ---
function crearLluviaConfeti() {
    const colores = ['#3b82f6', '#60a5fa', '#93c5fd', '#ec4899', '#f472b6', '#fbbf24', '#34d399'];
    
    for (let i = 0; i < 60; i++) {
        const confeti = document.createElement('div');
        confeti.classList.add('confetti');
        
        // Propiedades aleatorias
        confeti.style.left = Math.random() * 100 + 'vw';
        confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        confeti.style.top = -10 + 'px';
        
        // Tamaños y velocidades variables
        const tamaño = Math.random() * 8 + 6 + 'px';
        confeti.style.width = tamaño;
        confeti.style.height = tamaño;
        confeti.style.animationDuration = Math.random() * 2 + 1.5 + 's';
        confeti.style.opacity = Math.random();
        
        contenedorConfeti.appendChild(confeti);
        
        // Eliminar del código después de caer
        setTimeout(() => {
            confeti.remove();
        }, 3500);
    }
}

// --- 4. Generador Automático de Burbujas de Fondo ---
function crearBurbujasFondo() {
    setInterval(() => {
        const burbuja = document.createElement('div');
        burbuja.classList.add('bubble');
        
        const tamaño = Math.random() * 40 + 10 + 'px';
        burbuja.style.width = tamaño;
        burbuja.style.height = tamaño;
        burbuja.style.left = Math.random() * 100 + 'vw';
        burbuja.style.animationDuration = Math.random() * 6 + 4 + 's';
        
        contenedorBurbujas.appendChild(burbuja);
        
        setTimeout(() => {
            burbuja.remove();
        }, 10000);
    }, 400);
}

// Inicializar burbujas ambientales al entrar
crearBurbujasFondo();