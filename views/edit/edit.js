// Obter os parâmetros da URL, se necessário
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const date = urlParams.get('date');
const time = urlParams.get('time');

// Preenche os campos do formulário com os valores recebidos pela URL
document.getElementById('editTaskName').value = name || '';
document.getElementById('editTaskDate').value = date || '';
document.getElementById('editTaskTime').value = time || '';

// Manipula a submissão do formulário
document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Obtém os valores atualizados do formulário
    const updatedTask = {
        name: document.getElementById('editTaskName').value,
        date: document.getElementById('editTaskDate').value,
        time: document.getElementById('editTaskTime').value,
    };

    // Salva a tarefa editada no LocalStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map((task) => {
        if (task.name === name && task.date === date && task.time === time) {
            return updatedTask; // Substitui a tarefa correspondente
        }
        return task; // Mantém as demais tarefas
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Exibe uma mensagem de sucesso
    alert('Alterações salvas com sucesso!');

    // Redireciona para a página inicial relativa
    window.location.href = '../../index.html';
});
