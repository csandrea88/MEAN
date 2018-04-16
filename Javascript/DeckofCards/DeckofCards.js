function CardConstructor(suit, facevalue, value) {
    // an object literal that will be returned
    const Card = {};
    // attributes of a person
    Card.suit = suit;
    Card.value = value;
    Card.facevalue = facevalue; 
    // finally, this function must return an instance
    return Card;
} 

function DeckConstructor() {
  

    // an object literal that will be returned
    const Deck = {};
    // attributes of a card
    Deck.count = 52;
    Deck.CreateDeck = function() {
        
        let suits = ["clubs", "spades", "heats", "diamonds"];
        let facevalues = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
        let newdeck = [];
        for (let i = 0; i < suits.length; i++) {
            //console.log("creating suits", suits.length)
            for (let k = 0; k < facevalues.length; k++) {
                console.log(suits[i]);
                var Card = new CardConstructor(suits[i], facevalues[k], i+1); 
                newdeck.push(Card);
            }
            
        }
        console.log(newdeck);
    }
    
    //return instance of Deck
    return Deck;
} 

const myDeck = new DeckConstructor();
//console.log(myDeck);
gofishDeck = myDeck.CreateDeck();
console.log(gofishDeck);