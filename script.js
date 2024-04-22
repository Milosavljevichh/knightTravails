
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
let depthLevel = 0;
let adjacencyList = [];
//we will create an adjacency list from available moves and then loop through them using depthLevel
//so first we'll loop only through first move of the starting position, then first move of the first move, then 
//first move of the second move and so on... 
const allowedMoves = 63;
//it takes 63 moves for knight to go across the whole board

function knightMoves(start, end) {
    let endFound = false;

    let currentSquare = Node(start, null);
    adjacencyList.push(currentSquare);

    let head;
    
    while (!endFound) {
        start = adjacencyList[depthLevel].value;
        r = start[0];
        c = start[1];
        let availableMoves = findMoves(r, c);

        //creating a linked list out of available moves
        availableMoves = availableMoves.map(mapFunc);
        function mapFunc(move) {
            if (JSON.stringify(move) !== JSON.stringify(start)) {
                let availableMove = Node(move, null);
                head = adjacencyList[depthLevel];
                while (head.nextNode !== null) {
                    head = head.nextNode;
                };
                head.nextNode = availableMove;
                head = adjacencyList[depthLevel];
            };
        };
        for (let i=depthLevel; i < adjacencyList.length;i++) {
            if (JSON.stringify(adjacencyList[i].value) === JSON.stringify(end)) {
                console.log(adjacencyList[i])
                console.log('found it')
                endFound = true;
                };
            };

        if (endFound) break;
        while (head.nextNode !== null) {
            let newPos = Node(head.nextNode.value, null);
            adjacencyList.push(newPos);
            head = head.nextNode;
        };
        depthLevel++;
        console.log(adjacencyList.shift())
    };

    console.log(adjacencyList)
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

knightMoves([1,1], [7,7])

// knightMoves([1,1], [0,1])