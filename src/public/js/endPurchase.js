// Función para mostrar una alerta
function showAlert(title, text, icon, confirmButtonText, successCallback) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: confirmButtonText,
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      successCallback();
    }
  });
}

// Función para manejar la solicitud (fetch)
function handleFetch(url, method, successCallback, errorCallback) {
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(async response => {
    const data = await response.json();
    if (response.ok) {
      successCallback(data);
    } else {
      errorCallback(data.error);
    }
  })
  .catch(error => {
    errorCallback(error);
  });
}

// Función para finalizar la compra
function purchaseCart(cartId) {
  showAlert(
    '¿Estás seguro de finalizar la compra?',
    'Esta acción generará un ticket de compra.',
    'question',
    'Sí, Finalizar Compra',
    () => {
      handleFetch(`/api/carts/${cartId}/purchase`, 'POST',
        (data) => {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            location.reload();
          });
        },
        (error) => {
          Swal.fire({
            title: 'No se pudo completar el proceso',
            text: `${error}`,
            icon: 'error'
          });
        }
      );
    }
  );
}

// Función para vaciar el carrito
function clearCart(cartId) {
  showAlert(
    '¿Estás seguro de vaciar el carrito?',
    '',
    'question',
    'Sí, Vaciar Carrito',
    () => {
      handleFetch(`/api/carts/${cartId}`, 'DELETE',
        (data) => {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            location.reload();
          });
        },
        (error) => {
          Swal.fire({
            title: `${error}`,
            icon: 'error'
          });
        }
      );
    }
  );
}

// Función para eliminar un producto del carrito
function deleteFromCart(cartId, productId) {
  showAlert(
    '¿Estás seguro de eliminar este producto del carrito?',
    '',
    'question',
    'Sí, Eliminar Producto',
    () => {
      handleFetch(`/api/carts/${cartId}/products/${productId}`, 'DELETE',
        (data) => {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            location.reload();
          });
        },
        (error) => {
          Swal.fire({
            title: `${error}`,
            icon: 'error'
          });
        }
      );
    }
  );
}
