// Функция для обработки кликов и установки активного элемента
function selectNavItem(item) {
  // Убираем класс active со всех элементов
  const navItems = document.querySelectorAll(".bottom-nav .nav-item");
  navItems.forEach((el) => el.classList.remove("active"));

  // Добавляем класс active к выбранному элементу
  item.classList.add("active");
}
