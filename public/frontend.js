document.getElementById('trelloForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const startDate = document.getElementById('startDate').value;
    const dueDate = document.getElementById('dueDate').value;

    try {
        const response = await fetch('http://localhost:3000/createcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                startDate,
                dueDate,
            }),
        });

        if (response.ok) {
            const data = await response.text();
            alert(`Card created: ${data}`);  
        } else {
            const error = await response.text();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        alert('Error creating Trello card: ' + error.message);  
    }
});
