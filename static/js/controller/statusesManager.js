import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {boardsManager} from "./boardsManager.js";

export let statusesManager = {
    loadstatuses: async function (boardId) {
        const statuses = await dataHandler.getStatuses();


        for (let status of statuses) {
            const statusesBuilder = htmlFactory(htmlTemplates.statuses);
            const content = statusesBuilder(boardId, status);
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);
        }
        let newStatusBtn = `<button type="button" class="btn btn-secondary btn-sm addStatus" data-board-id="${boardId}">Add new status</button>`
        domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, newStatusBtn);
        console.log('e deschis board-ul')
        const addStatusBtn = document.querySelector(`.addStatus[data-board-id="${boardId}"]`)
        console.log(addStatusBtn)
        addStatusBtn.addEventListener('click', () => {
            const modal = htmlFactory(htmlTemplates.modal)()
            domManager.addChild('#root', modal)
            let modalTitle = document.querySelector('.modal-title')
            modalTitle.innerHTML = "New Status"

            const closeModal = document.querySelector('#closemodal')
            closeModal.addEventListener('click', () => {
                const modalElement = document.querySelector("#exampleModal")
                modalElement.remove()
            });
            const saveBtn = document.querySelector('#savenewboard')
            saveBtn.addEventListener('click', () => {
                const statusTitle = document.querySelector('#newboardtitle').value
                console.log(statusTitle)
                dataHandler.createNewStatus(statusTitle)
                const modalElem = document.querySelector("#exampleModal")
                modalElem.remove()
                const page = document.querySelector('#root')
                page.innerHTML = ""
                boardsManager.loadBoards()
            })
        })
        // await boardsManager.loadBoards();
    },
};

function deleteButtonHandler(eventListener) {

}
