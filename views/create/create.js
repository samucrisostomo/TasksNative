// create.js
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Obtém os valores do formulário
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskTime = document.getElementById('taskTime').value;
    const taskPriority = document.getElementById('taskPriority').value;

    // Cria o objeto da nova tarefa
    const newTask = {
        name: taskName,
        description: taskDescription,
        date: taskDate,
        time: taskTime,
        priority: taskPriority,
    };

    // Salva a nova tarefa no LocalStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

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
