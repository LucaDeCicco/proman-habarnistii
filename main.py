from flask import Flask, render_template, url_for, jsonify
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()

@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/api/boards/<boardTitle>/createboard")
@json_response
def create_board(boardTitle):
    return queries.create_board(boardTitle)


@app.route("/api/delete/board/<board_id>")
def delete_board(board_id):
    return jsonify(queries.delete_board(board_id))

@app.route("/api/boards/<cardTitle>/<boardId>/<statusId>/createcard")
@json_response
def create_new_card(cardTitle, boardId, statusId):
    card_order = queries.card_order_place(statusId)['max'] + 1
    print(card_order)
    return queries.create_card(cardTitle, boardId, statusId, card_order)


@app.route("/api/boards/<newBoardTitle>/<boardId>/editboardtitle")
@json_response
def edit_board_title(newBoardTitle, boardId):
    return queries.edit_board_title(newBoardTitle, boardId)


@app.route("/api/status/<statusTitle>")
@json_response
def create_status(statusTitle):
    return queries.create_status(statusTitle)


@app.route("/api/edit/status/title/<statusTitle>/<statusId>")
@json_response
def edit_title_status(statusTitle, statusId):
    return queries.edit_status_title(statusTitle, statusId)


@app.route("/api/columns")
@json_response
def get_columns():
    """
    All the boards
    """
    return queries.get_columns()


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
