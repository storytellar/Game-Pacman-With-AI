var GameInfo = document.querySelector('.GameInfo');

// 1 = wall
// 2 = blank space
// 3 = coin
// 5 = pacman
// 7 = ghost 1
// 8 = ghost 2
var map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3, 1, 1, 1, 1],
    [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

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
                    this.locationOfcoins.push({x:j,y:i});
                }
            }
        }
        
    },

    Move: function (Arrow) {
        var nextPosition;
        switch (Arrow) {
            case "ArrowLeft":
                nextPosition = map[pacman.y][pacman.x - 1];
                if (nextPosition === 1) return;
                map[pacman.y][pacman.x] = 2;
                pacman.x = pacman.x - 1;
                map[pacman.y][pacman.x] = 5;
                //drawWorld();
                break;
            case "ArrowUp":
                nextPosition = map[pacman.y - 1][pacman.x];
                if (nextPosition === 1) return;
                map[pacman.y][pacman.x] = 2;
                pacman.y = pacman.y - 1;
                map[pacman.y][pacman.x] = 5;
                //drawWorld();
                break;
            case "ArrowRight":
                nextPosition = map[pacman.y][pacman.x + 1];
                if (nextPosition === 1) return;
                map[pacman.y][pacman.x] = 2;
                pacman.x = pacman.x + 1;
                map[pacman.y][pacman.x] = 5;
                //drawWorld();
                break;
            case "ArrowDown":
                nextPosition = map[pacman.y + 1][pacman.x];
                if (nextPosition === 1) return;
                map[pacman.y][pacman.x] = 2;
                pacman.y = pacman.y + 1;
                map[pacman.y][pacman.x] = 5;
                //drawWorld();
                break;
            default:
                break;
        }
        
        switch (nextPosition) {
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



document.onkeydown = function (e) {
    pacman.Move(e.key);
    console.log('\n\n\nĐiểm hiện tại: ' + pacman.score);
    console.log('Vị trí Pacman: ' + pacman.x + '|' + pacman.y);
    pacman.locationOfcoins.forEach(element => {
        console.log('Coin đang ở vị trí: '+ element.x + '|' + element.y);
    });
}


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