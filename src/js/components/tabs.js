// import { gsap } from "gsap";

// const tabsItems = document.querySelectorAll('.hero__strip');
// const tabsContent = document.querySelectorAll('.history__content');
// const historySection = document.querySelector('.history');
// tabsItems.forEach(item => item.addEventListener('click', event => {
//     const tabsItemTarget =  event.target.getAttribute('data-story');
//     const color = event.target.getAttribute('data-color');
//     tabsItems.forEach(elem =>elem.classList.remove('strip--active'));
//     tabsContent.forEach(elem => elem.classList.add('history__hidden'));
//     historySection.style.backgroundColor = color;
//     item.classList.add('strip--active');
    
//     document.getElementById(tabsItemTarget).classList.remove('history__hidden');
// }))

import { gsap } from "gsap";

const tabsItems = document.querySelectorAll('.hero__strip');
const historySection = document.querySelector('.history');
let activeTabContent = null;  // Переменная для хранения текущей активной вкладки
let isAnimating = false;      // Флаг для отслеживания состояния анимации

tabsItems.forEach(item => item.addEventListener('click', event => {
    // Если в данный момент выполняется анимация, прерываем выполнение
    if (isAnimating) {
        return;
    }

    const tabsItemTarget = event.target.getAttribute('data-story');
    const color = event.target.getAttribute('data-color');
    const targetContent = document.getElementById(tabsItemTarget);

    // Если нажата уже активная вкладка, ничего не делаем
    if (activeTabContent === targetContent) {
        return;
    }

    // Удаляем активные классы и скрываем все вкладки
    tabsItems.forEach(elem => elem.classList.remove('strip--active'));

    // Добавляем активный класс к выбранной вкладке
    item.classList.add('strip--active');

    // Устанавливаем фиксированную высоту для historySection
    historySection.style.height = "600px";

    // Изменяем цвет фона секции
    historySection.style.backgroundColor = color;

    // Устанавливаем флаг анимации в true
    isAnimating = true;

    // Закрываем текущую активную вкладку, если она есть
    if (activeTabContent) {
        gsap.to(activeTabContent, { opacity: 0, y: 20, duration: 0.5, onComplete: () => {
            activeTabContent.classList.add('history__hidden');
            // Открываем новую вкладку
            openNewTab(targetContent);
        }});
    } else {
        // Если нет активной вкладки, просто открываем новую
        openNewTab(targetContent);
    }
}));

function openNewTab(content) {
    gsap.fromTo(content, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, onStart: () => {
        content.classList.remove('history__hidden');
    }, onComplete: () => {
        // Сбрасываем флаг анимации после завершения анимации
        isAnimating = false;
    }});
    activeTabContent = content;
}

