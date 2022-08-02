import {
  getRandomNumber,
} from './other.js';
import elements from './elements.js';
const {
  overlay,
  vendorId,
} = elements;

import render from './render.js';
const {
  putRowIndex,
  getTotalGoodPrice,
} = render;


const openModal = () => {
  overlay.classList.add('active');
  const goodId = getRandomNumber(14);
  vendorId.textContent = goodId;
};

const closeModal = () => {
  overlay.classList.remove('active');
};

const deleteItemRow = (arr, id) => {
  arr.forEach((item, index) => {
    if (item.id == id) {
      arr.splice(index, 1);
    }
  });
  getTotalGoodPrice(arr);
  putRowIndex();
};

export default {
  openModal,
  closeModal,
  deleteItemRow,
};
