let socket = io();

let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');
let key = document.getElementById('key');

const encrypt = async (msg, k) => {
    // http://localhost:3000/encrypt/ [POST]
    let response;
    try {
        response = await fetch('http://localhost:8000/encrypt/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: msg,
                key: k
            })
        });
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (input.value && key.value) {
        const encryptedMessage = await encrypt(input.value, key.value);
        socket.emit('chat message', encryptedMessage);
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
