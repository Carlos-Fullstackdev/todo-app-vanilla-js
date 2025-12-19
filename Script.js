// ================================
// TO-DO APP - SCRIPT PRINCIPAL
// ================================

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

// Cargar tareas guardadas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Guardar en localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Renderizar tareas
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(index));

    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

// Agregar tarea
function addTask(text) {
  tasks.push({
    text: text,
    completed: false
  });
  saveTasks();
  renderTasks();
}

// Marcar / desmarcar
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Eliminar tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Evento formulario
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = taskInput.value.trim();

  if (text === "") return;

  addTask(text);
  taskInput.value = "";
});

// ================================
// MODO OSCURO
// ================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

// Inicializar
renderTasks();
