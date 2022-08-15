import elements from './elements.js';
const {
  modalForm,
  table,
  crmTotalPrice,
} = elements;

const putRowIndex = () => {
  const rowsIndex = document.querySelectorAll('.table__cell_index');
  rowsIndex.forEach((item, index) => {
    item.textContent = index + 1;
  });
};

const getModalPrice = () => {
  const count = modalForm.count.value;
  const price = modalForm.price.value;
  modalForm.total.value = `$ ${count * price}`;
};

const getTotalGoodPrice = (goods) => {
  let totalPrice = 0;
  goods.forEach(item => {
    totalPrice += item.price * item.count;
  });
  crmTotalPrice.textContent = `$ ${totalPrice}`;
};

const createRow = (obj) => {
  const string = `<tr class="table__row">
  <td class="table__cell table__cell_index">2</td>
  <td class="table__cell table__cell_left table__cell_name" data-id="${obj.id}">
    <span class="table__cell-id">id: ${obj.id}</span>${obj.title}</td>
  <td class="table__cell table__cell_left">${obj.category}</td>
  <td class="table__cell">${obj.units}</td>
  <td class="table__cell">${obj.count}</td>
  <td class="table__cell">$${obj.price}</td>
  <td class="table__cell">$${obj.count * obj.price}</td>
  <td class="table__cell table__cell_btn-wrapper">
    <button class="table__btn table__btn_pic" data-pic="https://steamuserimages-a.akamaihd.net/ugc/776234950410894383/64AAB79ABC73B74A688A2A9E5D5279B8C821DDC7/"></button>
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
  putRowIndex();
};

export default {
  putRowIndex,
  getModalPrice,
  getTotalGoodPrice,
  createRow,
  renderGoods,
};
