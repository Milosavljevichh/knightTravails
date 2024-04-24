
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

//this is the factory for the node which will be every move that is possible from the current
function Node(value, nextNode) {
    return {
        value: value,
        nextNode: nextNode
    }
};


function knightMoves(start, end) {
    let movesMade = 0;
    let adjacencyList = [];
    let depthLevel = 0;
    let endFound = false;

    let currentSquare = Node(start, null);
    adjacencyList.push(currentSquare);

    let head;
    let initStart = start;

    //we will repeat this until we find the end position
    while (!endFound) {
        start = adjacencyList[depthLevel].value;
        r = start[0];
        c = start[1];
        //we find the possible moves from the current position
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
        //checking if the current moves we've found are the searched position
        for (let i=depthLevel; i < adjacencyList.length;i++) {
            if (JSON.stringify(adjacencyList[i].value) === JSON.stringify(end)) {
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
        //we move onto the next move in the list
        depthLevel++;
    };

    //we'll find the shortest path starting from the end position (last move we've made)
    let parentMove = end;
    let path = [];
    
    //we repeat this until our last move made is the same as the starting position
    while (JSON.stringify(parentMove) !== JSON.stringify(initStart)) {
        for (let i = adjacencyList.length-1; i>=0; i--) {
            head = adjacencyList[i];
            while (head.nextNode !== null) {
                //in our adjecency list, only one move leads to our parentMove
                //when we find it, we set it as the new parentMove
                if (JSON.stringify(head.nextNode.value) === JSON.stringify(parentMove)) {
                    parentMove = adjacencyList[i].value;
                    movesMade++;
                    path.push(parentMove);
                    break;
                }
                head = head.nextNode;
            };
        }
    }
    
    //printing the solution
    console.log(`You made it in ${movesMade} moves! Here's your path:`)
    for (let i = path.length-1; i>=0; i--) {
        console.log(path[i])
    };
    console.log('---------------------')
    console.log(end)
    console.log('')
};

//function which finds knights available moves
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

//test cases
knightMoves([1,1], [1,3])
knightMoves([1,1], [0,1])
knightMoves([1,1], [7,7])
knightMoves([5,7], [6,3])
knightMoves([0,0], [7,7])
knightMoves([7,7], [7,6])