// console.log("hi there")

const fs = require('fs');

let letters = fs.readFileSync('input.txt','utf8');
let arr = ['wat', 'caa', 'eyn', 'cot']
let lCount_arr = []

console.log(letters);

for (let i=0; i<arr.length; i++ ) {

    let word = arr[i];

    for (let j=0; j < word.length; j++) {
    // traversing letter per line 
        
        
        let letter = word[j];
        let found_letter = false
         
        for (let k=0; k<lCount_arr; k++) {
        //traversing each word

            if (letter == lCount_arr[k]) {

                let found_letter = true;
                lCount_arr[k][1]++;
        
            } else {
                lCount_arr.push([letter, 1])
            }        

        }





    }
    

}



for ()
if ()
