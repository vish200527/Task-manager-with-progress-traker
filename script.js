let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.name}</span>
      <button onclick="deleteTask(${index})"></button>
    `;
    taskList.appendChild(li);
  });

  updateProgress();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();

  if (taskName) {
    tasks.push({ name: taskName, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("progress").style.width = percent + "%";
  document.getElementById("progressText").textContent = percent + "% completed";
}

// Initial render
renderTasks();
