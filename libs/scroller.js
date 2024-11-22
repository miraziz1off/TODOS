const historiesContainer = document.querySelector('.histories');

let isDragging = false;
let startX;
let scrollLeft;

historiesContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
    historiesContainer.classList.add('active');  
    startX = e.pageX - historiesContainer.offsetLeft;
    scrollLeft = historiesContainer.scrollLeft;
});

historiesContainer.addEventListener('mouseleave', (e) => {
    e.preventDefault();
    isDragging = false;
    historiesContainer.classList.remove('active');
});
historiesContainer.addEventListener('mouseup', () => {
    isDragging = false;
    historiesContainer.classList.remove('active');
});

historiesContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - historiesContainer.offsetLeft;
    const walk = (x - startX) * 1; 
    historiesContainer.scrollLeft = scrollLeft - walk;
});


