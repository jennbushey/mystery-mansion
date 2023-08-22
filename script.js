const code = [];
const display = document.querySelector(".screen");

let roomsList = {
    // TODO randomize rooms with room codes
    11: "living room",
    12: "bedroom",
    13: "kitchen",
    14: "game room",
    21: "gym",
    22: "music room",
    23: "study",
    24: "library",
    31: "dining room",
};

let dressedRooms = {
    "dining room": [
        " Dining Room Chair",
        " Dining Room Chair",
        " Dining Table",
        " China Cabinet",
    ],

    bedroom: [" Coffee Table", " Bed", " Dresser"],

    kitchen: [" Refrigerator", " Sink", " Oven", " Kitchen Table"],

    "game room": [" Pool Table", " Pinball Machine", " Telescope"],

    gym: [" Hot Tub", " Treadmill"],

    "music room": [" Piano", " Clock", " Juke Box", " Rug"],

    "living room": [
        " Sofa",
        " Fireplace",
        " Knight",
        " Television",
        " Fish Tank",
    ],

    study: [
        " Computer",
        " Floor Lamp",
        " Planter",
        " Easel",
        " Black Armchair",
        " Black Armchair",
    ],

    libary: [
        " White Armchair",
        " White Armchair",
        " Small Bookcase",
        " Large Bookcase",
    ],
};

let furnitureList = {
    111: "Dining Room Chair",
    112: "Dining Room Chair",
    113: "Dining Table",
    114: "China Cabinet",
    121: "Sofa",
    122: "Coffee Table",
    123: "Bed",
    124: "Dresser",
    131: "Small Bookcase",
    132: "Refrigerator",
    133: "Sink",
    134: "Oven",
    141: "Kitchen Table",
    142: "Pool Table",
    143: "Pinball Machine",
    144: "Large Bookcase",
    211: "Hot Tub",
    212: "Treadmill",
    213: "Piano",
    214: "Telescope",
    221: "Clock",
    222: "Computer",
    223: "Juke Box",
    224: "Rug",
    231: "Fireplace",
    232: "Knight",
    233: "Television",
    234: "Fish Tank",
    241: "Floor Lamp",
    242: "Planter",
    243: "Easel",
    244: "Black Armchair",
    311: "Black Armchair",
    312: "White Armchair",
    313: "White Armchair",
};

let clue_key = ["key", "key"];
let clue_people = ["Maid", "Butler", "Chauffeur", "Cook"];
let clue_item = ["tape", "letter", "photos", "map"];
let clues = [];
let locked_rooms = [];
let money = [];
let trap;
let userDecision;
let rooms = Object.keys(roomsList); // room numbers
let furniture = Object.keys(furnitureList); // furniture numbers
let codeInt;
let secretMessages = [];

// console.table(roomsList);
// console.table(furnitureList);

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

function startGame() {
    //listens for buttons being clicked and calls enter code function
    display.textContent = "Welcome";
    // randomRooms();
    lockedRooms();
    Money();
    trapDoor();
    clueItems();
    secretMessageItems();

    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) =>
        button.addEventListener("click", () => {
            if (button.id) {
                enterCode(button.innerText);
            }
        })
    );
}
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

function enterCode(entry) {
    //takes button click and either stores the values, clears the array, or calls look function
    switch (entry) {
        case "Clear":
            //clears code array and screen
            console.log("clear");
            code.length = 0;
            display.textContent = "";
            break;
        case "Yes":
        case "No":
            userDecisionBool(entry);
            break;
        case "Enter":
            //calls look function
            codeInt = code.join("");
            console.log(codeInt);
            look(codeInt);
            console.log("enter");
            code.length = 0;
            break;
        case "1":
        case "2":
        case "3":
        case "4":
            //adds number to code array and displays on screen
            if (code.length < 3) {
                code.push(entry);
                display.textContent = code.join(" ");
            }
            break;
        case "Reset":
            resetGame();
    }
}

function look(codeInt) {
    // checks length code
    // call next function
    if (codeInt.length === 2) {
        console.log(roomsList[codeInt]);
        dressRooms(codeInt);
    } else if (codeInt.length === 3) {
        console.log(furnitureList[codeInt]);
        theFurniture(codeInt);
    }
}

function dressRooms(codeInt) {
    if (locked_rooms.includes(codeInt)) {
        // check for locked rooms
        display.textContent = `This room is locked. Do you have a key?`;
    } else {
        // if room not locked proceed with the following code
        room_furniture = dressedRooms[roomsList[codeInt]];
        console.log(room_furniture);
        display.textContent = `This is the ${roomsList[codeInt]}.\nYou see the following:\n${room_furniture}`;
    }
}

function unlockRooms(userDecision) {
    if (userDecision) {
        // remove room from locked rooms list
        console.log(roomsList[codeInt] + " unlocked");
        index = locked_rooms.indexOf(codeInt); // first index of item
        locked_rooms.splice(index, 1); // remove first instance of index
        console.log(locked_rooms);
        dressRooms(codeInt);
    } else {
        display.textContent = `Sorry.`;
    }
}

