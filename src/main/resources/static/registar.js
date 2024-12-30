
    function handleClick() {
     // Ação a ser realizada quando o link for clicado
     // Por exemplo, redirecionar para uma página de registro
     window.location.href = 'index.html';  // Substitua com o seu destino
 }

var nationalities = ["Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Argentine", "Armenian", "Australian",
  "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese",
  "Bhutanese", "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese", "Burundian", "Cambodian",
  "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese",
  "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djibouti", "Dominican", "Dutch", "East Timorese", "Ecuadorean",
  "Egyptian", "Emirian", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino", "Finnish", "French",
  "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinea-Bissauan", "Guinean",
  "Guyanese", "Haitian", "Herzegovinian", "Honduran", "Hungarian", "I-Kiribati", "Icelander", "Indian", "Indonesian", "Iranian",
  "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan",
  "Kittian and Nevisian", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtensteiner",
  "Lithuanian", "Luxembourger", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivan", "Malian", "Maltese", "Marshallese",
  "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Moroccan", "Mosotho", "Motswana",
  "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealander", "Ni-Vanuatu", "Nicaraguan", "Nigerian", "Nigerien",
  "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan",
  "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian", "Salvadoran", "Samoan",
  "San Marinese", "Sao Tomean", "Saudi", "Scottish", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean",
  "Slovakian", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean", "Spanish", "Sri Lankan", "Sudanese",
  "Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan",
  "Trinidadian or Tobagonian", "Tunisian", "Turkish", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani",
  "Venezuelan", "Vietnamese", "Welsh", "Yemenite", "Zambian", "Zimbabwean"];

function autocomplete(input, arr) {
  var currentFocus;
  input.addEventListener("input", function (e) {
      var val = this.value;
      closeAllLists();
      if (!val) { return false; }
      currentFocus = -1;
      var autocompleteItems = document.createElement("div");
      autocompleteItems.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(autocompleteItems);
      for (var i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
              var autocompleteOption = document.createElement("div");
              autocompleteOption.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              autocompleteOption.innerHTML += arr[i].substr(val.length);
              autocompleteOption.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              autocompleteOption.addEventListener("click", function (e) {
                  input.value = this.getElementsByTagName("input")[0].value;
                  closeAllLists();
              });
              autocompleteItems.appendChild(autocompleteOption);
          }
      }
  });
  input.addEventListener("keydown", function (e) {
      var x = document.getElementsByClassName("autocomplete-items")[0];
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode === 40) {
          currentFocus++;
          addActive(x);
      } else if (e.keyCode === 38) {
          currentFocus--;
          addActive(x);
      } else if (e.keyCode === 13) {
          e.preventDefault();
          if (currentFocus > -1) {
              if (x) x[currentFocus].click();
          }
      }
  });

  function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
      }
  }

  function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
          if (elmnt !== x[i] && elmnt !== input) {
              x[i].parentNode.removeChild(x[i]);
          }
      }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  autocomplete(document.getElementById("nationality"), nationalities);
});

function backToLogin() {
  window.location.href = "login.html";
}

// Hide register container initially
document.addEventListener("DOMContentLoaded", function () {
  const registerContainer = document.querySelector(".register-container");
  setTimeout(() => {
      registerContainer.classList.remove("hide");
  }, 100);
});

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
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('erro')) {
        const error = urlParams.get('erro');
        const errorMessageDiv = document.getElementById('errorMessage');

        // Exibindo mensagem correspondente ao erro
        switch (error) {
            case 'idade_invalida':
                errorMessageDiv.textContent = "Você precisa ter 13 anos ou mais para se registrar.";
                break;
            case 'senha_fraca':
                errorMessageDiv.textContent = "A senha deve ter pelo menos 8 caracteres, com uma letra maiúscula, uma minúscula, um número e um caractere especial.";
                break;
            case 'campos_vazios':
                errorMessageDiv.textContent = "Por favor, preencha todos os campos obrigatórios.";
                break;
            case 'usuario_existente':
                errorMessageDiv.textContent = "O username ou o email já estão cadastrados.";
                break;
            case 'erro_interno':
                errorMessageDiv.textContent = "Ocorreu um erro interno. Tente novamente mais tarde.";
                break;
                case 'nacionalidade_invalida':
                errorMessageDiv.textContent = "Insire uma nacionalidade valida.";
                break;
            default:
                // Caso o erro não seja reconhecido
                errorMessageDiv.textContent = "Erro desconhecido. Por favor, tente novamente.";
                break;
        }

        // Exibir o elemento de erro se não estiver visível
        errorMessageDiv.style.display = "block";
    }
});
