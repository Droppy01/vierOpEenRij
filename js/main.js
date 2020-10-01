window.addEventListener("load", () => {
let game = new vierOpEenRij()
})

class vierOpEenRij {
    constructor() {
        //krijg alle colomen 
        let tr = document.getElementsByTagName("tr")

        //loop door alle colomen
        for (let i = 0; i < tr.length; i++) {
            
            // pak alle rijen van de colomen
            let th = tr[i].querySelectorAll("th")

            //loop door de rijen
            th.forEach((ell, row=index) => {
                //variable row is de index van de rijen

                //voeg een Event Listener toe aan alle plekken en voert de funcie insertDisc toe en geeft de variable row
                ell.addEventListener(("click"), ()=>{ this.insertDisc(row)})
                
            })
        }
        
    }

    insertDisc( row ) {
        let column = 0;
        let found = false
        while (found == false && column <6){
            if (this.bord[row][column] == 0){
                found = true
            }
            column++
        }
        if (found){

            column -= 1;
            let place = document.getElementsByTagName("tr")[(5-column)].querySelectorAll("th>div")[(row)]
            if (!this.turn){
                place.className="red"
                this.bord[row][column] = 1;
                this.turn = true
            }else {
                place.className="blue"
                this.bord[row][column] = 2;
                this.turn = false
            }
        } else {
            console.log("this row is full")
        }
        
        

    }
    // 0 = empty
    // 1 = red (player 1)
    // 2 = blue (player 2)

    //bord is rotadet to help the program
    bord = [//colom  1 2 3 4 5 6 7 row
                    [0,0,0,0,0,0,0],//1
                    [0,0,0,0,0,0,0],//2
                    [0,0,0,0,0,0,0],//3
                    [0,0,0,0,0,0,0],//4
                    [0,0,0,0,0,0,0],//5
                    [0,0,0,0,0,0,0],//6
                    [0,0,0,0,0,0,0] //7


    ]
    /* player's */ turn = false;
    // player 1 == false | player 2 == true
}