function theFurniture(codeInt) {
    if (!furniture.includes(codeInt)) {
        display.textContent = `Invalid choice. Try again.`;
    } else if (trap_door.includes(codeInt)) {
        display.textContent = "Whoops! A trap door! Go to the entrance.";
    } else {
        display.textContent = `${furnitureList[codeInt]}`; // display furniture item
        // check for clues
        hiddenClues(codeInt);
    }
}

async function secretMessage() {
    // TODO secret message functionality
    // secret decoder message when you unlock clues
    mysteryNo1 = Math.floor(Math.random() * 100);
    mysteryNo2 = Math.floor(Math.random() * 100);
    console.log(`Mysery number is: ${mysteryNo1, mysteryNo2}`);


    
    // determines which items have questions
    not_money_room = rooms;
    not_money_room.splice(money[0], 1);

    not_money_furniture = furniture;
    not_money_furniture.splice(money[1], 1);

    if (mysteryNo1 > 15) {
        // public message
        if (mysteryNo2) {
            display.textContent = `The money is not in the ${not_money_room}`;
        } else {
            display.textContent = `The money is not in the ${not_money_furniture}`;
        }
    } else {
        // private message
        display.textContent = ` *** BEEP BEEP BEEP ***`;
        await sleep(3000);
        display.textContent = `Look in the ${
            furnitureList[clues[Math.floor(clues.length * Math.random())]]
        } for a clue.`;
        await sleep(5000);
        display.textContent = `Secret message has disappeared.`;
    }
}

function hiddenClues(codeInt) {
    if (clues.includes(codeInt) && clues.length > 5) {
        display.textContent = `${furnitureList[codeInt]}, \r\n You've found a clue!`;
        index = clues.indexOf(codeInt); // first index of clue item
        clues.splice(index, 1); // remove first instance of index
        console.log(`remaining clue furniture is: ${clues}`);
    } else if (clues.includes(codeInt)) {
        display.textContent = `${furnitureList[codeInt]}, \r\n You've found a clue! Take a clue from another player.`;
        index = clues.indexOf(codeInt); // first index of clue item
        clues.splice(index, 1); // remove first instance of index
        console.log(`remaining clue furniture is: ${clues}`);
    } else {
        display.textContent = `${furnitureList[codeInt]}. No clues here.`;
    }
}

function letsTalk() {
    //no computer entry necessary
}

function userDecisionBool(entry) {
    if (entry === "Yes") {
        userDecision = true;
    } else userDecision = false;
    console.log(userDecision);
    unlockRooms(userDecision);
}

function lockedRooms() {
    //determines which rooms will be locked at the start of the game
    rooms = Object.keys(roomsList); // room numbers
    for (i = 0; i < clue_key.length; i++) {
        valid = false;
        while (!valid) {
            locked = rooms[Math.floor(rooms.length * Math.random())];
            if (locked != 11) valid = true;
        }
        locked_rooms.push(locked);
        if (locked_rooms[0] == locked_rooms[1]) {
            // if locked rooms are the same, repeat loop until they are different.
            i--;
        }
    }
    console.log(`locked rooms are: ${locked_rooms}`);
    return locked_rooms;
}

function Money() {
    // determines which room, furniture, item, and person is necessary to access the money.
    let money_room = rooms[Math.floor(rooms.length * Math.random())];
    let money_furniture =
        furniture[Math.floor(furniture.length * Math.random())];
    let money_person =
        clue_people[Math.floor(clue_people.length * Math.random())];
    let money_item = clue_item[Math.floor(clue_item.length * Math.random())];

    money = [money_room, money_furniture, money_item, money_person];
    console.log(
        `money requires: ${
            (roomsList[money_room],
            furnitureList[money_furniture],
            money_item,
            money_person)
        }`
    );
    return money;
}

function trapDoor() {
    // determines which furniture leads to the trap door
    trap = money[1];
    while (trap == money[1]) {
        trap = furniture[Math.floor(furniture.length * Math.random())];
    }
    trap_door = [trap];
    console.log(`trap door is: ${furnitureList[trap]}`);
    return trap;
}

function clueItems() {
    //determines which items have clues
    for (i = 0; i < 15; i++) {
        clues[i] = furniture[Math.floor(furniture.length * Math.random())];
    }
    console.log(`clue furniture is: ${clues}`);
    return clues;
}

function secretMessageItems() {
    // determines which items have secret messages
    for (i = 0; i < 10; i++) {
        temp = furniture[Math.floor(furniture.length * Math.random())];
        if (temp == money[1] || clues.includes(temp)) i--;
        secretMessages[i] = temp;
    }
    console.log(`secret message furniture is: ${secretMessages}}`);
    return secretMessages;
}

function resetGame() {
    // reset all variables to original position
    location.reload();
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomRooms(roomsList, roomNumbers) {
    //randomizes rooms

    // for (room in roomsList){

    // }

    //roomShuffle = document.querySelectorAll('.rooms');
    //roomShuffle.forEach(room => roomsList.push());
    //let rando = Math.floor(Math.random() * rooms.length);

    return roomsList, roomNumbers;
}

function move() {
    //no computer entry necessary
}
