$(document).ready(function() {
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
