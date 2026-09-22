const themeItems = document.querySelectorAll('.theme-selector__item');

function setTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');

    themeItems.forEach(item => {
        item.classList.toggle(
            'theme-selector__item--active',
            item.dataset.theme === theme
        );
    });

    localStorage.setItem('theme', theme);
}

themeItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();

        setTheme(item.dataset.theme);
    });
});

// Восстанавливаем тему
const savedTheme = localStorage.getItem('theme') || 'light';

setTheme(savedTheme);