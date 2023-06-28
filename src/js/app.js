import GameManager from './gameManager';
import EventsManager from './eventsManager';

const gameManager = new GameManager();

const eventsManager = new EventsManager(gameManager);
eventsManager.init();