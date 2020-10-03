window.addEventListener("load", () => {
    let game = new vierOpEenRij();
})

class vierOpEenRij {
    constructor() {
        //krijg alle colomen 
        let colomn = document.getElementsByTagName("tr");

        //loop door alle colomen
        for (let i = 0; i < colomn.length; i++) {
            
            // pak alle rijen van de colomen
            let row = colomn[i].querySelectorAll("th");

            //loop door de rijen
            row.forEach((ell, selectedRow=index) => {
                //variable row is de index van de rijen

                //voeg een Event Listener toe aan alle plekken en voert de funcie insertDisc toe en geeft de variable row
                ell.addEventListener(("click"), ()=> { this.insertDisc(selectedRow)});
                
            })
        }
        
    }

    insertDisc( row ) {

        // loop through the board to find the place to put the disc
        let column = 0;
        let found = false
        while (found == false && column <6){
            if (this.GameBoard[row][column] == 0){
                found = true;
            }
            column++;
        }

        // checking if there is a place in the row
        if (found){
            
            // removing 1 to column because  at line 37 we add one afther it's found
            column -= 1;

            // getting the dom element to color the disc
            let place = document.getElementsByTagName("tr")[(5-column)].querySelectorAll("th>div")[(row)];

            //checking who's turn it is
            if (!this.turn){
                // color the disc
                place.classList.add("player1");

                // note the placement to the array
                this.GameBoard[row][column] = 1;

                //change turn
                this.turn = true;
                document.querySelector("section.player1>div").className="";
                document.querySelector("section.player2>div").className="turn";
            }else {
                // same but for player 2
                place.classList.add("player2");
                this.GameBoard[row][column] = 2;
                this.turn = false;
                document.querySelector("section.player1>div").className="turn";
                document.querySelector("section.player2>div").className="";
            }

            this.checkbord(row, column);

        } else {

            console.log("this row is full");
        }
        


    }

    checkbord(row, column) {
        
       
        /*
        first it search for vertical
        than horizontal.
        and than diagonal down-left to up right.
        finally diagonal down-right to up left
        */
        [{row:1,column:0}, {row:0,column:1}, {row:1,column:-1}, {row:1,column:1}].forEach( (ofset) => {

            let player = this.GameBoard[row][column]; // get the player number. found by using the given position\
            
            /*
            pointer's is used to search if there is four in a row

            using 
            this.bord[row+rowPointer][column+columnPointer] == player)

            for every time the while loop is running 
            its adding or removing what in ofset
            */
            let columnPointer =0;
            let rowPointer =0;

            // found is a array of all the "dom" elements it found
            let found=[];

            // exit is used so if there is a gap in between two disc it woult not cownt as a row.
            let exit = false;

            // this while loop runs until is detected a gap or reach out of bounds
            while (!exit&&column+columnPointer > -1 && row+rowPointer > -1 && column+columnPointer < 6 && row+rowPointer < 7 ) {
                
                // this checks if the selected location has the same owner 
                if (this.GameBoard[row+rowPointer][column+columnPointer] == player) {
                    // if so get the dom element of the location and add it to found
                    //                                              5- is so because the Coordinates are flipt
                    found.push(document.getElementsByTagName("tr")[(5-(column+columnPointer))]
                        .querySelectorAll("th>div")[(row+rowPointer)]);

                }else {
                    // else exit the loop
                    exit = true;
                }
                // change the pointer's location
                rowPointer+=ofset.row;
                columnPointer+=ofset.column;
            }

            // this is the same loop with a few change's
            columnPointer = 0;
            rowPointer = 0;
            exit=false;
            let first = true; // the first variable is used so the disc that the player played does not count double
            while (!exit&&column+columnPointer > -1 && row+rowPointer > -1 && column+columnPointer < 6 && row+rowPointer < 7 ) {
                if (this.GameBoard[row+rowPointer][column+columnPointer] == player ) {
                    if (!first){
                        found.push(document.getElementsByTagName("tr")[(5-(column+columnPointer))].querySelectorAll("th>div")[(row+rowPointer)]);
                    }else {
                        first = false;
                        
                    }
                }else {
                    exit = true;
                   
                }
                // instead of adding to change the position i used retraction
                rowPointer-=ofset.row;
                columnPointer-=ofset.column;
            }

            // if the number of disk we found is greater than or equal to 4 
            // the user will be alerted as a player won
            if (found.length >= 4) {
                found.forEach((disc)=> {
                    disc.classList.add("selected");
                })

                //update score
                if (player == 1) {
                    this.score.player1 += 1;
                    document.querySelector("section.player1>div>p>span").innerHTML = this.score.player1
                } else {
                    this.score.player2 += 1;
                    document.querySelector("section.player2>div>p>span").innerHTML = this.score.player2
                }

                requestAnimationFrame(()=>{
                    requestAnimationFrame(()=>{
                    alert("player "+player+" won");
                    this.clearBoard();
                    },0)
                },0)
                
            }
        });
    }

    clearBoard() {
        this.GameBoard.forEach( (test , colomn=index  ) => {
            this.GameBoard[colomn].forEach((test, row=index)=>{
                this.GameBoard[colomn][row] = 0 ;
            });
        });
        
        let tr = document.getElementsByTagName("tr");

        //loop door alle colomen
        for (let i = 0; i < tr.length; i++) {
            
            // pak alle rijen van de colomen
            let th = tr[i].querySelectorAll("th>div");

            //loop door de rijen
            th.forEach((ell, row=index) => {
                //variable row is de index van de rijen

                //voeg een Event Listener toe aan alle plekken en voert de funcie insertDisc toe en geeft de variable row
                ell.className = "";
                
            })
            
        }
        console.table(this.GameBoard);
    }

    score={
        player1:0,
        player2:0
    };

    // 0 = empty
    // 1 = red (player 1)
    // 2 = blue (player 2)

    //bord is rotadet to help the program
    GameBoard = [ //colom  1 2 3 4 5 6 7 row
                    [0,0,0,0,0,0,0],//1
                    [0,0,0,0,0,0,0],//2
                    [0,0,0,0,0,0,0],//3
                    [0,0,0,0,0,0,0],//4
                    [0,0,0,0,0,0,0],//5
                    [0,0,0,0,0,0,0],//6
                    [0,0,0,0,0,0,0] //7
    ];
    /* player's */ turn = false;
    // player 1 == false | player 2 == true
}