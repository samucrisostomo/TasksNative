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

        //lista de Atividades
        function addTaskToDOM(name, date, time, completed) {
            const taskItem = document.createElement('li');
            taskItem.classList.add('p-4', 'bg-gray-700', 'rounded-lg', 'shadow-lg', 'flex', 'items-center', 'justify-between');
        
            taskItem.innerHTML = `
                <div class="flex items-center space-x-4 mr-4">
                    <input type="checkbox" class="w-5 h-5 rounded-md border-gray-600 text-indigo-500 focus:ring-indigo-500" ${completed ? 'checked' : ''}>
                    <div>
                        <span class="block font-medium text-gray-200 text-lg">${name}</span>
                        <p class="text-sm text-gray-400">${date} às ${time}</p>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <!-- Ícone de Editar -->
                    <a href="views/task/edit.html?name=${encodeURIComponent(name)}&date=${date}&time=${time}" class="edit-btn text-indigo-400 hover:text-indigo-500" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.211 19.5H3v-4.211L16.862 3.487z" />
                        </svg>
                    </a>
                    <!-- Ícone de Excluir -->
            <button class="delete-btn text-red-400 hover:text-red-500" title="Excluir">
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
        //Fim Lista
        

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