import { e as escape_html, d as stringify, c as pop, p as push, f as ensure_array_like, h as add_styles } from "../../chunks/index.js";
import "clsx";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
var StackTypes = /* @__PURE__ */ ((StackTypes2) => {
  StackTypes2["DRAW"] = "draw";
  StackTypes2["ROYALS"] = "royals";
  StackTypes2["CENTER"] = "center";
  StackTypes2["BORDER"] = "border";
  StackTypes2["ACES"] = "aces";
  StackTypes2["JOKERS"] = "jokers";
  StackTypes2["NULL"] = "null";
  return StackTypes2;
})(StackTypes || {});
var Suits = /* @__PURE__ */ ((Suits2) => {
  Suits2["HEART"] = "♥";
  Suits2["SPADE"] = "♠";
  Suits2["CLUB"] = "♣";
  Suits2["DIAMOND"] = "♦";
  Suits2["JOKER"] = "joker";
  return Suits2;
})(Suits || {});
var Ranks = /* @__PURE__ */ ((Ranks2) => {
  Ranks2["ACE"] = "ace";
  Ranks2["TWO"] = "two";
  Ranks2["THREE"] = "three";
  Ranks2["FOUR"] = "four";
  Ranks2["FIVE"] = "five";
  Ranks2["SIX"] = "six";
  Ranks2["SEVEN"] = "seven";
  Ranks2["EIGHT"] = "eight";
  Ranks2["NINE"] = "nine";
  Ranks2["TEN"] = "ten";
  Ranks2["JACK"] = "jack";
  Ranks2["QUEEN"] = "queen";
  Ranks2["KING"] = "king";
  Ranks2["JOKER"] = "joker";
  return Ranks2;
})(Ranks || {});
const INITIAL_STATE = {
  stacks: [
    {
      id: "-1",
      cards: [],
      type: StackTypes.NULL,
      validDropLocation: false
    },
    {
      id: "B0",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "B1",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "B2",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "-1",
      cards: [],
      type: StackTypes.NULL,
      validDropLocation: false
    },
    {
      id: "B3",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "C0",
      cards: [],
      type: StackTypes.CENTER,
      validDropLocation: false
    },
    {
      id: "C1",
      cards: [],
      type: StackTypes.CENTER,
      validDropLocation: false
    },
    {
      id: "C2",
      cards: [],
      type: StackTypes.CENTER,
      validDropLocation: false
    },
    {
      id: "B4",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "B5",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "C3",
      cards: [],
      type: StackTypes.CENTER,
      validDropLocation: false
    },
    {
      id: "C4",
      cards: [],
      type: StackTypes.CENTER,
      validDropLocation: false
    },
    {
      id: "C5",
      cards: [],
      type: StackTypes.CENTER,
      validDropLocation: false
    },
    {
      id: "B6",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "B7",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "C6",
      cards: [],
      type: StackTypes.CENTER,
      validDropLocation: false
    },
    {
      id: "C7",
      cards: [],
      type: StackTypes.CENTER,
      validDropLocation: false
    },
    {
      id: "C8",
      cards: [],
      type: StackTypes.CENTER,
      validDropLocation: false
    },
    {
      id: "B8",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "-1",
      cards: [],
      type: StackTypes.NULL,
      validDropLocation: false
    },
    {
      id: "B9",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "B10",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "B11",
      cards: [],
      type: StackTypes.BORDER,
      validDropLocation: false
    },
    {
      id: "-1",
      cards: [],
      type: StackTypes.NULL,
      validDropLocation: false
    }
  ],
  draw: {
    id: "draw",
    cards: [],
    type: StackTypes.DRAW,
    validDropLocation: false
  },
  jokers: {
    id: "jokers",
    cards: [],
    type: StackTypes.JOKERS,
    validDropLocation: false
  },
  aces: {
    id: "aces",
    cards: [],
    type: StackTypes.ACES,
    validDropLocation: false
  },
  royals: {
    id: "royals",
    cards: [],
    type: StackTypes.ROYALS,
    validDropLocation: false
  },
  selectedCard: null,
  selectedSource: null,
  jokerActive: false,
  aceActive: false,
  gameOver: false,
  gameOverMessage: "",
  hoveredStack: null
};
const gameState = structuredClone(INITIAL_STATE);
const borderToCenterAdjacency = {
  "B0": "C0",
  "B1": "C1",
  "B2": "C2",
  "B3": "C0",
  "B4": "C2",
  "B5": "C3",
  "B6": "C5",
  "B7": "C6",
  "B8": "C8",
  "B9": "C6",
  "B10": "C7",
  "B11": "C8"
};
const centerToBorderAdjacency = {
  "C0": ["B0", "B3"],
  "C1": ["B1"],
  "C2": ["B2", "B4"],
  "C3": ["B5"],
  "C4": [],
  "C5": ["B6"],
  "C6": ["B7", "B9"],
  "C7": ["B10"],
  "C8": ["B8", "B11"]
};
function isRoyal(card) {
  return card.rank === Ranks.JACK || card.rank === Ranks.QUEEN || card.rank === Ranks.KING;
}
function isRed(card) {
  return card.suit === Suits.DIAMOND || card.suit === Suits.HEART;
}
function clickCard(cardStack) {
  if (cardStack.cards.length === 0) {
    if (gameState.selectedCard && cardStack.validDropLocation) {
      playCard(cardStack);
      return;
    } else {
      return;
    }
  }
  const card = cardStack.cards[cardStack.cards.length - 1];
  if (!card.isPlayable && !card.isSelected) return;
  if (gameState.selectedCard === null && card.rank === Ranks.ACE && cardStack.type === StackTypes.ACES) {
    if (card.isSelected) {
      card.isSelected = false;
      gameState.aceActive = false;
    } else {
      card.isSelected = true;
      gameState.aceActive = true;
    }
    updatePlayable();
    return;
  }
  if (gameState.selectedCard === null && card.rank === Ranks.JOKER && cardStack.type === StackTypes.JOKERS) {
    if (card.isSelected) {
      card.isSelected = false;
      gameState.jokerActive = false;
    } else {
      card.isSelected = true;
      gameState.jokerActive = true;
    }
    updatePlayable();
    return;
  }
  if (card.isSelected) {
    deselect();
    updatePlayable();
    return;
  }
  if (card.isPlayable && gameState.selectedCard == null) {
    card.isSelected = true;
    card.isFaceUp = true;
    gameState.selectedCard = card;
    gameState.selectedSource = cardStack;
    if (gameState.aceActive) {
      gameState.aceActive = false;
      gameState.aces.cards.pop();
      for (const card2 of cardStack.cards) {
        card2.isFaceUp = false;
      }
      gameState.draw.cards = cardStack.cards.concat(gameState.draw.cards);
      cardStack.cards = [];
      card.isSelected = false;
      card.isPlayable = false;
      gameState.selectedCard = null;
      gameState.selectedSource = null;
    }
    updatePlayable();
    return;
  }
  if (card.isPlayable && gameState.selectedCard && gameState.selectedSource) {
    playCard(cardStack);
    return;
  }
}
const playCard = (stack) => {
  if (gameState.selectedSource) {
    const card = gameState.selectedSource.cards.pop();
    if (card) {
      if (stack.type === StackTypes.BORDER && gameState.selectedSource.type === StackTypes.DRAW && !isRoyal(card)) {
        if (stack.cards.length > 0) {
          const topCard = stack.cards[stack.cards.length - 1];
          topCard.value += card.value;
          if (topCard.value >= 20) {
            youLost();
            return;
          } else if (topCard.value >= 19 && topCard.rank === Ranks.KING) {
            youLost();
            return;
          }
          topCard.isArmoured = true;
          stack.cards = [card].concat(stack.cards);
        }
      } else {
        stack.cards.push(card);
      }
      deselect();
      if (gameState.jokerActive) {
        gameState.jokerActive = false;
        gameState.jokers.cards.pop();
      }
      if (stack.type === StackTypes.CENTER) {
        evaluateGridMove(stack);
      }
      updatePlayable();
    }
  }
  if (gameState.draw.cards.length === 0 && !won() && !gameState.jokerActive && !gameState.aceActive && gameState.jokers.cards.length == 0 && gameState.aces.cards.length === 0) {
    youLost();
  }
};
const youLost = () => {
  gameState.gameOverMessage = "You Lost!";
  gameState.gameOver = true;
};
const evaluateGridMove = (stack) => {
  switch (stack.id) {
    case "C0": {
      attack("C1", "C2", "B4");
      attack("C3", "C6", "B9");
      break;
    }
    case "C1": {
      attack("C4", "C7", "B10");
      break;
    }
    case "C2": {
      attack("C5", "C8", "B11");
      attack("C1", "C0", "B3");
      break;
    }
    case "C3": {
      attack("C4", "C5", "B6");
      break;
    }
    case "C5": {
      attack("C4", "C3", "B5");
      break;
    }
    case "C6": {
      attack("C3", "C0", "B0");
      attack("C7", "C8", "B8");
      break;
    }
    case "C7": {
      attack("C4", "C1", "B1");
      break;
    }
    case "C8": {
      attack("C5", "C2", "B2");
      attack("C7", "C6", "B7");
      break;
    }
  }
};
const attack = (aStack1ID, aStack2ID, targetStackId) => {
  const aStack1 = gameState.stacks.find((s) => s.id == aStack1ID);
  const aStack2 = gameState.stacks.find((s) => s.id == aStack2ID);
  const targetStack = gameState.stacks.find((s) => s.id == targetStackId);
  if (aStack1 && aStack2 && targetStack) {
    if (targetStack.cards.length === 0) {
      return;
    } else {
      const targetCard = targetStack.cards[targetStack.cards.length - 1];
      let attackValue = 0;
      if (targetCard.rank === Ranks.JACK) {
        if (aStack1.cards.length > 0) {
          const aCard1 = aStack1.cards[aStack1.cards.length - 1];
          attackValue += aCard1.value;
        }
        if (aStack2.cards.length > 0) {
          const aCard2 = aStack2.cards[aStack2.cards.length - 1];
          attackValue += aCard2.value;
        }
      } else if (targetCard.rank === Ranks.QUEEN) {
        if (aStack1.cards.length > 0) {
          const aCard1 = aStack1.cards[aStack1.cards.length - 1];
          if (isRed(aCard1) === isRed(targetCard)) {
            attackValue += aCard1.value;
          }
        }
        if (aStack2.cards.length > 0) {
          const aCard2 = aStack2.cards[aStack2.cards.length - 1];
          if (isRed(aCard2) === isRed(targetCard)) {
            attackValue += aCard2.value;
          }
        }
      } else if (targetCard.rank === Ranks.KING) {
        if (aStack1.cards.length > 0) {
          const aCard1 = aStack1.cards[aStack1.cards.length - 1];
          if (aCard1.suit === targetCard.suit) {
            attackValue += aCard1.value;
          }
        }
        if (aStack2.cards.length > 0) {
          const aCard2 = aStack2.cards[aStack2.cards.length - 1];
          if (aCard2.suit === targetCard.suit) {
            attackValue += aCard2.value;
          }
        }
      }
      if (attackValue >= targetCard.value) {
        targetCard.isFaceUp = false;
        console.log(targetCard.id, " turned face down");
        if (won()) {
          gameState.gameOverMessage = "You Won! With a score of: " + (gameState.jokers.cards.length + gameState.aces.cards.length);
          gameState.gameOver = true;
          return;
        }
        doRoyalRefresh();
      }
    }
  }
};
const doRoyalRefresh = () => {
  let livingRoyalCount = 0;
  for (let i = 0; i < gameState.stacks.length; i++) {
    const stack = gameState.stacks[i];
    if (stack.type !== StackTypes.BORDER) {
      continue;
    }
    if (stack && stack.cards.length > 0) {
      const card = stack.cards[stack.cards.length - 1];
      if (isRoyal(card) && card.isFaceUp) {
        livingRoyalCount++;
      }
    }
  }
  if (livingRoyalCount === 0) {
    royalRefresh();
  }
};
function royalRefresh() {
  const tempStack = [];
  while (gameState.royals.cards.length == 0 && gameState.draw.cards.length > 0) {
    const tempCard = gameState.draw.cards.pop();
    if (tempCard) {
      if (isRoyal(tempCard)) {
        tempCard.isFaceUp = true;
        tempCard.isPlayable = true;
        gameState.royals.cards.push(tempCard);
      } else {
        tempStack.push(tempCard);
      }
    }
  }
  gameState.draw.cards = tempStack.concat(gameState.draw.cards);
}
function won() {
  let deadRoyalCount = 0;
  for (let i = 0; i < gameState.stacks.length; i++) {
    const stack = gameState.stacks[i];
    if (stack.type !== StackTypes.BORDER) {
      continue;
    }
    if (stack && stack.cards.length > 0) {
      const card = stack.cards[stack.cards.length - 1];
      if (isRoyal(card) && !card.isFaceUp) {
        deadRoyalCount++;
      }
    }
  }
  return deadRoyalCount >= 12;
}
const deselect = () => {
  if (gameState.selectedCard) {
    gameState.selectedCard.isSelected = false;
    gameState.selectedCard = null;
    gameState.selectedSource = null;
  }
};
const updatePlayable = () => {
  if (gameState.selectedCard === null) {
    if (gameState.aceActive || gameState.jokerActive) {
      if (gameState.draw.cards.length > 0) {
        gameState.draw.cards[gameState.draw.cards.length - 1].isPlayable = false;
      }
      for (let i = 0; i < gameState.stacks.length; i++) {
        const stack = gameState.stacks[i];
        if (stack.type === StackTypes.CENTER) {
          if (stack.cards.length > 0) {
            stack.cards[stack.cards.length - 1].isPlayable = true;
          }
        } else if (stack.type === StackTypes.BORDER) {
          stack.validDropLocation = false;
          if (stack.cards.length > 0) {
            stack.cards[stack.cards.length - 1].isPlayable = false;
          }
        }
      }
      if (gameState.aceActive) {
        makeJokerStackUnplayable();
      } else if (gameState.jokerActive) {
        makeAceStackUnplayable();
      }
    } else {
      if (gameState.royals.cards.length > 0) {
        if (gameState.draw.cards.length > 0) {
          gameState.draw.cards[gameState.draw.cards.length - 1].isPlayable = false;
          gameState.royals.cards[gameState.royals.cards.length - 1].isPlayable = true;
        }
        makeAceStackUnplayable();
        makeJokerStackUnplayable();
      } else if (gameState.draw.cards.length > 0) {
        gameState.draw.cards[gameState.draw.cards.length - 1].isPlayable = true;
        if (gameState.aces.cards.length > 0) {
          gameState.aces.cards[gameState.aces.cards.length - 1].isPlayable = true;
        }
        if (gameState.jokers.cards.length > 0) {
          gameState.jokers.cards[gameState.jokers.cards.length - 1].isPlayable = true;
        }
      } else if (gameState.draw.cards.length === 0) {
        gameState.draw.validDropLocation = false;
        if (gameState.aces.cards.length > 0) {
          gameState.aces.cards[gameState.aces.cards.length - 1].isPlayable = true;
        }
        if (gameState.jokers.cards.length > 0) {
          gameState.jokers.cards[gameState.jokers.cards.length - 1].isPlayable = true;
        }
      }
    }
    if (!gameState.aceActive && !gameState.jokerActive) {
      makeAllGridStacksAndCardsUnplayable();
    }
  } else {
    gameState.selectedCard.isPlayable = false;
    if (isRoyal(gameState.selectedCard)) {
      let mostSimilarCard = null;
      let adjacentSlots = [];
      for (let i = 0; i < gameState.stacks.length; i++) {
        const stack = gameState.stacks[i];
        if (stack.type === StackTypes.BORDER) {
          if (stack.cards.length === 0) {
            const centerStack = gameState.stacks.find(
              (s) => s.id == borderToCenterAdjacency[stack.id]
            );
            if (centerStack) {
              if (centerStack.cards.length > 0) {
                const contenderCard = centerStack.cards[centerStack.cards.length - 1];
                if (!mostSimilarCard) {
                  mostSimilarCard = contenderCard;
                  for (let j = 0; j < centerToBorderAdjacency[centerStack.id].length; j++) {
                    const pushStack = gameState.stacks.find(
                      (s) => s.id == centerToBorderAdjacency[centerStack.id][j]
                    );
                    if (pushStack) {
                      adjacentSlots.push(pushStack);
                    }
                  }
                } else if (moreSimilar(contenderCard, mostSimilarCard, gameState.selectedCard) > 0) {
                  mostSimilarCard = contenderCard;
                  adjacentSlots = [];
                  for (let j = 0; j < centerToBorderAdjacency[centerStack.id].length; j++) {
                    const pushStack = gameState.stacks.find(
                      (s) => s.id == centerToBorderAdjacency[centerStack.id][j]
                    );
                    if (pushStack) {
                      adjacentSlots.push(pushStack);
                    }
                  }
                } else if (moreSimilar(contenderCard, mostSimilarCard, gameState.selectedCard) === 0) {
                  for (let j = 0; j < centerToBorderAdjacency[centerStack.id].length; j++) {
                    const pushStack = gameState.stacks.find(
                      (s) => s.id == centerToBorderAdjacency[centerStack.id][j]
                    );
                    if (pushStack) {
                      adjacentSlots.push(pushStack);
                    }
                  }
                }
              } else if (adjacentSlots.length === 0) {
                for (let j = 0; j < centerToBorderAdjacency[centerStack.id].length; j++) {
                  const pushStack = gameState.stacks.find(
                    (s) => s.id == centerToBorderAdjacency[centerStack.id][j]
                  );
                  if (pushStack) {
                    adjacentSlots.push(pushStack);
                  }
                }
              }
            }
          } else {
            stack.validDropLocation = false;
            stack.cards[stack.cards.length - 1].isPlayable = false;
          }
        }
      }
      for (let i = 0; i < adjacentSlots.length; i++) {
        adjacentSlots[i].validDropLocation = adjacentSlots[i].cards.length === 0;
      }
      makeJokerStackUnplayable();
      makeAceStackUnplayable();
      makeCenterStacksAndCardsUnplayable();
    } else if (gameState.selectedCard.rank == Ranks.JOKER) {
      console.log("cleared for selected rank joker");
      makeJokerStackPlayable();
      makeAceStackUnplayable();
      makeAllGridStacksAndCardsUnplayable();
    } else if (gameState.selectedCard.rank == Ranks.ACE) {
      console.log("cleared for selected rank ace");
      makeAceStackPlayable();
      makeJokerStackUnplayable();
      makeAllGridStacksAndCardsUnplayable();
    } else {
      let numberCenterAvailable = 0;
      for (let i = 1; i < gameState.stacks.length; i++) {
        const stack = gameState.stacks[i];
        if (stack.type === StackTypes.CENTER) {
          if (stack.cards.length == 0) {
            stack.validDropLocation = true;
            numberCenterAvailable++;
          } else if (gameState.selectedCard.value >= stack.cards[stack.cards.length - 1].value) {
            stack.validDropLocation = true;
            stack.cards[stack.cards.length - 1].isPlayable = true;
            numberCenterAvailable++;
          } else {
            stack.validDropLocation = false;
            stack.cards[stack.cards.length - 1].isPlayable = false;
          }
        }
      }
      if (numberCenterAvailable === 0) {
        if (gameState.jokers.cards.length + gameState.aces.cards.length === 0) {
          for (let i = 0; i < gameState.stacks.length; i++) {
            const stack = gameState.stacks[i];
            if (stack.type === StackTypes.BORDER && stack.cards.length > 0) {
              const cardToBeArmoured = stack.cards[stack.cards.length - 1];
              if (cardToBeArmoured.isFaceUp) {
                cardToBeArmoured.isPlayable = true;
              }
            }
          }
        }
      }
      makeJokerStackUnplayable();
      makeAceStackUnplayable();
    }
  }
};
const moreSimilar = (contender, established, target) => {
  if (established.suit === target.suit) {
    if (contender.suit !== target.suit) return -1;
    return contender.value - established.value;
  } else if (contender.suit === target.suit) {
    return 1;
  }
  if (isRed(established) === isRed(target)) {
    if (isRed(contender) !== isRed(target)) return -1;
    return contender.value - established.value;
  } else if (isRed(contender) === isRed(target)) {
    return 1;
  }
  return contender.value - established.value;
};
const makeAllGridStacksAndCardsUnplayable = () => {
  for (let i = 1; i < gameState.stacks.length; i++) {
    const stack = gameState.stacks[i];
    if (stack.type === StackTypes.BORDER || stack.type === StackTypes.CENTER) {
      stack.validDropLocation = false;
      if (stack.cards.length !== 0) {
        stack.cards[stack.cards.length - 1].isPlayable = false;
      }
    }
  }
};
const makeCenterStacksAndCardsUnplayable = () => {
  for (let i = 1; i < gameState.stacks.length; i++) {
    const stack = gameState.stacks[i];
    if (stack.type === StackTypes.CENTER) {
      stack.validDropLocation = false;
      if (stack.cards.length !== 0) {
        stack.cards[stack.cards.length - 1].isPlayable = false;
      }
    }
  }
};
const makeJokerStackUnplayable = () => {
  gameState.jokers.validDropLocation = false;
  if (gameState.jokers.cards.length > 0) {
    gameState.jokers.cards[gameState.jokers.cards.length - 1].isPlayable = false;
  }
};
const makeJokerStackPlayable = () => {
  gameState.jokers.validDropLocation = true;
  if (gameState.jokers.cards.length > 0) {
    gameState.jokers.cards[gameState.jokers.cards.length - 1].isPlayable = true;
  }
};
const makeAceStackUnplayable = () => {
  gameState.aces.validDropLocation = false;
  if (gameState.aces.cards.length > 0) {
    gameState.aces.cards[gameState.aces.cards.length - 1].isPlayable = false;
  }
};
const makeAceStackPlayable = () => {
  gameState.aces.validDropLocation = true;
  if (gameState.aces.cards.length > 0) {
    gameState.aces.cards[gameState.aces.cards.length - 1].isPlayable = true;
  }
};
function setup() {
  gameState.draw.cards = shuffleDeck(generateDeck());
  dealCards();
}
const dealCards = () => {
  let centerFilled = 0;
  while (gameState.draw.cards.length > 0) {
    const card = gameState.draw.cards[gameState.draw.cards.length - 1];
    if (card.rank === Ranks.JOKER) {
      card.isFaceUp = true;
      gameState.jokers.cards.push(gameState.draw.cards.pop());
    } else if (card.rank === Ranks.ACE) {
      card.isFaceUp = true;
      gameState.aces.cards.push(gameState.draw.cards.pop());
    } else if (isRoyal(card)) {
      card.isFaceUp = true;
      card.isPlayable = true;
      gameState.royals.cards.push(gameState.draw.cards.pop());
    } else if (centerFilled < 9) {
      const stack = gameState.stacks.find((s) => s.id == `C${centerFilled}`);
      if (stack) {
        card.isFaceUp = true;
        stack.cards.push(gameState.draw.cards.pop());
      }
      centerFilled++;
    } else if (gameState.royals.cards.length === 0) {
      royalRefresh();
    } else {
      return;
    }
  }
};
const generateDeck = () => {
  const deck = [];
  const ranks = Object.values(Ranks);
  const suits = Object.values(Suits);
  suits.forEach((suit) => {
    if (suit !== Suits.JOKER) {
      ranks.forEach((rank, index) => {
        if (rank !== Ranks.JOKER) {
          deck.push({
            id: `${suit}-${rank}`,
            suit,
            value: index + 1,
            rank,
            isSelected: false,
            isFaceUp: false,
            isPlayable: false,
            isArmoured: false
          });
        }
      });
    }
  });
  deck.push({
    id: `${Suits.JOKER}-${Ranks.JOKER}-1`,
    suit: Suits.JOKER,
    value: 0,
    rank: Ranks.JOKER,
    isSelected: false,
    isFaceUp: false,
    isPlayable: false,
    isArmoured: false
  });
  deck.push({
    id: `${Suits.JOKER}-${Ranks.JOKER}-2`,
    suit: Suits.JOKER,
    value: 0,
    rank: Ranks.JOKER,
    isSelected: false,
    isFaceUp: false,
    isPlayable: false,
    isArmoured: false
  });
  return deck;
};
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};
const config = {
  cardSize: 100,
  cardSizeRatio: 1.4,
  cardPaddingRatio: 0.1,
  cardBorderRadiusRatio: 0.1,
  gridGap: "0.5rem"
};
function CardComponent($$payload, $$props) {
  push();
  let {
    card,
    topCardClicked,
    topCardOver,
    topCardOut
  } = $$props;
  let cardDimensions = {
    padding: config.cardSize * config.cardPaddingRatio,
    width: config.cardSize,
    height: config.cardSize * config.cardSizeRatio,
    borderRadius: config.cardSize * config.cardBorderRadiusRatio
  };
  const cardStyle = `
		--card-width: ${cardDimensions.width}px;
    --card-height: ${cardDimensions.height}px;
    --card-radius: ${cardDimensions.borderRadius}px;
    --card-padding: ${cardDimensions.padding}px;
	`;
  const isRed2 = card.suit === Suits.HEART || card.suit === Suits.DIAMOND;
  const notJoker = card.suit !== Suits.JOKER;
  $$payload.out += `<div${attr("class", `card svelte-a68yci ${stringify([
    card.isPlayable ? "playable" : "",
    card.isSelected ? "selected" : "",
    !card.isFaceUp ? "facedown" : "",
    isRoyal(card) ? "royal" : "",
    isRed2 ? "red" : "",
    card.isArmoured ? "armoured" : ""
  ].filter(Boolean).join(" "))}`)}${attr("style", cardStyle)}>`;
  if (card.isFaceUp) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="card-corner top-left svelte-a68yci"><div class="rank svelte-a68yci">${escape_html(card.rank)}</div> `;
    if (notJoker) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="suit svelte-a68yci">${escape_html(card.suit)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> `;
    if (notJoker) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="card-center suit svelte-a68yci">${escape_html(card.suit)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="card-corner bottom-right svelte-a68yci"><div class="rank svelte-a68yci">${escape_html(card.rank)}</div> `;
    if (notJoker) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="suit svelte-a68yci">${escape_html(card.suit)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function CardStackComponent($$payload, $$props) {
  push();
  let { cardStack } = $$props;
  let isEmpty = cardStack.cards.length === 0;
  let topCard = isEmpty ? null : cardStack.cards[cardStack.cards.length - 1];
  let specialStack = cardStack.type !== StackTypes.CENTER && cardStack.type !== StackTypes.BORDER;
  const stackStyle = `
		--width: ${config.cardSize}px;
		--height: ${config.cardSize * config.cardSizeRatio}px;
	`;
  function topCardClicked() {
    clickCard(cardStack);
  }
  function topCardOver() {
    if (cardStack.type !== StackTypes.DRAW) {
      gameState.hoveredStack = cardStack;
    }
  }
  function topCardOut() {
    if (gameState.hoveredStack == cardStack) {
      gameState.hoveredStack = null;
    }
  }
  $$payload.out += `<div${attr("class", `card-stack svelte-1dgnt4y ${stringify([specialStack ? "noncenter" : ""].filter(Boolean).join(" "))}`)}${attr("aria-label", cardStack.type || (cardStack.cards.length ? "Card stack" : "Empty card stack"))}${attr("style", stackStyle)}>`;
  if (!isEmpty) {
    $$payload.out += "<!--[-->";
    CardComponent($$payload, {
      card: topCard,
      topCardClicked,
      topCardOver,
      topCardOut
    });
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr("class", `empty-card-placeholder svelte-1dgnt4y ${stringify([cardStack.validDropLocation ? "valid" : ""].filter(Boolean).join(" "))}`)}>`;
    if (cardStack.type) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="stack-label svelte-1dgnt4y" style="color: #3E7B27;">${escape_html(cardStack.type)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function GameBoardComponent($$payload, $$props) {
  push();
  const columns = 5;
  const each_array = ensure_array_like(gameState.stacks);
  $$payload.out += `<div${add_styles({
    "grid-template-columns": `repeat(${columns}, ${config.cardSize}px)`,
    gap: config.gridGap
  })} class="game-board svelte-afnb6e"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let cardStack = each_array[$$index];
    $$payload.out += `<div${add_styles({
      width: config.cardSize,
      height: config.cardSize * config.cardSizeRatio
    })} class="card-cell svelte-afnb6e">`;
    if (cardStack.type !== StackTypes.NULL) {
      $$payload.out += "<!--[-->";
      CardStackComponent($$payload, { cardStack });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  setup();
  const cardStyle = `--card-size: ${config.cardSize + 20}px;`;
  let infoMessage = (() => {
    const arr = [];
    if (gameState.hoveredStack) {
      for (const card of gameState.hoveredStack.cards) {
        let s = card.id;
        if (isRoyal(card)) {
          s += " total value: " + card.value;
        }
        arr.push(s);
      }
    }
    return arr;
  })();
  {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(infoMessage.reverse());
    if (gameState.gameOver) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="overlay svelte-1sqnpey"><h1 class="svelte-1sqnpey">${escape_html(gameState.gameOverMessage)}</h1> <button class="game-button svelte-1sqnpey">Play Again</button></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="page-container svelte-1sqnpey"><div class="top-bar svelte-1sqnpey"><button class="game-button svelte-1sqnpey" aria-label="Reset Game">Reset Game</button> <h1 style="margin: 0;" class="svelte-1sqnpey">GRID CANNON</h1> <button class="game-button svelte-1sqnpey" aria-label="Show Instructions">Show Instructions</button></div> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="game-container svelte-1sqnpey"><div class="side-panel svelte-1sqnpey"${attr("style", cardStyle)}>`;
    CardStackComponent($$payload, { cardStack: gameState.draw });
    $$payload.out += `<!----> `;
    CardStackComponent($$payload, { cardStack: gameState.royals });
    $$payload.out += `<!----></div> `;
    GameBoardComponent($$payload);
    $$payload.out += `<!----> <div class="side-panel svelte-1sqnpey"${attr("style", cardStyle)}>`;
    CardStackComponent($$payload, { cardStack: gameState.aces });
    $$payload.out += `<!----> `;
    CardStackComponent($$payload, { cardStack: gameState.jokers });
    $$payload.out += `<!----></div></div></div> <div${attr("class", `info-panel svelte-1sqnpey ${stringify([gameState.hoveredStack !== null ? "visible" : ""].filter(Boolean).join(" "))}`)}><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let s = each_array[$$index];
      $$payload.out += `<p>${escape_html(s)}</p>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
