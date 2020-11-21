
function createBlocks(x_size,y_size){
    var blocks = new Array(x_size);

    for (var i = 0; i < blocks.length; i++) {
        blocks[i] = new Array(y_size);
        for(var j = 0; j < blocks[i].length; j++ ){
            blocks[i][j] = document.createElement("BUTTON");
            blocks[i][j].classList.add("block");
            document.getElementById("board").appendChild(blocks[i][j]);
        }
      }
      return blocks;
}



var blocks = createBlocks(6,7);
