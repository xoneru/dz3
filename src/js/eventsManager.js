export default class EventsManager {
    constructor(gameManager) {
      this.gameManager = gameManager;
  
      this.button = document.querySelector('.button'); // кнопка новая игра
      this.miss = document.querySelector('.miss'); // сообщ вы проиграли
      this.wins = document.querySelector('.wins'); // сообщ вы победили
      this.modal = document.querySelector('.modal');
  
      this.countWins = 0; // счетчик попаданий
      this.countMiss = 0; // счетчик промахов
  
      this.countShow = this.gameManager.countShow; // счетчик поялений(пришел из генерации)
      this.eventShow = null;
  
      this.containerWins = document.querySelector('.control_wins span'); // счетчик на экране
      this.containerMiss = document.querySelector('.control_miss span');
    }
  
    init() { // стартовать игру
      this.gameManager.startGame();
      this.clickItem(); // следим за кликами
      this.eventShowGoblin(this.gameManager.interval); // считаем появления гоблина
      this.button.addEventListener('click', this.onClickNewGame());// следим за кнопкой(пока скрыта)
    }
  
    clickItem() { // проверяет попал или нет
      const field = document.getElementsByTagName('td'); // массив всех ячеек
      for (let i = 0; i < field.length; i += 1) {
        field[i].addEventListener('click', () => { // следим за кликами по ячейкам
          if (field[i].classList.contains('goblin')) { // если в ячейке стоял гоблин
            this.countWins += 1; // добавить в очкам попадания
            this.containerWins.textContent = this.countWins;// изменить счетчик на экране
            field[i].className = 'board-item';
          } else { // гоблина не было
            this.countMiss += 1; // добавить к промахам
            this.containerMiss.textContent = this.countMiss;// изменить счетчик на экране
          }
          this.countsControl(this.gameManager.countShow, this.countMiss, this.countWins);
          // контроль счетчиков после каждого клика
        });
      }
    }
  
    eventShowGoblin(interval) {
      this.eventShow = setInterval(() => {
        this.countsControl(this.gameManager.countShow, this.countMiss, this.countWins);
      }, interval);
    }
  
    showModal() { // показывает всплывающее окно
      this.modal.classList.remove('hidden');
      this.button.classList.remove('hidden');// показываем кнопку
      this.gameManager.stopGenerateGoblin();// перестаем генерить гоблина
      clearInterval(this.eventShow);// перестаем проверять появления
    }
  
    closeModal() { // скрываем все элементы всплывающего окна
      this.modal.classList.add('hidden');
      this.button.classList.add('hidden');
      if (!this.miss.classList.contains('hidden')) {
        this.miss.classList.add('hidden');
      }
      if (!this.wins.classList.contains('hidden')) {
        this.wins.classList.add('hidden');
      }
    }
  
    onClickNewGame() { // нажата новая игра
      this.button.addEventListener('click', () => {
        this.resetCounts();
        this.closeModal(); // закрыть всплывающее окно
        this.button.removeEventListener('click', this.onClickNewGame);
        this.gameManager.clearBoard();
  
        this.gameManager.stopGenerateGoblin();// перестаем генерить гоблина
        clearInterval(this.eventShow);// перестаем проверять появления
        this.init(); // стартовать игру
      });
    }
  
    countsControl(countShow, countMiss, countWins) { // контроль счетчиков
      if ((countShow - countWins) >= 5 || countMiss >= 5) {
        this.showModal(); // показываем всплывающее окно
        this.miss.classList.remove('hidden');// показываем вы проиграли
      }
      if (countWins >= 10) {
        this.showModal(); // показываем всплывающее окно
        this.wins.classList.remove('hidden');// показываем вы победили
      }
    }
  
    resetCounts() { // обнуляем все счетчики
      this.countMiss = 0;
      this.countWins = 0;
      this.gameManager.countShow = 0;
      this.containerWins.textContent = this.countWins;
      this.containerMiss.textContent = this.countMiss;
      this.gameManager.containerShow.textContent = this.gameManager.countShow;
    }
  }