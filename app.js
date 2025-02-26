document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const mediaInput = document.getElementById('mediaInput');
    const file = mediaInput.files[0];

    if (!file) {
        alert('Please select a file to upload');
        return;
    }

    // FormData to send the file to the server
    const formData = new FormData();
    formData.append('media', file);

    try {
        // Send the file to the server (this will be a backend endpoint URL)
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            // Display uploaded content
            displayMedia(data.url);
        } else {
            alert('Error uploading file');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayMedia(url) {
    const board = document.getElementById('board');
    const mediaElement = url.endsWith('.mp4') || url.endsWith('.webm')
        ? `<video controls src="${url}"></video>`
        : `<img src="${url}" alt="Uploaded media">`;
    board.innerHTML += mediaElement;
}
