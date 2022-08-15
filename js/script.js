import render from './modules/render.js';
const {
  putRowIndex,
  getModalPrice,
  getTotalGoodPrice,
  createRow,
  renderGoods,
} = render;

import functional from './modules/functional.js';
const {
  openModal,
  closeModal,
  deleteItemRow,
} = functional;

import elements from './modules/elements.js';
const {
  modalForm,
  modalCheckbox,
  modalDiscountInput,
  table,
  overlay,
  btnAdd,
  vendorId,
} = elements;

const goods = [{
    'id': 1,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': 'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    'category': 'mobile-phone',
    'discont': false,
    'count': 3,
    'units': 'шт',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 2,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': 'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
    'category': 'toys',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    },
  },
  {
    'id': 3,
    'title': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': 'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
    'category': 'tv-box',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 4,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': 'Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.',
    'category': 'cables',
    'discont': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

{
  const init = (goods) => {
    renderGoods(goods);
    getTotalGoodPrice(goods);
    btnAdd.addEventListener('click', openModal);

    overlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('overlay') ||
        target.closest('.modal__close')) {
        closeModal();
      }
    });

    table.addEventListener('click', e => {
      if (e.target.closest('.table__btn_del')) {
        const row = e.target.closest('.table__row');
        row.remove();
        const rowId = row.children[1].dataset.id;
        deleteItemRow(goods, rowId);
      }

      if (e.target.closest('.table__btn_pic')) {
        const url = e.target.dataset.pic;
        const win = open('about:blank', '', 'width=800,height=600,location=no');
        win.document.body.style.background = `url('${url}') no-repeat`;
        win.document.body.style.backgroundSize = `cover`;
        win.document.body.style.backgroundPosition = `center`;
        // console.log(screen.height, screen.width);
        win.moveTo(screen.width / 2 - 400, screen.height / 2 - 300);
      }
    });

    modalCheckbox.addEventListener('change', () => {
      if (modalCheckbox.checked) {
        modalDiscountInput.disabled = false;
      } else {
        modalDiscountInput.disabled = true;
        modalDiscountInput.value = '';
      }
    });

    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const newElem = Object.fromEntries(formData);

      newElem.id = vendorId.textContent;
      goods.push(newElem);

      const newRow = createRow(newElem);

      table.insertAdjacentHTML('beforeend', newRow);

      closeModal();
      modalForm.reset();
      getTotalGoodPrice(goods);
      putRowIndex();
    });

    modalForm.count.addEventListener('change', getModalPrice);
    modalForm.price.addEventListener('change', getModalPrice);
  };

  window.crmInit = init;
}

crmInit(goods);
