Swal.fire('Bienvenido a tu simulador de carta natal');

const signosZodiacales = [
  { signo: "Capricornio", inicio: "12-22", fin: "01-19" },
  { signo: "Acuario", inicio: "01-20", fin: "02-18" },
  { signo: "Piscis", inicio: "02-19", fin: "03-20" },
  { signo: "Aries", inicio: "03-21", fin: "04-19" },
  { signo: "Tauro", inicio: "04-20", fin: "05-20" },
  { signo: "Géminis", inicio: "05-21", fin: "06-20" },
  { signo: "Cáncer", inicio: "06-21", fin: "07-22" },
  { signo: "Leo", inicio: "07-23", fin: "08-22" },
  { signo: "Virgo", inicio: "08-23", fin: "09-22" },
  { signo: "Libra", inicio: "09-23", fin: "10-22" },
  { signo: "Escorpio", inicio: "10-23", fin: "11-21" },
  { signo: "Sagitario", inicio: "11-22", fin: "12-21" },
];

// Función para obtener el signo zodiacal 
function obtenerSignoZodiacal(dia, mes) {
  const fecha = new Date(2000, mes - 1, dia); // Usamos un año fijo (2000)
  let signoEncontrado = "Fecha inválida";
  
  for (const signo of signosZodiacales) {
    const inicio = new Date(2000, getMes(signo.inicio), getDia(signo.inicio));
    const fin = new Date(2000, getMes(signo.fin), getDia(signo.fin));
    
    if ((signo.signo === "Capricornio" && (fecha >= inicio || fecha <= fin)) ||
        (fecha >= inicio && fecha <= fin)) {
      signoEncontrado = signo.signo;
      break; 
    }
  }
  
  return signoEncontrado;
}

// Función auxiliar para obtener el día 
function getDia(fecha) {
  return parseInt(fecha.split("-")[1]);
}

// Función auxiliar para obtener el mes 
function getMes(fecha) {
  return parseInt(fecha.split("-")[0]) - 1; // se resta 1 porque en js los meses son de 0 a 11
}

function mostrarCartaNatal(signo) {
  const zodiacSignElement = document.getElementById("zodiac-sign");
  zodiacSignElement.textContent = "Tu signo zodiacal es: " + signo;
}

const birthdateForm = document.getElementById("birthdate-form");

birthdateForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const enteredBirthdate = document.getElementById("birthdate").value;
  const enteredBirthTime = document.getElementById("birth-time").value;
  const enteredBirthLocation = document.getElementById("birth-location").value;
  

  // Validar y realizar cálculos
  const [day, month] = enteredBirthdate.split("/");
  const [hour, minute] = enteredBirthTime.split(":");

  const sign = obtenerSignoZodiacal(parseInt(day), parseInt(month));

  mostrarCartaNatal(sign);

  localStorage.setItem("zodiacSign", sign);


  // API HOROSCOPO
  
  // const url = `https://daily-horoscope-api.p.rapidapi.com/api/Daily-Horoscope-English/?zodiacSign=sign&timePeriod=today`;
  
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': 'cd83a9b47cmsh14e4bb523d83bcep106a90jsn57734b7fa7ab',
  //     'X-RapidAPI-Host': 'daily-horoscope-api.p.rapidapi.com'
  //   }
  // };

  // const horoscopoDiario = async () => {
  //   try {
  //     const respuesta = await fetch(url, options);
  //     const result = await respuesta.json();
  //     const horoscopo = result.horoscope; 
  //     document.getElementById('horoscopo-diario').textContent = horoscopo;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  // horoscopoDiario();
});