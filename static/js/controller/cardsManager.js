import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            let statusId = card['status_id']
            domManager.addChild(`.board-column[data-board-id="${boardId}"][data-status-id="${statusId}"]`, content);
            const deleteCardBtn = document.querySelector(`[data-card-id="${card.id}"]`)
            deleteCardBtn.addEventListener('click', () => {
                console.log(card.id)
            })

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
