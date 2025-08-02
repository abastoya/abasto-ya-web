document.addEventListener('DOMContentLoaded', function() {
    // 1. Funcionalidad del botón de WhatsApp
    const whatsappButton = document.querySelector('.btn-whatsapp');

    if (whatsappButton) { // Asegurarse de que el botón existe antes de añadir el evento
        whatsappButton.addEventListener('click', function(event) {
            event.preventDefault(); // Evita que el enlace # recargue la página

            const phoneNumber = '59171045259'; // Tu número de WhatsApp real
            const message = encodeURIComponent('Hola Abasto Ya! Quiero hacer un pedido de frutas y verduras. ¿Cómo puedo enviarles mi lista?'); 
            
            const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
            const whatsappMobileUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;

            const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (isMobile) {
                window.open(whatsappMobileUrl, '_blank');
            } else {
                window.open(whatsappWebUrl, '_blank');
            }
        });
    }

    // 2. Desplazamiento suave para los enlaces del menú
    document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // 3. --- CÓDIGO PARA EL EFECTO DE LLUVIA DE FRUTAS Y VERDURAS ---
    const fruitImages = [
        'css/img/animated/apple.png',
        'css/img/animated/banana.png',
        'css/img/animated/broccoli.png',
        'css/img/animated/carrot.png',
        'css/img/animated/grape.png',
        'css/img/animated/orange.png',
        'css/img/animated/strawberry.png',
        'css/img/animated/tomato.png'
    ];

    const numInitialItems = 30; // CANTIDAD CORREGIDA: Más elementos iniciales para mayor densidad
    const creationInterval = 1000; // INTERVALO CORREGIDO: Crear un nuevo elemento cada 1 segundo


    function createFallingItem() {
        const item = document.createElement('img');
        item.src = fruitImages[Math.floor(Math.random() * fruitImages.length)];
        item.classList.add('falling-item');

        const size = Math.random() * (70 - 40) + 40; // Tamaño aleatorio entre 40px y 70px
        item.style.width = size + 'px';
        item.style.height = 'auto'; // Mantener la proporción

        const startPositionX = Math.random() * window.innerWidth; // Posición horizontal aleatoria
        item.style.left = startPositionX + 'px';

        const animationDuration = Math.random() * (25 - 15) + 15; // Duración aleatoria entre 15s y 25s
        item.style.animationDuration = animationDuration + 's';

        const animationDelay = Math.random() * 8; // Retraso aleatorio para que no caigan a la vez
        item.style.animationDelay = animationDelay + 's';

        document.body.appendChild(item);

        // Eliminar el elemento y crear uno nuevo cuando la animación termina
        // Esto crea un bucle "infinito" de caída para cada elemento individual
        item.addEventListener('animationend', () => {
            item.remove();
            createFallingItem(); // Crea un nuevo elemento una vez que uno desaparece
        });
    }

    // Crear un número inicial de elementos para que la pantalla no esté vacía al cargar
    for (let i = 0; i < numInitialItems; i++) {
        createFallingItem();
    }

    // Activar la creación periódica de elementos para mantener la densidad de la "lluvia".
    setInterval(createFallingItem, creationInterval); 
});