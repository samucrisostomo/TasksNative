const taskForm = document.getElementById('taskForm');
        const taskList = document.getElementById('taskList');

        document.addEventListener('DOMContentLoaded', () => {
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            savedTasks.forEach(task => addTaskToDOM(task.name, task.date, task.time, task.completed));
        });

        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const taskName = document.getElementById('taskName').value;
            const taskDate = document.getElementById('taskDate').value;
            const taskTime = document.getElementById('taskTime').value;

            addTaskToDOM(taskName, taskDate, taskTime, false);
            saveTasksToLocalStorage();

            taskForm.reset();
        });

        function addTaskToDOM(name, date, time, completed) {
            const taskItem = document.createElement('li');
            taskItem.classList.add('p-4', 'bg-gray-700', 'rounded-lg', 'shadow-md', 'flex', 'items-center', 'justify-between');

            taskItem.innerHTML = `
                <div class="flex items-center space-x-3">
                    <input type="checkbox" class="rounded border-gray-600 text-indigo-500 focus:ring-indigo-500" ${completed ? 'checked' : ''}>
                    <div>
                        <span class="font-medium text-gray-200">${name}</span>
                        <p class="text-sm text-gray-400">${date} às ${time}</p>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <a href="views/task/edit.html?name=${encodeURIComponent(name)}&date=${date}&time=${time}" class="edit-btn text-sm text-indigo-400 hover:underline">Editar</a>
                    <button class="delete-btn text-sm text-red-400 hover:underline">Excluir</button>
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
                const name = taskItem.querySelector('span').textContent;
                const dateTime = taskItem.querySelector('p').textContent.split(' às ');
                const completed = taskItem.querySelector('input[type="checkbox"]').checked;

                tasks.push({
                    name,
                    date: dateTime[0],
                    time: dateTime[1],
                    completed
                });
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }