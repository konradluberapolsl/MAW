// autor Konrad Lubera
var moves = 0;
var b = [];

function flipArray(array)
{
    var fliped = new Array(array[0].length);

    for(var i=0; i<fliped.length; i++)
    {
        fliped[i] = new Array(array.length);
        for (var j=0; j<fliped[i].length; j++)
        {
            fliped[i][j] = array[j][i];
        }
    }
    return fliped;
}

function createGridColumns(size)
{
    var board = document.getElementById("board")
    var grid_columns = ""
    for (var i =0 ; i<size; i++)
    {
        grid_columns+= "auto "
    }
    board.style.gridTemplateColumns = grid_columns;
}

function flipBoard()
{
    var board = document.getElementById("board")
    var fliped = flipArray(b);
    createGridColumns(fliped[0].length);
    board.querySelectorAll('*').forEach(n => n.remove());
    for (var i = 0; i < fliped.length; i++) {
        for(var j = 0; j < fliped[i].length; j++ ){
            board.appendChild(fliped[i][j]);
        }
    }
    return fliped
}


function createBlocks(x_size,y_size, orientation){
    var board = document.getElementById("board")

    if(orientation == "landscape"){
        if( b.length == 0)
        {
            var tmp = x_size;
            x_size = y_size;
            y_size = tmp;
        }
        else{
           return  flipBoard();
        }
    }
    else if (orientation=="horiznotal" && b.length!=0)
    {
        return flipBoard();
    }
    createGridColumns(x_size);
    var blocks = new Array(y_size);
    const colors = ['rgb(255, 99, 99)', 'rgb(245, 245, 245)'];
    for (var i = 0; i < y_size; i++) {
        blocks[i] = new Array(x_size);
        for(var j = 0; j < x_size; j++ ){
            blocks[i][j] = document.createElement("BUTTON");
            blocks[i][j].classList.add("block");
            blocks[i][j].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)] ;
            board.appendChild(blocks[i][j]);
        }
      }
      return blocks;
}

function updateMoves(){
    moves++;
    const counter = document.getElementById("counter");
    counter.innerHTML = moves.toString();
    //console.log(counter.innerHTML);
}


function updateBlocks(blocks){
    blocks.forEach(item => {
        item.forEach(block => {
            block.addEventListener('click', () => {
                updateMoves();
                var y = blocks.indexOf(item)
                var x = item.indexOf(block);
                changeColor(checkPostion(x,y,blocks),x,y,blocks);
                lookForWin(blocks);
        });
        });      
    });
}

function lookForWin(blocks){
    var win = true;
    blocks.forEach(item => {
        item.forEach(block => {
            if(block.style.backgroundColor !== 'rgb(245, 245, 245)'){
                win = false;
            }
        } )
    });
    if(win){
        const message = "Congratulations you won \nYou made it in " + moves + " moves.\nPress any key to play again";
        if (confirm(message)) {
            window.location.reload(true);
        }
        else{
            window.location.reload(true);
        }
    }
}

function checkPostion(x_index, y_index, blocks){

    if(x_index == 0 && y_index ==0)
         return "Top Left Corner";

    else if (y_index == 0 && x_index == blocks[0].length-1)
        return "Top Right Corner"

    else if (x_index == 0  && y_index == blocks.length-1 )
        return "Bottom Left Corner"

    else if (y_index == blocks.length-1 && x_index==blocks[0].length-1)
        return "Bottom Right Corner";

    else if (x_index==0)
        return "Left Band";

    else if(x_index==blocks[0].length-1)
        return "Right Band";

    else if(y_index == 0)
        return "Top Band";

    else if(y_index==blocks.length-1)
        return "Bottom Band";

    else
        return "Center";


}


function changeColor(position, x_index, y_index, board)
{
    var basic_color = 'rgb(255, 99, 99)';
    var second_color = 'rgb(245, 245, 245)';
    for(var i=0; i<board.length; i++)
    {
        for(var j=0; j<board[i].length; j++)
        {
            if (x_index == j && y_index == i)
            {
                var blocks_to_change = [];
                blocks_to_change.push(board[i][j]);
                if(position=="Center")
                {
                    blocks_to_change.push(board[i+1][j]);
                    blocks_to_change.push(board[i-1][j]);
                    blocks_to_change.push(board[i][j+1]);
                    blocks_to_change.push(board[i][j-1]);
                }
                else if (position.includes("Band"))
                {
                    if (position.includes("Left") || position.includes("Right")) {
                        if (position.includes("Left"))
                            blocks_to_change.push(board[i][j + 1]);
                        else if (position.includes("Right"))
                            blocks_to_change.push(board[i][j - 1]);
                        blocks_to_change.push(board[i - 1][j]);
                        blocks_to_change.push(board[i + 1][j]);
                    }
                    else{
                        if(position.includes("Top"))
                            blocks_to_change.push(board[i+1][j]);
                        else if (position.includes("Bottom"))
                            blocks_to_change.push(board[i-1][j]);
                        blocks_to_change.push(board[i][j+1]);
                        blocks_to_change.push(board[i][j-1]);
                    }
                }
                else if (position.includes("Corner"))
                {
                    if (position.includes("Top"))
                        blocks_to_change.push(board[i+1][j]);
                    else if (position.includes("Bottom"))
                        blocks_to_change.push(board[i-1][j]);
                    if (position.includes("Left"))
                        blocks_to_change.push(board[i][j+1]);
                    else if(position.includes("Right"))
                        blocks_to_change.push(board[i][j-1]);
                }
                blocks_to_change.forEach(item =>{
                    var color =  item.style.backgroundColor ;
                    item.style.backgroundColor = ((color==basic_color) ? second_color : basic_color);
                });
            }
        }
    }
}

var x_size = 5;
var y_size = 5;

var landscape = window.matchMedia("only screen and (max-width: 850px) and (orientation: landscape)")

function handleOrientatnioChange(e) {
    if(e.matches) {
        b = createBlocks(x_size,y_size,"landscape")
    }
    else
        b = createBlocks(x_size,y_size,"horiznotal")
}


landscape.addListener(handleOrientatnioChange)
handleOrientatnioChange(landscape)
updateBlocks(b);
