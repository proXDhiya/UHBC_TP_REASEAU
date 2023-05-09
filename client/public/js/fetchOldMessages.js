const fetchOldMessages = async () => {
    // http://localhost:3000/message
    const response = await fetch('http://localhost:3000/message');
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
        var item = document.createElement('li');
        item.textContent = data[i];
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    }
};

fetchOldMessages();
