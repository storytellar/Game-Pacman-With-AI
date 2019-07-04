// 1 = wall
// 2 = blank space
// 3 = coin
// 5 = pacman
// 7 = ghost 1
// 8 = ghost 2
var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
    [1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
// Object Pacman
var pacman = {
    // default position (will be updated with init(map) fucntion )
    x: -1,
    y: -1,

    score: 0,
    stomach: 0,
    amountOfCoinInMap: 0,

    locationOfcoins: [],

    init: function (map) {
        getPosition:
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                const element = map[i][j];
                if (element === 5) {
                    this.y = i;
                    this.x = j;
                    break getPosition;
                }
            }
        }

        getAmountOfCoinInMap:
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                const element = map[i][j];
                if (element === 3) {
                    this.amountOfCoinInMap++;
                }
            }
        }

        getLocationOfCoins:
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                const element = map[i][j];
                if (element === 3) {
                    this.locationOfcoins.push({ x: j, y: i });
                }
            }
        }

    },

    Move: function (Arrow) {
        var nextPositionValue;
        switch (Arrow) {
            case "ArrowLeft":
                nextPositionValue = map[pacman.y][pacman.x - 1];
                if (nextPositionValue === 1) return;
                map[pacman.y][pacman.x] = 2;
                pacman.x = pacman.x - 1;
                map[pacman.y][pacman.x] = 5;
                //drawWorld();
                break;
            case "ArrowUp":
                nextPositionValue = map[pacman.y - 1][pacman.x];
                if (nextPositionValue === 1) return;
                map[pacman.y][pacman.x] = 2;
                pacman.y = pacman.y - 1;
                map[pacman.y][pacman.x] = 5;
                //drawWorld();
                break;
            case "ArrowRight":
                nextPositionValue = map[pacman.y][pacman.x + 1];
                if (nextPositionValue === 1) return;
                map[pacman.y][pacman.x] = 2;
                pacman.x = pacman.x + 1;
                map[pacman.y][pacman.x] = 5;
                //drawWorld();
                break;
            case "ArrowDown":
                nextPositionValue = map[pacman.y + 1][pacman.x];
                if (nextPositionValue === 1) return;
                map[pacman.y][pacman.x] = 2;
                pacman.y = pacman.y + 1;
                map[pacman.y][pacman.x] = 5;
                //drawWorld();
                break;
            default:
                break;
        }

        switch (nextPositionValue) {
            case 2: // Blank Space => decrease score
                pacman.EatNothing();
                break;
            case 3: // Coin
                pacman.EatCoin();
                break;
            case 7: // Ghost
                // code...
                console.log('hù! ma nè');
                break;
            case 8: // Ghost
                // code...
                break;
            default:
                break;
        }
        drawWorld();
    },

    EatCoin: function () {
        this.score += 20;
        this.stomach += 1;
        if (this.stomach === this.amountOfCoinInMap) {
            console.log('Kết thúc game');
        }
    },

    EatNothing: function () {
        this.score -= 1;
    },

};

pacman.init(map);

// User press key
/*document.onkeydown = function (e) {
    pacman.Move(e.key);
    console.log('\n\n\nĐiểm hiện tại: ' + pacman.score);
    console.log('Vị trí Pacman: ' + pacman.x + '|' + pacman.y);
    pacman.locationOfcoins.forEach(element => {
        console.log('Coin đang ở vị trí: ' + element.x + '|' + element.y);
    });
}*/

drawWorld();

function drawWorld() {
    const World = document.getElementById('world');
    World.innerHTML = "";
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const element = map[i][j];
            switch (element) {
                case 1:
                    World.innerHTML += '<div class="wall"></div>';
                    break;
                case 2:
                    World.innerHTML += '<div class="blankspace"></div>';
                    break;
                case 3:
                    World.innerHTML += '<div class="coin"></div>';
                    break;
                case 5:
                    World.innerHTML += '<div class="pacman"></div>';
                    break;
                case 7:
                    World.innerHTML += '<div class="ghost1"></div>';
                    break;
                case 8:
                    World.innerHTML += '<div class="ghost2"></div>';
                    break;
                default:
                    break;
            }
        }
        World.innerHTML += '<br>';
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Tìm theo thuật toán a*
async function FindFastestWay(source, dest, map) {
    isBlocked = false; // bị chắn bởi tường
    // Nếu đi thẳng là tới được thì return, thoát đệ quy
    if (source.x === dest.x) {
        if (source.y < dest.y) {
            for (let i = source.y + 1; i < dest.y; i++) {
                if (map[i][source.x] === 1) {
                    isBlocked = true;
                }
            }
        }
        else {
            for (let i = source.y - 1; dest.y < i; i--) {
                if (map[i][source.x] === 1) {
                    isBlocked = true;
                }
            }
        }
    }
    if (source.y === dest.y) {
        if (source.x < dest.x) {
            for (let i = source.x + 1; i < dest.x; i++) {
                if (map[source.y][i] === 1) {
                    isBlocked = true;
                }
            }
        }
        else{
            for (let i = source.x ; i> dest.x; i--) {
                if (map[source.y][i] === 1) {
                    isBlocked = true;
                }
            }
        }
    }
    if (((source.x === dest.x) || (source.y === dest.y)) && isBlocked == false) {
        console.log("Final selected node: " + source.x, source.y);
        await sleep(500);
        map[source.y][source.x] = 2;
        map[dest.y][dest.x] = 5; 
        drawWorld();
        return [{ x: source.x, y: source.y }, dest];
    }

    var nodes = GetNodeNearby(source, map);
    var selectedNode = nodes[0];
    var f1, f2;
    for (let i = 1; i < nodes.length; i++) {
        f1 = GetDistance(selectedNode, dest) + GetManhattan(selectedNode, dest);
        f2 = GetDistance(nodes[i], dest) + GetManhattan(nodes[i], dest);
        console.log(f1, f2);
        if (f1 > f2) {
            selectedNode = nodes[i];
        }
    }
    console.log("Seleted node: " + selectedNode.x, selectedNode.y);
    await sleep(500);
    map[source.y][source.x] = 2;
    map[selectedNode.y][selectedNode.x] = 5;        
    drawWorld();

    return [].push(FindFastestWay(selectedNode, dest, map));
}

