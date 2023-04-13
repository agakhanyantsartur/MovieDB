/* Задания

1) Удалить все рекламные блоки со страницы

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img, при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов 

6) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

7) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

8) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

9) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

10) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'), //у метода querySelectorAll() нет метода innerHTML поэтому используем просто querySelector()
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => { 
        event.preventDefault();

        const newFilm = addInput.value;
        const favorite = checkbox.checked; //чтобы получить булиновое значение

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавляем любимый фильм")
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList);
        }
        

        event.target.reset() //Обращаемя к тому элементу над которым происходит событие
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove(); //Удаление рекламы
        });
    };
    
    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")'; //при комбинировании ковычек нужно менять их, а не использовать какие то одни
    };

    const sortArr = (arr) => { //Function experssion вызываются только после того как были созданы
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = ""; // очищаем элемент
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {  //Если хотим навесить на все различные элементы одно и то же событие, мы используем forEach()
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1); // Вырезает элемент с массива и сгчало помещаем номер с которго нужно начать i, а потом сколько элементов нужно удалить
                createMovieList(films, parent); // чтобы после удаления фильмов, нумерация менялась 
            });
        });
    }
    
    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

});