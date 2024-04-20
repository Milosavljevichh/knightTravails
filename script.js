
const chessboard = [
    [0,0,0,0,0,0,0,0], //0
    [0,0,0,0,0,0,0,0], //1
    [0,0,0,0,0,0,0,0], //2
    [0,0,0,0,0,0,0,0], //3
    [0,0,0,0,0,0,0,0], //4
    [0,0,0,0,0,0,0,0], //5
    [0,0,0,0,0,0,0,0], //6
    [0,0,0,0,0,0,0,0]  //7
];

function Node(value, nextNode) {
    return {
        value: value,
        nextNode: nextNode
    }
};

let movesMade = 0;
let maxMovesMade = 0;
let depthLevel = -1;
let adjacencyList = [];
//we will create an adjacency list from available moves and then loop through them using depthLevel
//so first we'll loop only through first move of the starting position, then first move of the first move, then 
//first move of the second move and so on... 
const allowedMoves = 63;
//it takes 63 moves for knight to go across the whole board

function knightMoves(start, end) {
    //start == [r, c] - end == [r, c];
    let r = start[0];
    let c = start[1];
    let currentSquare = Node(start, null);
    adjacencyList.push(currentSquare);
    let head;
    let availableMoves = findMoves(r, c);

    if ((movesMade > maxMovesMade && maxMovesMade !== 0) || (maxMovesMade >= 63)) return;

    //creating a linked list out of available moves
    availableMoves = availableMoves.map(mapFunc);
    function mapFunc(move) {
        if (JSON.stringify(move) !== JSON.stringify(start)) {
            let availableMove = Node(move, null);
            head = adjacencyList[movesMade];
            while (head.nextNode !== null) {
                head = head.nextNode;
            };
            head.nextNode = availableMove;
            head = adjacencyList[movesMade];
        };
    };
    
    //checking if currently available moves are == end
    while (head !== null) {
        if (JSON.stringify(head.value) === JSON.stringify(end)) {
            movesMade++;
            console.log(movesMade);
            maxMovesMade = movesMade;
            movesMade = 0;
            return;
        }
        head = head.nextNode;
    };

    head = adjacencyList[movesMade];

    
    
    console.log(adjacencyList);
};

function findMoves(r, c) {
    let arr = [];
    if(chessboard[r+2] !== undefined && chessboard[r+2][c+1] !== undefined) arr.push([r+2, c+1]);
    if(chessboard[r+2] !== undefined && chessboard[r+2][c-1] !== undefined) arr.push([r+2, c-1]);
    if(chessboard[r-2] !== undefined && chessboard[r-2][c+1] !== undefined) arr.push([r-2, c+1]);
    if(chessboard[r-2] !== undefined && chessboard[r-2][c-1] !== undefined) arr.push([r-2, c-1]);
    if(chessboard[r+1] !== undefined && chessboard[r+1][c+2] !== undefined) arr.push([r+1, c+2]);
    if(chessboard[r-1] !== undefined && chessboard[r-1][c+2] !== undefined) arr.push([r-1, c+2]);
    if(chessboard[r+1] !== undefined && chessboard[r+1][c-2] !== undefined) arr.push([r+1, c-2]);
    if(chessboard[r-1] !== undefined && chessboard[r-1][c-2] !== undefined) arr.push([r-1, c-2]);
    return arr;
};

knightMoves([1,1], [1,3])

// knightMoves([1,1], [3,2])