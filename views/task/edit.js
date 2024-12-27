const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const date = urlParams.get('date');
        const time = urlParams.get('time');

        document.getElementById('editTaskName').value = name;
        document.getElementById('editTaskDate').value = date;
        document.getElementById('editTaskTime').value = time;

        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Tarefa editada com sucesso!');
            window.location.href = 'index.html';
        });