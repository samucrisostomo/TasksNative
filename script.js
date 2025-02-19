const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToDOM(task.name, task.description, task.date, task.time, task.priority, task.completed));
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value || 'Sem descrição';
    const taskDate = document.getElementById('taskDate').value;
    const taskTime = document.getElementById('taskTime').value;
    const taskPriority = document.getElementById('taskPriority').value;

    addTaskToDOM(taskName, taskDescription, taskDate, taskTime, taskPriority, false);
    saveTasksToLocalStorage();

    taskForm.reset();
});

function addTaskToDOM(name, description, date, time, priority, completed) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('p-4', 'bg-gray-700', 'rounded-lg', 'shadow-lg', 'flex', 'items-center', 'justify-between');

    // Define a cor de acordo com a prioridade
    const priorityColors = {
        baixa: 'text-blue-500',
        media: 'text-green-500',
        alta: 'text-orange-500',
        urgente: 'text-red-500',
    };
    const priorityClass = priorityColors[priority] || 'text-gray-400';

    taskItem.innerHTML = `
        <div class="flex items-center space-x-4 mr-4">
            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer border-white-600" ${completed ? 'checked' : ''}>
                <div class="relative w-11 h-6 bg-white-200 peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-white-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white-600 peer-checked:bg-green-700"></div>
            </label>
            <div>
                <span class="flex font-medium text-gray-200 text-lg">${name}</span>
                <p class="text-sm text-gray-400">${date} às ${time}</p>
                
                <!-- Prioridade -->
                <p class="text-sm flex ${priorityClass} capitalize">
                <svg class="w-3 h-3 mt-1 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                ${priority}
                
                </p>

            </div>
        </div>
        <div class="flex space-x-4">
            <a href="views/show/show.html?name=${encodeURIComponent(name)}&date=${date}&time=${time}" class="show-btn" title="Ver Detalhes">
                <svg class="w-6 h-6 dark:text-gray-400 hover:text-gray-500 transition duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
            </a>
            <a href="views/edit/edit.html?name=${encodeURIComponent(name)}&date=${date}&time=${time}" class="edit-btn text-indigo-400 hover:text-indigo-500 transition duration-150" title="Editar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.211 19.5H3v-4.211L16.862 3.487z" />
                </svg>
            </a>
            <button class="delete-btn text-red-400 hover:text-red-500 transition duration-150" title="Excluir">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 2L4 6h16l-2-4H6zM19 6v14H5V6h14zm-3 2H8v12h8V8z" />
                </svg>
            </button>
        </div>
    `;

    taskList.appendChild(taskItem);

    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', saveTasksToLocalStorage);

    taskItem.querySelector('.delete-btn').addEventListener('click', () => {
        taskItem.remove();
        saveTasksToLocalStorage();
    });
}


function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        const name = taskItem.querySelector('.text-lg').textContent;
        const description = taskItem.querySelector('.text-sm:nth-child(2)').textContent;
        const dateTime = taskItem.querySelector('.text-sm:last-child').textContent.split(' às ');
        const priority = taskItem.querySelector('.capitalize').textContent;
        const completed = taskItem.querySelector('input[type="checkbox"]').checked;

        tasks.push({
            name,
            description,
            date: dateTime[0],
            time: dateTime[1],
            priority,
            completed
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
