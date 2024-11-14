document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");
  const petButton = document.getElementById("pet-button");
  const hand = document.getElementById("hand");
  const avatar = document.querySelector(".avatar");
  const input = document.getElementById("message-input");
  const messagesList = document.getElementById("messages");

  // Обработчик отправки формы
  document
    .getElementById("message-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Предотвращаем отправку формы
      const messageText = input.value;

      if (messageText) {
        addMessage(messageText);
        input.value = ""; // Очищаем поле ввода
        input.focus(); // Устанавливаем фокус обратно на поле ввода
      }
    });

  function addMessage(text) {
    const li = document.createElement("li");
    li.textContent = text;
    messagesList.appendChild(li);

    // Прокручиваем вниз, чтобы видеть последнее сообщение
    messagesList.scrollTop = messagesList.scrollHeight;
  }

  // Анимация руки
  function animateHand() {
    hand.style.display = "flex";

    const movementDistance = 10; // Дистанция движения
    const duration = 250; // Длительность каждой анимации
    let startPos = avatar.offsetLeft; // Начальная позиция
    let currentPos = startPos;

    function moveRight() {
      if (currentPos < startPos + movementDistance) {
        currentPos += 2; // Движение вправо
        hand.style.left = `${currentPos}px`;
        requestAnimationFrame(moveRight);
      } else {
        currentPos = startPos + movementDistance; // Устанавливаем финальную позицию по горизонтали вправо
        setTimeout(moveLeft, duration); // Ждем, затем движем влево
      }
    }

    function moveLeft() {
      if (currentPos > startPos) {
        currentPos -= 2; // Движение влево
        hand.style.left = `${currentPos}px`;
        requestAnimationFrame(moveLeft);
      } else {
        currentPos = startPos; // Возвращаемся на исходную позицию
        setTimeout(moveRightAgain, duration); // Ждем, затем движем вправо снова
      }
    }

    function moveRightAgain() {
      if (currentPos < startPos + movementDistance) {
        currentPos += 2; // Движение вправо
        hand.style.left = `${currentPos}px`;
        requestAnimationFrame(moveRightAgain);
      } else {
        currentPos = startPos + movementDistance; // Устанавливаем финальную позицию по горизонтали вправо
        setTimeout(moveLeftAgain, duration); // Ждем, затем движем влево снова
      }
    }

    function moveLeftAgain() {
      if (currentPos > startPos) {
        currentPos -= 2; // Движение влево
        hand.style.left = `${currentPos}px`;
        requestAnimationFrame(moveLeftAgain);
      } else {
        currentPos = startPos; // Возвращаемся на исходную позицию
        setTimeout(finalMove, duration); // Ждем, затем финальная анимация
      }
    }

    function finalMove() {
      if (currentPos < startPos + movementDistance) {
        currentPos += 2; // Движение вправо
        hand.style.left = `${currentPos}px`;
        requestAnimationFrame(finalMove);
      } else {
        // Затухание
        hand.style.opacity = "0";
        setTimeout(() => {
          hand.style.display = "none"; // Скрываем элемент после исчезновения
          hand.style.opacity = "1"; // Восстанавливаем видимость для следующего нажатия
        }, 1000); // Прячем через 1 секунду
      }
    }

    moveRight(); // Запускаем анимацию
  }

  // Обработчик нажатия на кнопку "Погладить кота"
  petButton.addEventListener("click", (event) => {
    event.preventDefault();
    animateHand();

    avatar.classList.remove("squashing");
    // Добавляем анимацию аватара
    avatar.classList.add("squashing");
    setTimeout(() => {
      avatar.classList.remove("squashing");
    }, 1000);
  });

  // Обработчик нажатия на кнопку меню
  menuButton.addEventListener("click", () => {
    menu.classList.toggle("active"); // Переключаем класс active для отображения меню
  });

  // Закрываем меню, если кликнули вне его
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && event.target !== menuButton) {
      menu.classList.remove("active"); // Убираем класс active, если кликнули вне меню
    }
  });
});
