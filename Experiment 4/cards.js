const express = require('express');
const router = express.Router();
let cards = [
    { id: 1, suit: 'Hearts', value: 'Ace' },
    { id: 2, suit: 'Spades', value: 'King' }
];
router.get('/', (req, res) => {
    res.status(200).json(cards);
});
router.get('/:id', (req, res) => {
    const card = cards.find(c => c.id == req.params.id);
    if (!card) {
        return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json(card);
});
router.post('/', (req, res) => {
    const newCard = {
        id: cards.length + 1,
        suit: req.body.suit,
        value: req.body.value
    };
    cards.push(newCard);
    res.status(201).json(newCard);
});
router.put('/:id', (req, res) => {
    const index = cards.findIndex(c => c.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Card not found' });
    }

    cards[index] = {
        id: parseInt(req.params.id),
        suit: req.body.suit,
        value: req.body.value
    };

    res.status(200).json(cards[index]);
});
router.patch('/:id', (req, res) => {
    const card = cards.find(c => c.id == req.params.id);
    if (!card) {
        return res.status(404).json({ message: 'Card not found' });
    }

    if (req.body.suit) card.suit = req.body.suit;
    if (req.body.value) card.value = req.body.value;

    res.status(200).json(card);
});
router.delete('/:id', (req, res) => {
    const index = cards.findIndex(c => c.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Card not found' });
    }

    cards.splice(index, 1);
    res.status(200).json({ message: 'Card deleted successfully' });
});
module.exports = router;
