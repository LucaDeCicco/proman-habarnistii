export const htmlTemplates = {
    board: 1, card: 2, statuses: 3, modal: 4
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder, [htmlTemplates.statuses]: statusesBuilder, [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.modal]: createModal,
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
    console.log("htmlfac")
    return `<div class="board-container">
                <div id="${board.id}">
                    <span class="board" data-board-id=${board.id}>${board.title}</span>
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
    return `<div class="board-column" data-board-id="${boardId}" data-status-id="${status.id}">${status.title}</div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

function createModal() {
    return `<div class="modal fade show" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" style="display: block">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" id="closemodal" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`
}
