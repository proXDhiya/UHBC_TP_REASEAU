const fetchOldMessages = async () => {
    // http://localhost:3000/message
    const response = await fetch('http://localhost:3000/message');
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
        let item = document.createElement('li');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        span1.textContent = data[i];
        span2.textContent = "";
        p1.textContent = "Encrypted Message: ";
        p1.appendChild(span1);
        p2.textContent = "Decrypted Message: ";
        p2.appendChild(span2);
        item.appendChild(p1);
        item.appendChild(p2);
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    }
};

fetchOldMessages();
