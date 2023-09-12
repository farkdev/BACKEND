document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener los valores de los campos manualmente
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const dateOfBirth = document.querySelector('input[name="date_of_birth"]').value;
    const first_name = document.querySelector('input[name="first_name"]').value;
    const last_name = document.querySelector('input[name="last_name"]').value;

    const data = {
        email,
        password,
        date_of_birth: dateOfBirth,
        first_name: first_name,
        last_name: last_name
    };

    try {
        // Enviar la solicitud con los datos obtenidos
        const response = await fetch('/api/session/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        
        if (responseData.status === 'success') {
            alert('Usuario creado correctamente, inicia sesión');
            window.location.href = '/api/session/login';
        } else {
            console.error('Error en la respuesta:', responseData.error);
        }
    } catch (error) {
        console.error('Error inesperado:', error);
    }
});
