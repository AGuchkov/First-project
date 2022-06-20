"use strict"

//Запускаем скрипт после загрузки сайта
document.addEventListener('DOMContentLoaded', () => {
    //Шапка
    const headerLinks = document.querySelectorAll('.header__link[data-goto]');
    const burgerMenu = document.querySelector('.btn-menu');
    const burgerBody = document.querySelector('.header__nav');

    //Меню бургер
    if (headerLinks.length > 0) {
        headerLinks.forEach(headerLink => {
            headerLink.addEventListener("click", onMenuLinkClick);
        });

        //Плавный скролл
        function onMenuLinkClick(e) {
            const headerLink = e.target;
            if (headerLink.dataset.goto && document.querySelector(headerLink.dataset.goto)) {
                const gotoBlock = document.querySelector(headerLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                if (burgerMenu.classList.contains('_active')) {
                    document.body.classList.remove('_lock');
                    burgerMenu.classList.remove('_active');
                    burgerBody.classList.remove('_active');
                }

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                });
                e.preventDefault();
            }
        }
    }

    if (burgerMenu) {
        burgerMenu.addEventListener("click", function (e) {
            document.body.classList.toggle('_lock');
            burgerMenu.classList.toggle('_active');
            burgerBody.classList.toggle('_active');
        })
    }
    //Шапка

    // Ленивая загрузка
    const lazyLoadMap = document.getElementById('map');
    const windowHeight = document.documentElement.clientHeight;

    window.addEventListener("scroll", lazyScroll);

    function lazyScroll() {
        if (!lazyLoadMap.classList.contains('_loaded')) {
            getMap();
        }
    }

    function getMap() {
        const lazyLoadMapPos = lazyLoadMap.getBoundingClientRect().top + pageYOffset;
        if (pageYOffset > lazyLoadMapPos - windowHeight) {
            const loadMapUrl = lazyLoadMap.dataset.map;
            if (loadMapUrl) {
                lazyLoadMap.insertAdjacentHTML(
                    "beforeend",
                    `<iframe src="${loadMapUrl}"></iframe>`
                );
                lazyLoadMap.classList.add('_loaded');
            }
        }
    }
    // Ленивая загрузка

    //Таймер

    //До какой даты считаем
    const wedding = new Date('Sep 8 2021 16:00:00');

    const daysVal = document.querySelector('.time-count__days .time-count__val');
    const hoursVal = document.querySelector('.time-count__hours .time-count__val');
    const minutesVal = document.querySelector('.time-count__minutes .time-count__val');
    const secondsVal = document.querySelector('.time-count__seconds .time-count__val');

    const daysText = document.querySelector('.time-count__days .time-count__text  ');
    const hoursText = document.querySelector('.time-count__hours .time-count__text');
    const minutesText = document.querySelector('.time-count__minutes .time-count__text');
    const secondsText = document.querySelector('.time-count__seconds .time-count__text');

    const message = document.querySelector('.time-count__info');

    //Изменение окончаний в тексте
    function declOfNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    //Сколько осталось до даты
    const timeCount = () => {
        let now = new Date();
        let leftUntil = wedding - now;

        let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
        let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
        let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
        let seconds = Math.floor(leftUntil / 1000) % 60;

        daysVal.textContent = days;
        hoursVal.textContent = hours;
        minutesVal.textContent = minutes;
        secondsVal.textContent = seconds;

        daysText.textContent = declOfNum(days, ['день', 'дня', 'дней']);
        hoursText.textContent = declOfNum(hours, ['час', 'часа', 'часов']);
        minutesText.textContent = declOfNum(minutes, ['минута', 'минуты', 'минут']);
        secondsText.textContent = declOfNum(seconds, ['секунда', 'секунды', 'секунд']);

        if (leftUntil < 0) {
            daysVal.textContent = 0;
            hoursVal.textContent = 0;
            minutesVal.textContent = 0;
            secondsVal.textContent = 0;

            daysText.textContent = 'дней';
            hoursText.textContent = 'часов';
            minutesText.textContent = 'минут';
            secondsText.textContent = 'секунд';

            message.textContent = 'Кажется вы не успели!'
        }
    };

    timeCount();
    (wedding > new Date()) ? setInterval(timeCount, 1000) : clearInterval(timeCount);

    // setInterval(timeCount, 1000);

    // if (wedding < new Date()) {
    //     clearInterval(timeCount);
    // }


    //Таймер

    //Слайдер
    let swiper = new Swiper(".swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
        },
        loop: true,
    });
    //Слайдер

    //Форма
    const confirm = document.getElementsByName('confirmation');
    const quantity = document.getElementsByName('quantity');
    const formItem = document.querySelectorAll('.form__item')
    const form = document.getElementById('form');
    const formAlone = document.getElementById('formAlone');
    const formConfirm = document.getElementById('formConfirm');
    //Радио кнопки
    for (let i = 0; i < confirm.length; i++) {
        confirm[i].onchange = checkConfirm;
    }

    for (let i = 0; i < quantity.length; i++) {
        quantity[i].onchange = checkQuantity;
    }

    function checkQuantity() {
        if (this.value == 'Один') {
            formItem[3].classList.add('hidden')
        } else {
            formItem[3].classList.remove('hidden')
        }
    }

    function checkConfirm() {
        if (this.value == 'Нет') {
            formItem[2].classList.add('hidden')
            formItem[3].classList.add('hidden')
            formItem[4].classList.add('hidden')
            formItem[5].classList.add('hidden')
        } else {
            formItem[2].classList.remove('hidden')
            formItem[4].classList.remove('hidden')
            formItem[5].classList.remove('hidden')
            formAlone.checked = true;
        }
    }

    form.addEventListener('submit', formSend);
    //Отправка формы
    function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            let response = fetch('confirm.php', {
                method: 'POST',
                body: formData
            }).then(response => {
                if (response.ok) {
                    alert('Сообщение успешно отправлено!');
                    form.reset();
                    formConfirm.checked = true;
                    formItem[2].classList.remove('hidden');
                    formItem[3].classList.add('hidden');
                    formItem[4].classList.remove('hidden');
                    formItem[5].classList.remove('hidden');
                    formAlone.checked = true;
                } else {
                    alert('Ошибка!')
                }
            })
        } else {
            alert('Заполните обязательные поля!')
        }
    }
    //Валидация формы
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.parentElement.classList.contains('hidden')) {
                formRemoveError(input);
            } else if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }
    //Форма
});