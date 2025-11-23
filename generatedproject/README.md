# ColorfulTodo

A vibrant, feature‑rich Todo application that lets you manage tasks with style. Built with plain **HTML**, **CSS**, and **JavaScript**, it offers a clean UI, drag‑and‑drop reordering, theme switching, and persistent storage using `localStorage`.

---

## Tech Stack
- **HTML** – Structure of the app
- **CSS** – Styling, responsive layouts, and light/dark themes
- **JavaScript** – Interactivity, task management, drag‑and‑drop, and data persistence

---

## Features
- **Add tasks** – Quickly add new todos via the input field.
- **Edit tasks** – Inline editing of task text.
- **Complete / Uncomplete** – Mark tasks as done with a checkbox; completed tasks are visually distinct.
- **Delete tasks** – Remove unwanted todos.
- **Filter view** – Show All, Active, or Completed tasks.
- **Drag‑and‑drop** – Reorder tasks by dragging them within the list.
- **Theme toggle** – Switch between Light and Dark themes; the preference is saved.
- **Persisted data** – All tasks, their order, and the selected theme are saved in `localStorage` and restored on page load.
- **Responsive design** – Works on both mobile and desktop screen sizes.

---

## Installation / Running
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ColorfulTodo.git
   cd ColorfulTodo
   ```
2. **Open the app**
   - No build step is required. Simply open `index.html` in your favorite web browser:
   ```bash
   open index.html   # macOS
   # or double‑click the file in Explorer/Finder
   ```
3. The application will load and you can start managing your todos immediately.

---

## Usage Guide
1. **Add a task** – Type a description into the input at the top and press **Enter** or click the **Add** button.
2. **Edit a task** – Click the text of a task; it becomes an editable field. Press **Enter** or click outside to save.
3. **Complete / Uncomplete** – Click the checkbox next to a task to toggle its completed state.
4. **Delete a task** – Click the trash‑can icon on the right side of a task.
5. **Filter tasks** – Use the filter buttons (All, Active, Completed) to view a subset of tasks.
6. **Reorder tasks** – Click and hold a task, then drag it to a new position in the list.
7. **Toggle theme** – Click the sun/moon icon in the header to switch between Light and Dark themes.
8. **Data persistence** – All changes (tasks, order, theme) are automatically saved to `localStorage`. When you reload or revisit the page, your data is restored.

---

## Responsive Design
The layout adapts to various screen sizes:
- **Desktop** – Full‑width task list with a sidebar‑style header.
- **Mobile** – Stacked components with larger touch targets for easy interaction.
The design is tested on common breakpoints to ensure a smooth experience on phones, tablets, and desktops.

---

## Contributing
Contributions are welcome! If you'd like to improve the project:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Ensure your changes follow the existing code style.
4. Submit a pull request with a clear description of what was changed.

---

## License
[MIT License](LICENSE) *(replace with actual license file when added)*

---

## Screenshots
### Light Theme
![Light Theme](path/to/light-theme.png)

### Dark Theme
![Dark Theme](path/to/dark-theme.png)
