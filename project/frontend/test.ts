let cards = [
    {num: 1, sy: 'a'},
    {num: 2, sy: 'b'},
    {num: 3, sy: 'b'},
    {num: 4, sy: 'd'},
    {num: 5, sy: 'e'}
]

cards = [...cards].filter(card => {
    return card.num !== 2 && card.sy !== 'b';
});

console.log(cards);