"use strict";

const submit = document.querySelector('.submit');
const allComments = document.querySelector('.all-comments');
const userName = document.querySelector('.name');
const textArea = document.querySelector('.textarea');
const date = document.querySelector('.date');
const commentList = document.getElementsByClassName('trashcan');
const button = document.querySelector('.submit');
const errorName = document.querySelector('.error-name');
const errorComment = document.querySelector('.error-comment');


submit.addEventListener('click', (event) => handleSubmit(event));

function handleSubmit(event) {

  event.preventDefault();
  const comment = document.createElement('div');
  const creationTime = document.createElement('p');
  const trashcan = document.createElement('img');
  const like = document.createElement('img');
  const putItLike = document.createElement('button');

  like.className = 'like';
  trashcan.src = '/src/images/dustbin_120823.svg';
  trashcan.onclick = () => comment.remove();
  like.src = '/src/images/heart-shape-outline_icon-icons.com_73534.svg';
  comment.className = 'comment';
  putItLike.textContent = 'Поставь лайк)';
  putItLike.addEventListener('click', () => toggleClass(like));


  allComments.appendChild(comment);

  if (userName.value && textArea.value) {
    comment.appendChild(getInputUser(userName));
    comment.appendChild(getInputUser(textArea));
    comment.appendChild(trashcan);
    comment.appendChild(putItLike);
    comment.appendChild(like);
    comment.appendChild(creationTime);
  }
  date.value ? creationTime.textContent = todayOrYesterday(date.value) + setT() :
    creationTime.textContent = 'сегодня ' + setT();


}

function getInputUser(data) {

  const paragraph = document.createElement('p');
  paragraph.textContent = data.value;
  return paragraph;

}

function setT() {
  let currentDate = new Date();
  let times = currentDate.getHours() + ':' + currentDate.getMinutes();
  return times;
}

function todayOrYesterday(day) {
  let result;
  let currentDate = new Date();

  function month(d) {

    let altMonth;
    d.getMonth() < 10 ? altMonth = '0' + (d.getMonth() + 1) :
      altMonth = d.getMonth() + 1;

    return altMonth;
  }
  let today = currentDate.getFullYear() + '-' + month(currentDate) + '-' + currentDate.getDate();
  let yesterday = currentDate.getFullYear() + '-' + month(currentDate) + '-' + (currentDate.getDate() - 1);
  console.log(today);
  if (day == today) result = 'сегодня ';
  else if (day == yesterday) result = 'вчера ';
  else result = day;

  return result;
}

textArea.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) handleSubmit(event)
});


userName.onblur = function () {
  if (!this.value) {
    errorName.textContent = 'Поле обязательно к заполненю.'
  }
};

userName.onfocus = function () {
  errorName.textContent = "";

};

textArea.onblur = function () {
  if (!this.value) {
    errorComment.textContent = 'Поле обязательно к заполненю.'
  }
};

textArea.onfocus = function () {
  errorComment.textContent = "";

};

function toggleClass(element) {
  if (element.classList.contains("like")) {
    element.classList.remove("like");
  } else {
    element.classList.add("like");
  }
}

// поиски репозиториев

const formGit = document.forms.github;
const searchStr = formGit.elements.searchStr;
searchStr.classList.add('search-str');
searchStr.onfocus = function () { this.classList.remove('error-search'); }
const listRepo = document.querySelector('.list-repo');

formGit.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchQuery = searchStr.value;

  if (!searchQuery) {
    searchStr.classList.add('error-search');
    setTimeout(function () {
      alert('Поле надо заполнить иначе ничего не найдешь.')
    }, 250);
  }

  else {
    const url = `https://api.github.com/search/repositories?q=${searchQuery}&per_page=10`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const repositories = data.items;
        if (repositories.length == 0) alert('Ничего не найдено. Прости.');
        repositories.forEach(element => {
          const repoEl = document.createElement('div');
          repoEl.className = 'repo'

          const lang = document.createElement('p');
          lang.textContent = `language: ${element.language}`;

          const home = document.createElement('p');
          home.innerHTML = `homepage: ${element.homepage}`;

          const nameEl = document.createElement('a');
          nameEl.href = element.html_url;
          nameEl.textContent = element.name;
          nameEl.target = '_blank';

          repoEl.appendChild(nameEl);
          repoEl.appendChild(lang);
          repoEl.appendChild(home);

          listRepo.appendChild(repoEl);
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

})


//html_url





/* const searchQuery = 'odyssey'; // задаем подстроку для поиска
const url = `https://api.github.com/search/repositories?q=${searchQuery}`; // формируем URL для запроса
fetch(url)
  .then(response => response.json())
  .then(data => {
    const repositories = data.items; // получаем список репозиториев из ответа
    console.log(repositories); // выводим список репозиториев в консоль
  })
  .catch(error => {
    console.log(error); // обрабатываем возможную ошибку
  }); */















