import { type Card, Ranks } from '$lib/game/types';

export function toPixels(value: number) : string {
    return `${value}px`;
}

export function isRoyal(card: Card) {
    return (card.rank === Ranks.JACK || card.rank === Ranks.QUEEN || card.rank === Ranks.KING)
}