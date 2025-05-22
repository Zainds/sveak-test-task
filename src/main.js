import "./style.scss";

const burger = document.querySelector(".burger");
const burgerNavList = document.querySelector(".header__nav .nav__list");
const sidebarNavList = document.querySelector(".sidebar__nav .nav__list");
const body = document.body;
const navCloseBtn = document.querySelector(".header__nav .nav__close-btn");

function openMenu() {
  if (burger && burgerNavList) {
    burger.classList.add("burger--open");
    burgerNavList.classList.add("nav__list--open");
    body.classList.add("menu-open");
    burger.setAttribute("aria-expanded", "true");
  }
}

function closeMenu() {
  if (burger && burgerNavList) {
    burger.classList.remove("burger--open");
    burgerNavList.classList.remove("nav__list--open");
    body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
  }
}

if (burger) {
  burger.addEventListener("click", () => {
    if (burger.classList.contains("burger--open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (navCloseBtn) {
  navCloseBtn.addEventListener("click", () => {
    closeMenu();
  });
}

// Генерация карточек
const cardsGrid = document.querySelector(".cards__grid");
const totalCards = 16;

function createCard(index) {
  const card = document.createElement("li");
  card.classList.add("card");

  const title = document.createElement("h3");
  title.classList.add("card__title");
  title.textContent = `Карточка ${index + 1}`;

  const text = document.createElement("p");
  text.classList.add("card__text");
  text.textContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna \
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
    ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  card.appendChild(title);
  card.appendChild(text);
  return card;
}

if (cardsGrid) {
  for (let i = 0; i < totalCards; i++) {
    cardsGrid.appendChild(createCard(i));
  }
}

// Логика скрытия последнего неполного ряда
function hideIncompleteLastRow() {
  if (!cardsGrid) return;

  const cards = cardsGrid.querySelectorAll(".card");
  if (cards.length === 0) return;

  cards.forEach((card) => (card.style.display = ""));

  const gridStyles = window.getComputedStyle(cardsGrid);
  const gridTemplateColumns = gridStyles.getPropertyValue(
    "grid-template-columns"
  );
  const columnsCount = gridTemplateColumns.split(" ").length;

  if (columnsCount > 0) {
    const remainder = cards.length % columnsCount;
    if (remainder !== 0) {
      const cardsToHide = remainder;
      for (let i = 0; i < cardsToHide; i++) {
        cards[cards.length - 1 - i].style.display = "none";
      }
    }
  }
}

window.addEventListener("load", () => {
  hideIncompleteLastRow();
  if (cardsGrid) {
    cardsGrid.classList.add("cards__grid--visible"); // Показываем сетку после расчетов
  }
});
window.addEventListener("resize", hideIncompleteLastRow);
