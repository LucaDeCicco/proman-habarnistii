export const htmlTemplates = {
    board: 1, card: 2, statuses: 3, modal: 4, statusesNew: 5,
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder, [htmlTemplates.statuses]: statusesBuilder, [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.modal]: createModal, [htmlTemplates.statusesNew]: statusesBuilderNew,
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    // return'<h1>boardbuilder</h1>'
    return `<div class="board-container">
                <div id="${board.id}" class="board-content">
<!--                contenteditable="true"-->
                    <span contenteditable="true" class="board boardtitle" data-board-id="${board.id}">${board.title}</span>
                    <button class="delete-board-button" data-board-id="${board.id}">🗑</button>
                    <div class="putHereSaveBtn" data-board-id="${board.id}"></div>
                    <button class="toggle-board-button" data-board-id="${board.id}">v</button>
                    <br>
<!--                    <div class="content"></div>-->
                    <div class="board-columns" data-board-id="${board.id}"></div>
                </div>
            </div>
            <br>`;

//     return `<div className="accordion" id="accordion${board.id}">
//         <div className="accordion-item">
//             <h2 className="accordion-header" id="heading${board.id}">
//                 <button className="accordion-button" type="button" data-bs-toggle="collapse"
//                         data-bs-target="#collapse${board.id}" aria-expanded="true" aria-controls="#collapse${board.id}">
//                     Accordion Item #1
//                 </button>
//             </h2>
//             <div id="collapse${board.id}" className="accordion-collapse collapse show" aria-labelledby="heading${board.id}"
//                  data-bs-parent="#accordion${board.id}">
//                 <div className="accordion-body">
//                     <div id="coloane${board.id}" ></div>
//                 </div>
//             </div>
//         </div>
// </div>`
}


function statusesBuilder(boardId, status) {
    return `<div class="board-column" data-board-id="${boardId}" data-status-id="${status.id}">
<span contenteditable="true" class="status-title" data-status-id="${status.id}">${status.title}</span>
<button class="delete-board-button" data-status-delete-id="${status.id}">🗑</button>
</div>`;
}

function statusesBuilderNew(boardId, status) {
    return `<div class="board-column" data-board-id="${boardId}" data-status-id="${status.id}">
<span contenteditable="true" class="status-title" data-status-id="${status.id}">${status.title}</span>
</div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">
    <span>${card.title}</span>
    <button class="delete-board-button" data-card-id="${card.id}">🗑</button>
</div>`;
}

function createModal() {
    return `<div class="modal fade show" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" style="display: block">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Board title</h5>
        <button type="button" class="btn-close" id="closemodal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
<!--        <p>aici sa punem input</p>-->
        <input id="newboardtitle">
<!--      </div>-->
<!--      <div class="modal-footer">-->
        <button type="button" class="btn btn-primary" id="savenewboard">Save changes</button>
      </div>
    </div>
  </div>
</div>`
}
