import { type Card, Ranks, Suits } from '$lib/game/types';

export function toPixels(value: number) : string {
    return `${value}px`;
}

export function isRoyal(card: Card) {
    return (card.rank === Ranks.JACK || card.rank === Ranks.QUEEN || card.rank === Ranks.KING)
}

export function isRed(card: Card) {
    return (card.suit === Suits.DIAMOND || card.suit === Suits.HEART);
}