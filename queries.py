import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def delete_board(board_id):
    return data_manager.execute_select("""
        delete from cards
        where board_id = %(board_id)s;
        delete from boards
        where id = %(board_id)s
        returning id
    """,
                                       {
                                           "board_id": board_id
                                       }
                                       )


def delete_status(status_id):
    return data_manager.execute_select("""
        delete from cards
        where status_id = %(status_id)s;
        delete from statuses
        where id = %(status_id)s
        returning id
    """, {
        "status_id": status_id
    })



def get_boards():
    """
    Gather all boards
    :return:
    """
    """
    Select 
    """
    # remove this code once you implement the database
    # return [{"title": "board1", "id": 1}, {"title": "board2", "id": 2}]

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    # remove this code once you implement the database
    # return [{"title": "title1", "id": 1}, {"title": "board2", "id": 2}]

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def get_columns():
    return data_manager.execute_select(
        """
        SELECT * FROM statuses
        ;
        """
    )


def create_board(board_title):
    return data_manager.execute_select(
        """
        Insert into boards (title)
        values (%(board_title)s) returning id
        """,
        {"board_title": board_title},
        fetchall=False
    )


def card_order_place(statusId):
    return data_manager.execute_select(
        """
        select max(card_order) from cards
        where status_id = %(statusId)s
        """,
        {"statusId": statusId},
        fetchall=False
    )


def create_card(cardTitle, boardId, statusId, cardOrder):
    return data_manager.execute_select(
        """
        Insert into cards (title, board_id, status_id, card_order)
        values (%(cardTitle)s, %(boardId)s, %(statusId)s, %(cardOrder)s)
        returning id
        """,
        {"cardTitle": cardTitle,
         "boardId": boardId,
         "statusId": statusId,
         "cardOrder": cardOrder},
        fetchall=False
    )


def edit_board_title(new_title_board, boardId):
    return data_manager.execute_select(
        """
        UPDATE boards
        SET title = (%(new_title_board)s)
        WHERE id = (%(boardId)s)
        returning id
        """,
        {"new_title_board": new_title_board,
         "boardId": boardId}
    )


def create_status(status_title):
    return data_manager.execute_select(
        """
        INSERT INTO statuses (title)
        VALUES (%(status_title)s)
        /* on conflict(title) do nothing */
        returning id 
        """,
        {'status_title': status_title}
    )


def edit_status_title(status_title, statusId):
    return data_manager.execute_select(
        """
        UPDATE statuses
        SET title = (%(status_title)s)
        WHERE id = (%(statusId)s)
        returning id
        """,
        {"status_title": status_title,
         "statusId": statusId}
    )
