// Manipula a submissão do formulário
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Obtém os valores do formulário
    const taskName = document.getElementById('taskName').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskTime = document.getElementById('taskTime').value;

    // Cria o objeto da nova tarefa
    const newTask = {
        name: taskName,
        date: taskDate,
        time: taskTime,
    };

    // Salva a nova tarefa no LocalStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Exibe uma mensagem de sucesso
    alert('Nova tarefa adicionada com sucesso!');

    // Redireciona para a página inicial relativa
    window.location.href = '../../index.html';
});