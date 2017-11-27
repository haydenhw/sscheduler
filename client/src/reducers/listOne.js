import shortId from 'shortid';
import * as actions from '../actions/indexActions';

const defaultState = {
  cards: [],
  listId: null,
}

export const listOne = (state = defaultState, action) => {
  switch(action.type) {
    case actions.ADD_CARD: {
      const newCards = [
        ... state.cards,
        action.newCard
      ]

      return  {
        ...state,
        cards: newCards,
      };
    }
    case actions.DELETE_CARD: {
      const { cardId } = action;

      const newCards = state.cards.filter(card => {
        return card.id !== cardId;
      });

      return  {
        ...state,
        cards: newCards,
      };
    }
    case actions.FETCH_CARDS_SUCCESS: {
      const { cards, _id: listId } = action.payload[0];

      return  {
        cards,
        listId,
      };
    }
    case actions.MOVE_CARD: {
      const { dragIndex, hoverIndex } = action.payload;
      const dragCard = state.cards[dragIndex];
      const newCards = state.cards.splice(0);

      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      return  {
        ...state,
        cards: newCards,
      };
    }
    case actions.UPDATE_CARDS:
      return  {
        ...state,
        cards: action.newList
      };
    case actions.UPDATE_CARD_TEXT: {
        const { cardId, newText } = action;
        const newCards = state.cards.map(card => {
          if (card.id === cardId) {
            return Object.assign(card, { text : newText});
          }

          return card;
        })

        return  {
          ...state,
          cards: newCards
        };
      }

    case actions.UPDATE_CARD_DURATION:
      const { cardId, newDuration } = action;
      const newCards = state.cards.map(card => {
        if (card.id === cardId) {
          return Object.assign(card, { duration: newDuration});
        }

        return card;
      })

      return  {
        ...state,
        cards: newCards
      };
  }
  return state;
}
