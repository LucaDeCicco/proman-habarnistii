import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {boardsManager} from "./boardsManager.js";

export let statusesManager = {
    loadstatuses: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        // domManager.addChild(`.board-columns`, `<button class="add-card" data-board-id="${boardId}">Add new card</button>`)
        for (let status of statuses) {
            const statusesBuilder = htmlFactory(htmlTemplates.statuses);
            const content = statusesBuilder(boardId, status);
            const statusesBuilderNew = htmlFactory(htmlTemplates.statusesNew);
            const contentNew = statusesBuilderNew(boardId, status)
            console.log('de cate ori trece')
            // domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);

            if (status.id === 1){
                console.log('primul buton')
                domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, contentNew)
            }
            else {
                domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);
                console.log('else')
            }
            let statusId = status.id
            console.log(statusId)
            let statusColumn = document.querySelector(`.status-title[data-status-id="${statusId}"]`)
            console.log(statusColumn)
            if (statusId > 1) {
                console.log('intra in if > 1 id')
                const deleteStatusBtn = document.querySelector(`[data-status-delete-id="${statusId}"]`)
                console.log(deleteStatusBtn)
                deleteStatusBtn.addEventListener("click", () => {
                    console.log('status delete btn')
                    console.log(statusId)
                    dataHandler.deleteStatus(statusId)
                })
            }
            statusColumn.addEventListener('click', () => {

                statusColumn.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') {
                        const statusTitle = statusColumn.innerHTML
                        console.log(statusTitle)
                        dataHandler.editStatusTitle(statusTitle, statusId)
                        let page = document.querySelector('#root')
                        page.innerHTML = ""
                        setTimeout(() => {
                            boardsManager.loadBoards()

                        }, 100)
                    }
                });

            })
        }
        let newStatusBtn = `<button type="button" class="btn btn-secondary btn-sm addStatus" data-board-id="${boardId}">Add new status</button>`
        domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, newStatusBtn);
        const addStatusBtn = document.querySelector(`.addStatus[data-board-id="${boardId}"]`)
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
                dataHandler.createNewStatus(statusTitle)
                const modalElem = document.querySelector("#exampleModal")
                modalElem.remove()
                const page = document.querySelector('#root')
                page.innerHTML = ""
                boardsManager.loadBoards()
            })
        })
    },
};

function deleteButtonHandler(eventListener) {

}
