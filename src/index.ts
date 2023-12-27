import { v4 as uuid4 } from "uuid";

const list = document.querySelector<HTMLDListElement>('#list')
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const button = document.querySelector<HTMLButtonElement>('button')

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const tasks: Task[] = loadTasks()
tasks.forEach(addListItem);

button?.addEventListener('click', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    id: uuid4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  saveTasks();

  // create new task.
  addListItem(newTask);
  input.value = '';
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
};

function loadTasks(): Task[] {
  const jsonTask = localStorage.getItem('TASKS');
  if (jsonTask == null) return [];
  return JSON.parse(jsonTask);
}
