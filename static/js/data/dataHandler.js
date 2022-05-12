export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function () {
        return await apiGet("/api/columns")
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        return await apiGet(`/api/boards/${boardTitle}/createboard`);

        // creates new board, saves it and calls the callback function with its data
    },
    editBoardTitle: async function (newBoardTitle, boardId) {
        return await apiGet(`/api/boards/${newBoardTitle}/${boardId}/editboardtitle`)
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    },
    createNewStatus: async function (statusTitle, boardId) {
        return await apiGet(`/api/status/${statusTitle}`)
    },
    editStatusTitle: async function (statusTitle, statusId) {
        return await apiGet(`/api/edit/status/title/${statusTitle}/${statusId}`)
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
}

async function apiDelete(url) {
}

async function apiPut(url) {
}

async function apiPatch(url) {
}
