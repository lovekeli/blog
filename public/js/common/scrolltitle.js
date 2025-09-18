function scrollTitle() {
    const originalTitle = document.title;
    const titleLength = originalTitle.length;
    let currentIndex = 0;

    function updateTitle() {
        const newTitle = originalTitle.slice(currentIndex) + originalTitle.slice(0, currentIndex);
        document.title = newTitle;
        currentIndex = (currentIndex + 1) % titleLength;
    }
    setInterval(updateTitle, 500);
}
scrollTitle();