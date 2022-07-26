'use strict';

const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const modalCheckbox = document.querySelector('.modal__checkbox');
const modalDiscountInput = document.querySelector('.modal__input_discount');
const table = document.querySelector('.table__body');
const overlay = document.querySelector('.overlay');
overlay.classList.remove('active');

const btnAdd = document.querySelector('.panel__add-goods');
const btnClose = document.querySelector('.modal__close');
const modal = document.querySelector('.modal');
const vendorId = document.querySelector('.vendor-code__id');
const modalTotalPrice = document.querySelector('.modal__total-price');
const crmTotalPrice = document.querySelector('.crm__total-price');

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

const getRandomNumber = (сharacters) => {
  const number = Math.round(Math.random() * Math.pow(10, сharacters));
  return number;
};

const createRow = (obj) => {
  const string = `<tr class="table__row">
  <td class="table__cell ">2</td>
  <td class="table__cell table__cell_left table__cell_name" data-id="${obj.id}">
    <span class="table__cell-id">id: ${obj.id}</span>${obj.title}</td>
  <td class="table__cell table__cell_left">${obj.category}</td>
  <td class="table__cell">${obj.units}</td>
  <td class="table__cell">${obj.count}</td>
  <td class="table__cell">$${obj.price}</td>
  <td class="table__cell">$${obj.count * obj.price}</td>
  <td class="table__cell table__cell_btn-wrapper">
    <button class="table__btn table__btn_pic"></button>
    <button class="table__btn table__btn_edit"></button>
    <button class="table__btn table__btn_del"></button>
  </td>
</tr>`;

  return string;
};

const renderGoods = ([...arr]) => {
  arr.forEach(item => {
    table.insertAdjacentHTML('beforeend', createRow(item));
  });
};

const openModal = () => {
  overlay.classList.add('active');
  const goodId = getRandomNumber(14);
  vendorId.textContent = goodId;
};

const closeModal = () => {
  overlay.classList.remove('active');
};

const getModalPrice = () => {
  const count = modalForm.count.value;
  const price = modalForm.price.value;
  modalForm.total.value = `$ ${count*price}`;
};

const getTotalGoodPrice = (goods) => {
  let totalPrice = 0;
  goods.forEach(item => {
    totalPrice += item.price * item.count;
  });
  crmTotalPrice.textContent = `$ ${totalPrice}`;
};

renderGoods(goods);
getTotalGoodPrice(goods);

btnAdd.addEventListener('click', openModal);

overlay.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('overlay') || target.closest('.modal__close')) {
    closeModal();
  }
});

const deleteItemRow = ([...arr], id) => {
  arr.forEach((item, index) => {
    if (item.id == id) {
      goods.splice(index, 1);
    }
  });
};

table.addEventListener('click', e => {
  if (e.target.closest('.table__btn_del')) {
    const row = e.target.closest('.table__row');
    row.remove();
    const rowId = row.children[1].dataset.id;
    deleteItemRow(goods, rowId);
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
});

modalForm.count.addEventListener('change', getModalPrice);
modalForm.price.addEventListener('change', getModalPrice);