function GetDistance(node1, node2) {
    return Math.sqrt(Math.pow((node1.x - node2.x), 2) + Math.pow((node1.y - node2.y), 2));;
}

function GetManhattan(node1, node2){
    return Math.abs(node2.x - node1.x) + Math.abs(node2.y - node1.y);
}

// Return positions where pacman can change direction
// Example [{1,1}, {6,1},...]
function GetNodeWhereCanChangeDirection(map) {
    let nodes = [];
    for (let y = 1; y < map.length - 1; y++) {
        for (let x = 1; x < map[y].length - 1; x++) {
            let value = map[y][x];
            let leftValue = map[y][x - 1];
            let upValue = map[y - 1][x];
            let rightValue = map[y][x + 1];
            let downValue = map[y + 1][x];
            if ((leftValue !== 1 || rightValue !== 1) && (upValue !== 1 || downValue !== 1) && value !== 1 && value !==5)
                nodes.push({ x: x, y: y });
        }
    }
    return nodes;
}

// Show Node In Map With New Value and draw it
// Input: Array of Node
function ShowNodeInMap(nodes, map) {
    for (let i = 0; i < nodes.length; i++) {
        node = nodes[i];
        for (let y = 1; y < map.length - 1; y++) {
            for (let x = 1; x < map[y].length - 1; x++) {
                if (y == node.y && x == node.x) {
                    // new value
                    map[y][x] = 8;
                }
            }
        }
    }
    drawWorld();
}

// Return array of nodes if they're nearby a choosen node
function GetNodeNearby(node ,map) {
    //Get all key nodes.
    let allNodes = GetNodeWhereCanChangeDirection(map);
    //console.log(allNodes);
    var NearbyNodes = [];

    //Get all nodes that have the same x or y as chosen node
    let sameRow = allNodes.filter(temp => temp.y === node.y);
    var farLeft = new Array;
    var farRight = new Array;
    for(let i = 0; i < sameRow.length; i++){
        node.x > sameRow[i].x ? farLeft.push(sameRow[i]) : farRight.push(sameRow[i]);
    }
    var leftNodes = farLeft.sort(function(a, b){
        return Math.abs(a.x - node.x) - Math.abs(b.x - node.x);
    });
    var rightNodes = farRight.sort(function(a, b){
        return Math.abs(a.x - node.x) - Math.abs(b.x - node.x);
    });

    let sameCol = allNodes.filter(temp => temp.x === node.x);
    var farUp = new Array;
    var farDown = new Array;
    for(let i = 0; i < sameCol.length; i++){
        node.y > sameCol[i].y ? farUp.push(sameCol[i]) : farDown.push(sameCol[i]);
    }
    var upNodes = farUp.sort(function(a, b){
        return Math.abs(a.y - node.y) - Math.abs(b.y - node.y);
    });
    var downNodes = farDown.sort(function(a, b){
        return Math.abs(a.y - node.y) - Math.abs(b.y - node.y);
    });
    console.log(farDown);
    
    NearbyNodes.push(leftNodes[0], upNodes[0], rightNodes[0], downNodes[0]);
    NearbyNodes = NearbyNodes.filter(temp => !(temp === undefined));
    console.log(NearbyNodes);
    //ShowNodeInMap(NearbyNodes, map);
    
    return NearbyNodes;
}
//var nodes = GetNodeNearby(pacman, map);
//var nodes = GetNodeWhereCanChangeDirection(map);
//ShowNodeInMap(nodes, map);
//GetNodeWhereCanChangeDirection(map);
var Sel = FindFastestWay(pacman, pacman.locationOfcoins[0] , map);
//console.log(pacman.locationOfcoins[0]);
//var nodes = GetNodeWhereCanChangeDirection(map);
// console.log(FindFastestWay(pacman, { x: 11, y: 5 }, map));