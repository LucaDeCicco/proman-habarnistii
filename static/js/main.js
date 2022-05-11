import {boardsManager} from "./controller/boardsManager.js";
import {domManager} from "./view/domManager.js";
import {dataHandler} from "./data/dataHandler.js";

function init() {
    boardsManager.loadBoards();
    const createBoardBtn = document.querySelector('#createboard')
    createBoardBtn.addEventListener('click', () => {dataHandler.createNewBoard('ceva');document.querySelector('#root').innerHTML="" ; boardsManager.loadBoards()})

}

init();
