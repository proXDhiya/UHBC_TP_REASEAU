let li;
const btn = document.querySelector('.btn');

const decryptMessage = async (msg, k) => {
    // http://localhost:8000/decrypt/ [POST]
    let response;
    try {
        response = await fetch('http://localhost:8000/decrypt/', {
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
        key.style.outline = '2px solid red';
        alert('Wrong Key! Please try again with 128 bits.key');
    }
    return false;
};

// wait for the DOM to finish loading and then wait 2 seconds before running the function
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // get all the list items
        li = document.querySelectorAll('li');
    }, 2000);
});

// get the new changes every 1 second
setInterval(() => {
    li = document.querySelectorAll('li');
}, 1000);

// if key clicked, remove the red outline
key.addEventListener('click', () => {
    key.style.outline = 'none';
});

// event listener for the button
btn.addEventListener('click', async () => {
    for (let i = 0; i < li.length; i++) {
        let encryptedMessage = li[i].children[0].children[0].textContent;
        let decryptedMessage = li[i].children[1].children[0];
        const temp = await decryptMessage(encryptedMessage, key.value);
        if (!temp) break;
        decryptedMessage.textContent = temp;
    }
});
