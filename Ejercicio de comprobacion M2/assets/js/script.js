$(document).ready(function() {
    // Cambiar contenido del hero section
    var originalHeroTitle = $('#hero-title').text();
    var originalHeroDescription = $('#hero-description').text();
    var originalAboutDescription = $('#about-description').text();

    var isHeroContentChanged = false;
    var isAboutContentChanged = false;
    
    
    $('#change-content').click(function() {
        if (isHeroContentChanged){
            $('#hero-title').text(originalHeroTitle);
            $('#hero-description').text(originalHeroDescription);
        } else{
            $('#hero-title').text('Disponibilidad Inmediata');
            $('#hero-description').text('Correo de Contacto: alejandroacunab.12@gmail.com');
        }
        isHeroContentChanged = !isHeroContentChanged;
    });

    // Actualizar contenido de la sección "Sobre mí"
    $('#update-about').click(function() {
        if(isAboutContentChanged){
            $('#about-description').text(originalAboutDescription);
        } else {
            $('#about-description').text('También poseo amplio conocimiento en lenguajes PHP, Java, C# y Python');
        }
        isAboutContentChanged = !isAboutContentChanged;
    });

    // Validación del formulario de contacto
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();
        
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var message = $('#message').val().trim();

        if (name === "" || email === "" || message === "") {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Por favor, ingrese un correo electrónico válido.");
            return;
        }

        alert("Formulario enviado exitosamente!");
        // Aquí puedes agregar el código para enviar el formulario
    });

    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
