import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let statusesManager = {
    loadstatuses: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        console.log(statuses)

        for (let status of statuses) {
            const statusesBuilder = htmlFactory(htmlTemplates.statuses);
            const content = statusesBuilder(boardId, status);
            console.log('statuses')
            console.log(content)
            // domManager.addChild(`.content`, content);
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);

            // domManager.addEventListener(
            //     `.card[data-card-id="${card.id}"]`,
            //     "click",
            //     deleteButtonHandler
            // );
        }
    },
};

function deleteButtonHandler(eventListener) {

}
