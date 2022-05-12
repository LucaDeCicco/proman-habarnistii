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
            let isNotClick = true

            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click", async (event) => {
                    if (isNotClick) {
                        showHideButtonHandler(event)
                        isNotClick = false
                        document.querySelector(`.toggle-board-button[data-board-id="${board.id}"]`).innerHTML = "x"
                        await domManager.addChild(`.board-columns[data-board-id="${board.id}"]`, `<button class="add-card" data-board-id="${board.id}">Add new card</button><br>`)
                        addNewCard()


                    } else {
                        document.querySelector(`.board-columns[data-board-id="${board.id}"]`).innerHTML = ""
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

    statusesManager.loadstatuses(boardId);

    cardsManager.loadCards(boardId);

}

function addNewCard() {
    const addNewCardBtn = document.querySelector('.add-card')
    addNewCardBtn.addEventListener('click', () => {
        console.log(addNewCardBtn)

    })
}