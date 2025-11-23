// script.js - Todo App functionality
// Global state
let todos = [];
let currentFilter = 'all';

// ---------- Persistence ----------
function loadTodos() {
  const data = localStorage.getItem('todos');
  try {
    todos = data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse todos from localStorage', e);
    todos = [];
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
  updateItemsLeft();
}

// ---------- Rendering ----------
function renderTodos(filter = currentFilter) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  const filtered = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // all
  });

  filtered.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.setAttribute('draggable', 'true');
    li.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.dataset.id = todo.id;
    checkbox.checked = todo.completed;

    const span = document.createElement('span');
    span.className = 'text';
    span.dataset.id = todo.id;
    span.textContent = todo.text;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.dataset.id = todo.id;
    editBtn.textContent = '✎';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.dataset.id = todo.id;
    deleteBtn.textContent = '✕';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// ---------- Helpers ----------
function updateItemsLeft() {
  const count = todos.filter(t => !t.completed).length;
  const el = document.getElementById('items-left');
  el.textContent = `${count} item${count !== 1 ? 's' : ''} left`;
}

function addTodo() {
  const input = document.getElementById('new-todo');
  const text = input.value.trim();
  if (!text) return;
  const newTodo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
  };
  todos.push(newTodo);
  input.value = '';
  saveTodos();
  renderTodos();
}

// ---------- Event Listeners ----------
function setupEventListeners() {
  // Add todo button
  document.getElementById('add-todo').addEventListener('click', addTodo);

  // Delegated events on the todo list
  const list = document.getElementById('todo-list');

  // Toggle completed
  list.addEventListener('click', e => {
    if (e.target.classList.contains('checkbox')) {
      const id = e.target.dataset.id;
      const todo = todos.find(t => t.id === id);
      if (todo) {
        todo.completed = e.target.checked;
        saveTodos();
        renderTodos();
      }
    }
  });

  // Delete todo
  list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
      const id = e.target.dataset.id;
      todos = todos.filter(t => t.id !== id);
      saveTodos();
      renderTodos();
    }
  });

  // Edit todo (inline)
  list.addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
      const id = e.target.dataset.id;
      const span = list.querySelector(`span.text[data-id="${id}"]`);
      if (!span) return;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      input.className = 'edit-input';
      input.dataset.id = id;
      span.replaceWith(input);
      input.focus();

      const finishEdit = () => {
        const newText = input.value.trim();
        if (newText) {
          const todo = todos.find(t => t.id === id);
          if (todo) todo.text = newText;
        }
        saveTodos();
        renderTodos();
      };

      input.addEventListener('blur', finishEdit);
      input.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') {
          input.blur();
        }
      });
    }
  });

  // Filter buttons
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      currentFilter = filter;
      // Update aria-pressed
      document.querySelectorAll('.filter').forEach(b => {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      renderTodos();
    });
  });

  // Clear completed
  document.getElementById('clear-completed').addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
  });

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  themeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const newTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    // Add a temporary transition class for smooth change
    root.classList.add('theme-transition');
    setTimeout(() => root.classList.remove('theme-transition'), 300);
  });

  // Drag and Drop
  let dragSrcId = null;
  let placeholder = null;

  list.addEventListener('dragstart', e => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    dragSrcId = li.dataset.id;
    e.dataTransfer.setData('text/plain', dragSrcId);
    li.classList.add('dragging');
  });

  list.addEventListener('dragend', e => {
    const li = e.target.closest('.todo-item');
    if (li) li.classList.remove('dragging');
    if (placeholder) placeholder.remove();
    placeholder = null;
    dragSrcId = null;
  });

  list.addEventListener('dragover', e => {
    e.preventDefault(); // allow drop
    const afterElement = getDragAfterElement(list, e.clientY);
    if (placeholder) placeholder.remove();
    placeholder = document.createElement('li');
    placeholder.className = 'placeholder';
    if (afterElement == null) {
      list.appendChild(placeholder);
    } else {
      list.insertBefore(placeholder, afterElement);
    }
  });

  list.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    const droppedIdx = todos.findIndex(t => t.id === id);
    if (droppedIdx === -1) return;
    // Determine new index based on placeholder position
    const placeholderIdx = Array.from(list.children).indexOf(placeholder);
    // Remove the item from its old position
    const [moved] = todos.splice(droppedIdx, 1);
    // Insert at new position (adjust if moving downwards)
    const newIdx = placeholderIdx > droppedIdx ? placeholderIdx - 1 : placeholderIdx;
    todos.splice(newIdx, 0, moved);
    saveTodos();
    renderTodos();
  });
}

// Helper to find element after which to insert during dragover
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.todo-item:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

// ---------- Initialization ----------
function init() {
  loadTodos();
  const storedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.dataset.theme = storedTheme;
  currentFilter = 'all';
  renderTodos();
  updateItemsLeft();
  setupEventListeners();
}

// Run init after DOM is ready (script is deferred, but ensure safety)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export functions for potential external use (optional)
window.todoApp = {
  loadTodos,
  saveTodos,
  renderTodos,
  addTodo,
  updateItemsLeft,
};
