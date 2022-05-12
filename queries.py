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
        /* if title != (%(status_title)s) */
        returning id 
        """,
        {'status_title': status_title}
    )
