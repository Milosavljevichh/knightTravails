
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


function knightMoves(start, end) {
    let movesMade = 0;
    let maxMovesMade = 0;
    let adjacencyList = [];
    let depthLevel = 0;
    let endFound = false;

    let currentSquare = Node(start, null);
    adjacencyList.push(currentSquare);

    let head;
    let initStart = start;

    while (!endFound) {
        start = adjacencyList[depthLevel].value;
        r = start[0];
        c = start[1];
        let availableMoves = findMoves(r, c);

        //creating a linked list out of available moves
        availableMoves = availableMoves.map(mapFunc);
        function mapFunc(move) {
            if (JSON.stringify(move) !== JSON.stringify(start) && JSON.stringify(move) !== JSON.stringify(initStart)) {
                let availableMove = Node(move, null);
                head = adjacencyList[depthLevel];
                while (head.nextNode !== null) {
                    head = head.nextNode;
                };
                head.nextNode = availableMove;
                head = adjacencyList[depthLevel];
            };
        };
        //checking if the current adjacency list heads are the searched position
        for (let i=depthLevel; i < adjacencyList.length;i++) {
            if (JSON.stringify(adjacencyList[i].value) === JSON.stringify(end)) {
                // console.log(adjacencyList[i])
                // console.log('found it')
                endFound = true;
                break;
                };
            };
        //if they are, we break the loop
        if (endFound) break;
        //if not, we add the currents positions available moves to adjacency list
        while (head.nextNode !== null) {
            let newPos = Node(head.nextNode.value, null);
            adjacencyList.push(newPos);
            head = head.nextNode;
        };
        depthLevel++;
    };

    let parentMove = end;
    let path = [];
    
    while (JSON.stringify(parentMove) !== JSON.stringify(initStart)) {
        for (let i = adjacencyList.length-1; i>=0; i--) {
            head = adjacencyList[i];
            while (head.nextNode !== null) {
                if (JSON.stringify(head.nextNode.value) === JSON.stringify(parentMove)) {
                    parentMove = adjacencyList[i].value;
                    movesMade++;
                    // console.log(parentMove);
                    path.push(parentMove);
                    break;
                }
                head = head.nextNode;
            };
        }
    }
    
    console.log(`You made it in ${movesMade} moves! Here's your path:`)
    for (let i = path.length-1; i>=0; i--) {
        console.log(path[i])
    };
    console.log('---------------------')
    console.log(end)
    console.log('')
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

knightMoves([1,1], [0,1])
knightMoves([1,1], [7,7])
knightMoves([1,1], [1,1])