const datePicker = document.getElementById("datePicker");
const columns = [document.getElementById("day1"), document.getElementById("day2"), document.getElementById("day3")];

const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
        slots.push(`${hour}:00`, `${hour}:30`);
    }
    return slots;
};

const timeSlots = generateTimeSlots();

const renderDay = (column, date) => {
    column.innerHTML = `<h2>${new Date(date).toLocaleDateString()}</h2>`;
    timeSlots.forEach(time => {
        const key = `${date}-${time}`;
        const savedSlot = localStorage.getItem(key);
        const isBooked = savedSlot !== null;

        const slotDiv = document.createElement("div");
        slotDiv.className = `time-slot ${isBooked ? "booked" : ""}`;
        slotDiv.innerHTML = `
            <span>${time}</span>
            <span>${isBooked ? savedSlot : "Vacío"}</span>
            <div>
                <button class="edit" onclick="editSlot('${key}', '${time}', '${date}')">Editar</button>
                <button class="delete" onclick="deleteSlot('${key}')">Borrar</button>
            </div>
        `;
        column.appendChild(slotDiv);
    });
};

const renderDays = (startDate) => {
    for (let i = 0; i < 3; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        renderDay(columns[i], date.toISOString().split("T")[0]);
    }
};

const editSlot = (key, time, date) => {
    const clientName = prompt(`Ingrese el nombre del cliente para el turno de ${time}:`, localStorage.getItem(key) || "");
    if (clientName) {
        localStorage.setItem(key, clientName);
        renderDays(datePicker.value);
    }
};

const deleteSlot = (key) => {
    if (confirm("¿Está seguro de que desea eliminar este turno?")) {
        localStorage.removeItem(key);
        renderDays(datePicker.value);
    }
};

// Evento para cambiar la fecha seleccionada
datePicker.addEventListener("change", () => {
    renderDays(datePicker.value);
});

// Configuración inicial
datePicker.value = new Date().toISOString().split("T")[0];
renderDays(datePicker.value);
