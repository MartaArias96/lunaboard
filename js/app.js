const addTaskButton = document.getElementById("add-task");

const taskInput = document.getElementById("task-input");

const categorySelect = document.getElementById("category-select");

const taskList = document.getElementById("task-list");

const taskCounter = document.getElementById("task-counter");

const filterButtons = document.querySelectorAll(".filter-btn");

const moodButtons = document.querySelectorAll(".mood-btn");

const moodText = document.getElementById("mood-text");

const themeToggle = document.getElementById("theme-toggle");

const magicQuote = document.getElementById("magic-quote");

/* =========================
   VARIABLES
========================= */

let tasks = [];

let currentFilter = "all";

let currentMood = localStorage.getItem("lunaMood") || "Creativa ✨";

let darkMode = localStorage.getItem("lunaTheme");

/* =========================
   FRASES
========================= */

const quotes = [

    "✨ Todo llega a su tiempo.",

    "🌙 Descansar también es avanzar.",

    "🔥 Pequeños pasos crean grandes cambios.",

    "☁️ No necesitas hacerlo perfecto.",

    "💫 Confía en el proceso.",

    "🌸 Tu energía también importa.",

    "🪐 La disciplina también es amor propio.",

    "🌧️ Los días lentos también cuentan.",

    "🔮 Estás más cerca de lo que crees.",

    "⭐ Tu versión futura te lo agradecerá.",

    "🌙 Protege tu paz.",

    "🕯️ Todo florece cuando llega el momento."

];

/* =========================
   RECUPERAR TAREAS
========================= */

const savedTasks = localStorage.getItem("lunaTasks");

if (savedTasks) {

    tasks = JSON.parse(savedTasks);

}

/* =========================
   RENDER INICIAL
========================= */

renderTasks();

moodText.textContent = currentMood;

/* FRASE ALEATORIA */

const randomQuote = quotes[
    Math.floor(Math.random() * quotes.length)
];

magicQuote.textContent = randomQuote;

/* DARK MODE */

if (darkMode === "dark") {

    document.body.classList.add("dark");

}

/* =========================
   AÑADIR TAREA
========================= */

addTaskButton.addEventListener("click", () => {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        return;
    }

    tasks.push({

        text: taskText,

        completed: false,

        category: categorySelect.value

    });

    saveTasks();

    renderTasks();

    taskInput.value = "";

});

/* =========================
   FILTROS
========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();

    });

});

/* =========================
   GUARDAR
========================= */

function saveTasks() {

    localStorage.setItem(
        "lunaTasks",
        JSON.stringify(tasks)
    );

}

/* =========================
   RENDER
========================= */

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = [];

    /* FILTRAR */

    if (currentFilter === "all") {

        filteredTasks = tasks;

    }

    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(
            task => !task.completed
        );

    }

    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(
            task => task.completed
        );

    }

    /* CREAR HTML */

    filteredTasks.forEach(task => {

        const realIndex = tasks.indexOf(task);

        const taskElement = document.createElement("div");

        taskElement.classList.add("task");

        if (task.completed) {

            taskElement.classList.add("completed");

        }

        taskElement.innerHTML = `
        
            <div>

                <span class="task-category">

                    ${task.category}

                </span>

                <p>${task.text}</p>

            </div>

            <div class="task-buttons">

                <button class="complete-task">

                    ${task.completed ? "Deshacer" : "Completar"}

                </button>

                <button class="delete-task">

                    Eliminar

                </button>

            </div>

        `;

        /* COMPLETAR */

        const completeButton = taskElement.querySelector(".complete-task");

        completeButton.addEventListener("click", () => {

            tasks[realIndex].completed = !tasks[realIndex].completed;

            saveTasks();

            renderTasks();

        });

        /* ELIMINAR */

        const deleteButton = taskElement.querySelector(".delete-task");

        deleteButton.addEventListener("click", () => {

            tasks.splice(realIndex, 1);

            saveTasks();

            renderTasks();

        });

        taskList.appendChild(taskElement);

    });

    /* CONTADOR */

    const pendingTasks = tasks.filter(
        task => !task.completed
    );

    taskCounter.textContent = `
    
        ${pendingTasks.length} pendientes
    
    `;

}

/* =========================
   MOOD TRACKER
========================= */

moodButtons.forEach(button => {

    button.addEventListener("click", () => {

        moodButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentMood = button.textContent;

        moodText.textContent = currentMood;

        localStorage.setItem(
            "lunaMood",
            currentMood
        );

    });

});

/* =========================
   DARK MODE
========================= */

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem(
            "lunaTheme",
            "dark"
        );

    } else {

        localStorage.setItem(
            "lunaTheme",
            "light"
        );

    }

});