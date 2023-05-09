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
    let item = document.createElement('li');
    let p1 = document.createElement('p');
    let span1 = document.createElement('span');
    p1.textContent = "Encrypted Message: ";
    span1.textContent = msg;
    p1.appendChild(span1);
    let p2 = document.createElement('p');
    let span2 = document.createElement('span');
    p2.textContent = "Decrypted Message: ";
    span2.textContent = "";
    p2.appendChild(span2);
    item.appendChild(p1);
    item.appendChild(p2);
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
