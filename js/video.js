document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const videoFrame = document.getElementById('video-frame');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const videoUrl = thumbnail.getAttribute('data-video');
            videoFrame.setAttribute('src', videoUrl);
        });
    });
});