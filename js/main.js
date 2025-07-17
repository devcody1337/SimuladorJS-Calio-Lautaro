// Variables globales
const diasTurnos = [
    { 
        fecha: "Lunes 21 de Julio 2025", 
        clases: [
            { id: 1, nombre: "Turno Mañana (8:00 a 12:00)", cupo: 10 },
            { id: 2, nombre: "Turno Tarde (14:00 a 18:00)", cupo: 10 },
            { id: 3, nombre: "Turno Noche (18:00 a 22:00)", cupo: 10 }
        ] 
    },
    { 
        fecha: "Martes 22 de Julio 2025", 
        clases: [
            { id: 1, nombre: "Turno Mañana (8:00 a 12:00)", cupo: 10 },
            { id: 2, nombre: "Turno Tarde (14:00 a 18:00)", cupo: 10 },
            { id: 3, nombre: "Turno Noche (18:00 a 22:00)", cupo: 10 }
        ] 
    },
    { 
        fecha: "Miércoles 23 de Julio 2025", 
        clases: [
            { id: 1, nombre: "Turno Mañana (8:00 a 12:00)", cupo: 10 },
            { id: 2, nombre: "Turno Tarde (14:00 a 18:00)", cupo: 10 },
            { id: 3, nombre: "Turno Noche (18:00 a 22:00)", cupo: 10 }
        ] 
    },
    { 
        fecha: "Jueves 24 de Julio 2025", 
        clases: [
            { id: 1, nombre: "Turno Mañana (8:00 a 12:00)", cupo: 10 },
            { id: 2, nombre: "Turno Tarde (14:00 a 18:00)", cupo: 10 },
            { id: 3, nombre: "Turno Noche (18:00 a 22:00)", cupo: 10 }
        ] 
    },
    { 
        fecha: "Viernes 25 de Julio 2025", 
        clases: [
            { id: 1, nombre: "Turno Mañana (8:00 a 12:00)", cupo: 10 },
            { id: 2, nombre: "Turno Tarde (14:00 a 18:00)", cupo: 10 },
            { id: 3, nombre: "Turno Noche (18:00 a 22:00)", cupo: 10 }
        ] 
    }
]

let misReservas = []

const listaTurnos = document.getElementById('lista-turnos')
const misReservasContainer = document.getElementById('mis-reservas')
const vaciarReservas = document.getElementById('vaciar-reservas')

// Funciones de Storage - Mantiene guardada la data localmente
function guardarDatos() {
    localStorage.setItem('misReservasData', JSON.stringify(misReservas))
}

function cargarDatos() {
    const reservasGuardadas = localStorage.getItem('misReservasData')
    if (reservasGuardadas) {
        const datosParse = JSON.parse(reservasGuardadas)
        misReservas = datosParse
    }
}

// Funciones de Renderizado - Muestran/Visualizan los turnos y reservas en la web

function renderTurnos() {
    listaTurnos.innerHTML = ''

    diasTurnos.forEach(dia => {
        const diaTitulo = document.createElement('h3')
        diaTitulo.className = 'dia-titulo'
        diaTitulo.textContent = dia.fecha
        listaTurnos.appendChild(diaTitulo)

        dia.clases.forEach(turno => {
            const div = document.createElement('div')
            div.className = 'turno-item'

            const turnoReservado = misReservas.find(reserva => reserva.id === turno.id && reserva.fecha === dia.fecha)
            
            const reservasTurno = misReservas.filter(reserva => reserva.id === turno.id && reserva.fecha === dia.fecha)
            const reservados = reservasTurno.length
            const disponibles = turno.cupo - reservados

            div.innerHTML = `
                <span>${turno.nombre} - (${disponibles} lugares)</span>
                <button onclick="reservarTurno('${dia.fecha}', ${turno.id})" ${disponibles === 0 || turnoReservado ? 'disabled' : ''}>
                    ${turnoReservado ? 'Reservado' : 'Reservar'}
                </button>
            `
            listaTurnos.appendChild(div)
        })
    })
}

function renderMisReservas() {
    misReservasContainer.innerHTML = ''
    if (misReservas.length === 0) {
        misReservasContainer.innerHTML = '<p>No tenés ninguna reserva.</p>'
        return
    }

    misReservas.forEach(reserva => {
        const div = document.createElement('div')
        div.className = 'reserva-item'
        div.innerHTML = `
            <span>${reserva.nombre} - ${reserva.fecha}</span>
            <button class="btn-cancelar" onclick="cancelarReserva('${reserva.fecha}', ${reserva.id})">Cancelar</button>
        `
        misReservasContainer.appendChild(div)
    })
}


// Funciones de ejecución/logica - Reserva y cancelación de turnos/reservas

function reservarTurno(fecha, id) {
    const diaCorrecto = diasTurnos.find(dia => dia.fecha === fecha)
    const turnoElejido = diaCorrecto.clases.find(clase => clase.id === id)

    const reservasTurno = misReservas.filter(r => r.id === id && r.fecha === fecha)
    const reservados = reservasTurno.length

    if (turnoElejido && reservados < turnoElejido.cupo) {
        misReservas.push({
            id: turnoElejido.id,
            nombre: turnoElejido.nombre,
            fecha: fecha
        })
        
        guardarDatos()
        actualizar()
    }
}

function cancelarReserva(fecha, id) {
    misReservas = misReservas.filter(reserva => !(reserva.id === id && reserva.fecha === fecha))
    guardarDatos()
    actualizar()
}

function actualizar() {
    renderTurnos()
    renderMisReservas()
}

vaciarReservas.addEventListener('click', () => {
    if (misReservas.length > 0 && confirm('¿Estás seguro?')) {
        misReservas = []
        guardarDatos()
        actualizar()
    }
})

function iniciarTurnero() {
    cargarDatos()
    actualizar()
}

iniciarTurnero()
