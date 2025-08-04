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
        // Duplicamos 'broccoli.png' para que aparezca con más frecuencia
        'css/img/animated/broccoli.png', 
        'css/img/animated/broccoli.png',
        'css/img/animated/broccoli.png',
        'css/img/animated/broccoli.png',
        'css/img/animated/broccoli.png', // AÑADIDO: Brocoli duplicado
        'css/img/animated/carrot.png',
        'css/img/animated/grape.png',
        'css/img/animated/orange.png',
        'css/img/animated/strawberry.png',
        'css/img/animated/tomato.png',
        // Añadimos 'potatoes.png' y lo duplicamos para que aparezca con más frecuencia
        'css/img/animated/potatoes.png', // NUEVO
        'css/img/animated/potatoes.png', // AÑADIDO: Papas duplicadas
        'css/img/animated/potatoes.png',  // AÑADIDO: Papas triplicadas
        'css/img/animated/potatoes.png',
    ];

    const numInitialItems = 30;
    const creationInterval = 1000;


    function createFallingItem() {
        const item = document.createElement('img');
        item.src = fruitImages[Math.floor(Math.random() * fruitImages.length)];
        item.classList.add('falling-item');

        const size = Math.random() * (70 - 40) + 40;
        item.style.width = size + 'px';
        item.style.height = 'auto';

        const startPositionX = Math.random() * window.innerWidth;
        item.style.left = startPositionX + 'px';

        const animationDuration = Math.random() * (25 - 15) + 15;
        item.style.animationDuration = animationDuration + 's';

        const animationDelay = Math.random() * 8;
        item.style.animationDelay = animationDelay + 's';

        document.body.appendChild(item);

        item.addEventListener('animationend', () => {
            item.remove();
            createFallingItem();
        });
    }

    for (let i = 0; i < numInitialItems; i++) {
        createFallingItem();
    }

    setInterval(createFallingItem, creationInterval); 
});