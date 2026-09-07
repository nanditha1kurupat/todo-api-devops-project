// Change this if your backend runs on a different port
// (e.g. a Kubernetes NodePort like http://localhost:31842)
const API_BASE = '';

const listEl = document.getElementById('task-list');
const emptyEl = document.getElementById('empty-msg');
const errorEl = document.getElementById('error-msg');
const form = document.getElementById('add-form');
const input = document.getElementById('add-input');

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
}

function clearError() {
  errorEl.hidden = true;
}

function renderTasks(tasks) {
  listEl.innerHTML = '';

  if (!tasks.length) {
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');

    li.innerHTML = `
      <div class="task-text">
        <p class="task-title"></p>
        <p class="task-sub">${task.done ? 'Completed' : 'Pending'}</p>
      </div>
      <div class="task-actions">
        <button class="task-swatch" aria-label="Toggle done" title="Mark done"></button>
        <button class="task-delete" aria-label="Delete task" title="Delete">&times;</button>
      </div>
    `;

    li.querySelector('.task-title').textContent = task.title;
    li.querySelector('.task-swatch').addEventListener('click', () => toggleTask(task.id));
    li.querySelector('.task-delete').addEventListener('click', () => deleteTask(task.id));

    listEl.appendChild(li);
  });
}

async function loadTasks() {
  try {
    const res = await fetch(`${API_BASE}/tasks`);
    if (!res.ok) throw new Error('Failed to load tasks');
    const tasks = await res.json();
    clearError();
    renderTasks(tasks);
  } catch (err) {
    showError('Could not reach the API. Is your Flask backend running at ' + API_BASE + '?');
  }
}

async function addTask(title) {
  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error('Failed to add task');
    clearError();
    await loadTasks();
  } catch (err) {
    showError('Could not add the task. Check the API connection.');
  }
}

async function toggleTask(id) {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'PUT' });
    if (!res.ok) throw new Error('Failed to update task');
    clearError();
    await loadTasks();
  } catch (err) {
    showError('Could not update the task.');
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
    clearError();
    await loadTasks();
  } catch (err) {
    showError('Could not delete the task.');
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) {
    showError('Enter a task before adding.');
    return;
  }
  clearError();
  addTask(title);
  input.value = '';
});

loadTasks();