document.addEventListener('DOMContentLoaded', (event) => {
    const conversationItems = document.querySelectorAll('.list-group-item');

    conversationItems.forEach(item => {
       item.addEventListener('click', () => {
        item.classList.remove('unread');
       });
    });
});