         function handleClick() {
           // Ação a ser realizada quando o link for clicado
           // Por exemplo, redirecionar para uma página de registro
           window.location.href = 'registar.html';  // Substitua com o seu destino
       }

       function togglePasswordVisibility(icon) {
           var passwordInput = document.getElementById("password");
           if (passwordInput.type === "password") {
               passwordInput.type = "text";
               icon.classList.remove("fa-lock");
               icon.classList.add("fa-lock-open");
           } else {
               passwordInput.type = "password";
               icon.classList.remove("fa-lock-open");
               icon.classList.add("fa-lock");
           }
       }

       document.addEventListener("DOMContentLoaded", function () {
           const loginContainer = document.querySelector(".login-container");
           setTimeout(() => {
               loginContainer.classList.remove("hide");
           }, 100);
       });

    window.onload = function () {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('erro');
        const errorMessageDiv = document.getElementById('errorMessage');

        if (error === 'invalid') {
            errorMessageDiv.textContent = 'Nome de utilizador ou password inválidos!';
        } else if (error === 'campos_vazios') {
            errorMessageDiv.textContent = 'Preencha todos os campos!';
        } else {
            errorMessageDiv.textContent = '';
        }
    };
