// Variables Globales
const cupoMaximo = 10

let turnosMañana = 0
let turnosTarde = 0
let turnosNoche = 0

let menu = ""

// Funcion para reservar un turno
function reservarTurno() {
  const nombreUsuario = prompt("Por favor, ingresa tu nombre:")
        if (nombreUsuario) {
            const horario = prompt("¿En qué horario queres reservar?\n" + "1. Turno Mañana (8:00 AM)\n" + "2. Turno Tarde (14:00 PM)\n" + "3. Turno Noche (20:00 PM)")

        switch (horario) {
            case "1":
                if (turnosMañana < cupoMaximo) {
                    turnosMañana++
                    alert(nombreUsuario + ", tu turno para las 8:00 AM quedó reservado.")
                } else {
                    alert("Lo sentimos, el turno mañana está completo.")
                }
                break

            case "2":
                if (turnosTarde < cupoMaximo) {
                    turnosTarde++
                    alert(nombreUsuario + ", tu turno para las 14:00 PM quedó reservado.")
                } else {
                    alert("Lo sentimos, el turno tarde está completo.")
                }
                break

            case "3":
                if (turnosNoche < cupoMaximo) {
                    turnosNoche++
                    alert(nombreUsuario + ", tu turno para las 20:00 PM quedó reservado.")
                } else {
                    alert("Lo sentimos, el turno noche está completo.")
                }
                break

            default:
                alert("ERROR - Turno no válido, elija una de las opciones.")
        }
    } else {
        alert("ERROR - Debe ingresar un nombre.")
    }
}

// Función para cancelar un turno
function cancelarTurno() {  
  const horario = prompt("¿Qué turno desea cancelar?\n" + "1. Turno Mañana\n" + "2. Turno Tarde\n" + "3. Turno Noche")

    switch (horario) {
      case "1":
          if (turnosMañana > 0) {
              turnosMañana--
              alert("Cancelaste un turno de la mañana. Ahora hay " + (cupoMaximo - turnosMañana) + " lugares.")
          } else {
              alert("No hay reservas en el turno mañana para cancelar.")
        }
      break
      
      case "2":
          if (turnosTarde > 0) {
              turnosTarde--
              alert("Cancelaste un turno de la tarde. Ahora hay " + (cupoMaximo - turnosTarde) + " lugares.")
          } else {
              alert("No hay reservas en el turno tarde para cancelar.")
        }
      break
      
      case "3":
          if (turnosNoche > 0) {
              turnosNoche--
              alert("Cancelaste un turno de la noche. Ahora hay " + (cupoMaximo - turnosNoche) + " lugares.")
          } else {
              alert("No hay reservas en el turno noche para cancelar.")
          }
      break

      default:
          alert("ERROR - Elegí un turno válido para cancelar.")
  }
}

// Función para ver disponibilidad de turnos
function verDisponibilidad() {
    let mensajeDisponibilidad = "Estado de los turnos (Máximo " + cupoMaximo + " por horario):\n" + "- Turno Mañana (8:00 AM): " + (cupoMaximo - turnosMañana) + " lugares disponibles.\n" + "- Turno Tarde (14:00 PM): " + (cupoMaximo - turnosTarde) + " lugares disponibles.\n" + "- Turno Noche (20:00 PM): " + (cupoMaximo - turnosNoche) + " lugares disponibles."
    alert(mensajeDisponibilidad)
}

// Menu
while (menu !== "4") {
    menu = prompt("Bienvenido al Centro de Entrenamiento RUST\n" + "Por favor, elegi una opción:\n" + "1. Reservar turno.\n" + "2. Cancelar turno.\n" + "3. Ver disponibilidad de turnos.\n" + "4. Salir.")

  switch (menu) {
    case "1":
      reservarTurno()
      break

      case "2": 
        cancelarTurno()
        break
      
      case "3":
        verDisponibilidad()
        break

    case "4":
        alert("Gracias reservar en RUST! Te esperamos para entrenar.")
        break

    default:
        alert("ERROR - Opción no válida, por favor elija una opción del menú.")
  } 
}

/* Comentarios */
// Trate de hacer el codigo lo mas compacto
// No agregue array ni funciones flecha ya que no me quedo claro si era parte de la entrega
// pero para optimizar el código se podria armar un array con los turnos, seria mi siguiente paso.
