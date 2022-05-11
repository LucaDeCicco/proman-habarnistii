import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        // const boardTitle = document.querySelector(`#boardtitle[data-board-id="${boardId}"]`)
        // console.log(boardTitle)
        const cards = await dataHandler.getCardsByBoardId(boardId);

        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            let statusId = card['status_id']
            domManager.addChild(`.board-column[data-board-id="${boardId}"][data-status-id="${statusId}"]`, content);

            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
};

function deleteButtonHandler(eventListener) {

}
