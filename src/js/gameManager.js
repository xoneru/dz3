// window.addEventListener('load', startGame);
// document.body.style.overflow = 'hidden';// на случай изменение количества по высоте

export default class GameManager {
    constructor() {
      this.amountLines = 4;// можно менять, но не решена проблема высоты элементов,
      this.amountСolumns = 4; // они могут не влезть в окно
  
      this.indexGoblin = null;
  
      this.interval = 1000;
      this.timetId = null;
  
      this.board = document.querySelector('.board');
      this.elements = [];
  
      this.countShow = 0;
      this.containerShow = document.querySelector('.control_show span');
    }
  
    startGame() {
      this.createItemBoard(this.board); // прорисовали поле
      this.generateGoblin(); // создали гоблина
      this.intervalGenerateGoblin(this.interval); // меняем положение гоблина каждую секунду
    }
  
    createItemBoard(board) { // прорисовка поля
      for (let i = 0; i < this.amountLines; i += 1) {
        const tr = document.createElement('tr');
        board.appendChild(tr);
        for (let j = 0; j < this.amountСolumns; j += 1) {
          const item = document.createElement('td');
          tr.appendChild(item);
          item.classList.add('board-item');
        }
      }
      return board;
    }
  
    clearBoard() {
      while (this.board.lastElementChild) {
        this.board.removeChild(this.board.lastElementChild);
      }
    }
  
    clearAll() { // убирает класс гоблин там где он есть
      this.elements = document.getElementsByTagName('td');
      for (let i = 0; i < this.elements.length; i += 1) {
        this.elements[i].className = 'board-item';
      }
    }
  
    generateGoblin() {
      this.elements = document.getElementsByTagName('td');
      const indNew = Math.floor(Math.random() * this.elements.length);
  
      if (indNew === this.indexGoblin) {
        this.generateGoblin();
      } else {
        this.indexGoblin = indNew;
        this.elements[indNew].classList.add('goblin');
      }
    }
  
    intervalGenerateGoblin(interval) {
      this.timetId = setInterval(() => {
        this.clearAll();
        this.generateGoblin();
        this.countShow += 1;
        this.containerShow.textContent = this.countShow;
      }, interval);
    }
  
    stopGenerateGoblin() {
      clearInterval(this.timetId);
      this.clearAll();
    }
  }