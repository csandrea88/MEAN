module.exports = function (){
    return {
      add: function(num1, num2) { 
        sum = num1 + num2;   
        console.log ("Add:", sum); 
      },
      multiply: function(num1, num2) {
        multip = num1 * num2;   
        console.log ("Multiplied:", multip); 
           // add code here 
      },
      square: function(num) {
        square = num * num;   
        console.log ("Squareed:", square); 
      },
      random: function(num1, num2) {
        random = Math.floor(Math.random() * 36);   
        console.log ("Random:", random); 
      }
    }
  };
  
