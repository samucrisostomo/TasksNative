// Obter os parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const date = urlParams.get('date');
const time = urlParams.get('time');

// Preenche os campos do formulário com os valores recebidos pela URL
document.getElementById('editTaskName').value = name || '';
document.getElementById('editTaskDate').value = date || '';
document.getElementById('editTaskTime').value = time || '';

// Carregar a tarefa completa do LocalStorage para preencher a descrição e prioridade
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskToEdit = tasks.find(task => task.name === name && task.date === date && task.time === time);

if (taskToEdit) {
    document.getElementById('editTaskDescription').value = taskToEdit.description || '';
    document.getElementById('editTaskPriority').value = taskToEdit.priority || 'baixa';
}

// Manipula a submissão do formulário
document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Obtém os valores atualizados do formulário
    const updatedTask = {
        name: document.getElementById('editTaskName').value,
        description: document.getElementById('editTaskDescription').value,
        priority: document.getElementById('editTaskPriority').value,
        date: document.getElementById('editTaskDate').value,
        time: document.getElementById('editTaskTime').value,
    };

    // Salva a tarefa editada no LocalStorage
    const updatedTasks = tasks.map(task =>
        task.name === name && task.date === date && task.time === time ? updatedTask : task
    );

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Exibe o alerta
    const alertBox = document.getElementById('alert-border-3');
    alertBox.classList.remove('hidden');
    alertBox.scrollIntoView({ behavior: 'smooth' });

    // Após 3 segundos, oculta o alerta e redireciona
    setTimeout(() => {
        alertBox.classList.add('hidden');
        window.location.href = '../../index.html';
    }, 3000);
});

// Função para ocultar o alerta manualmente
function hideAlert() {
    const alertBox = document.getElementById('alert-border-3');
    alertBox.classList.add('hidden');
}
