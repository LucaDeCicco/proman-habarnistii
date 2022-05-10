import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {statusesManager} from "./statusesManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            // document.querySelector(`.board[data-board-id="${board.id }"] .content`).innerHTML = "" !!!!
            //
            let isNotClick = true

            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click", (event) => {
                    if (isNotClick) {
                        showHideButtonHandler(event)
                        isNotClick = false
                        document.querySelector(`.toggle-board-button[data-board-id="${board.id}"]`).innerHTML = "x"

                    } else {
                        document.querySelector(`.board-columns[data-status-id="${board.id}"]`).innerHTML = ""
                        document.querySelector(`.toggle-board-button[data-board-id="${board.id}"]`).innerHTML = "v"

                        isNotClick = true
                    }
                }
            );
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    console.log('boardId')
    console.log(boardId)
    // cardsManager.loadCards(boardId); asta va trebui sa o folosim dupa ce adaugam statusurile
    statusesManager.loadstatuses(boardId);
}
