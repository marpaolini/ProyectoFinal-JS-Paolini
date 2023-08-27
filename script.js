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
  if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) {
    return "Capricornio";
  }

  // Hice ese if para capricornio ya que tenia problemas para que se mostrara el signo bien ya que el rango de fechas
  // correspondiente abarca el cambio de año que va desde el 22 de diciembre al 19 de enero

  const fecha = new Date(2000, mes - 1, dia); // Usamos un año fijo (2000)
  let signoEncontrado = "Fecha inválida";

  for (const signo of signosZodiacales) {
    const inicio = new Date(2000, getMes(signo.inicio), getDia(signo.inicio));
    const fin = new Date(2000, getMes(signo.fin), getDia(signo.fin));

    if (isWithinRange(fecha, inicio, fin)) {
      signoEncontrado = signo.signo;
      break;
    }
  }

  return signoEncontrado;
}

// Utilice la libreria date-fns para un mejor manejo de fechas 

function isWithinRange(date, startDate, endDate) {
  return date >= startDate && date <= endDate;
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

// Los resultados provienen de un json local ya que no encontre una API de horoscopos que funcionara bien

const horoscopoDiario = async (signo) => {
  try {
    const respuesta = await fetch('horoscopes.json');
    const data = await respuesta.json();
    const horoscopo = data.find(item => item.signo === signo).horoscopo;
    setTimeout(() => {
      document.getElementById('horoscopo-diario').textContent = horoscopo;
    }, 1000);
  } catch (error) {
    document.getElementById('horoscopo-diario').textContent = "Error al encontrar el horóscopo.";
  }
};

birthdateForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const enteredBirthdate = document.getElementById("birthdate").value;
  const enteredBirthTime = document.getElementById("birth-time").value;
  const enteredBirthLocation = document.getElementById("birth-location").value;

  const timePattern = /^[0-2][0-9]:[0-5][0-9]$/;
  const locationPattern = /^[\w\s]+,[\w\s]+$/;

  if (!timePattern.test(enteredBirthTime)) {
    Swal.fire("Error", "Ingrese una hora válida en formato HH:MM", "error");
    return;
  }

  if (!locationPattern.test(enteredBirthLocation)) {
    Swal.fire("Error", "Ingrese una ubicación válida en formato Ciudad, País", "error");
    return;
  }
  
  const [day, month] = enteredBirthdate.split("/");
  const [hour, minute] = enteredBirthTime.split(":");

  const sign = obtenerSignoZodiacal(parseInt(day), parseInt(month));

  mostrarCartaNatal(sign);

  localStorage.setItem("zodiacSign", sign);

  // Mostrar resultado
  await horoscopoDiario(sign);
  });