// Written by Tyler Urben 12/3/24 edited on 3/8/25

class Game {
    constructor() {
        this.currentRoomID = 0; //the ID for the current room you are in, starting with 0

        this.rooms = [
                new Room(0,roomDesc[0],1,"Parlor",2,"Study",roomDescAlt[0],false,false,0),
                new Room(1,roomDesc[1],3,"Kitchen",0,"Foyer",roomDescAlt[1],false,false,0),
                new Room(2,roomDesc[2],0,"Foyer",4,"Library",roomDescAlt[2],false,false,0),
                new Room(3,roomDesc[3],5,"Dining Hall",1,"Parlor",roomDescAlt[3],false,false,0),
                new Room(4,roomDesc[4],2,"Study",6,"Bedroom",roomDescAlt[4],false,false,0),
                new Room(5,roomDesc[5],7,"End",3,"Kitchen",roomDescAlt[5],false,true,1),
                new Room(6,roomDesc[6],4,"Library",8,"End",roomDescAlt[6],false,true,2)
                ]; //Creating the rooms using the object creator

        this.keys = [new Key(0,false),
            new Key(1,false),
            new Key(2,false)]; //creating the key objects

        this.$roomSpan = document.getElementById("roomDesc"); //Turning the three visual components into variables so I can alter their visibility
        this.$leftButton = document.getElementById("leftRoom");
        this.$rightButton = document.getElementById("rightRoom");
        this.$exitButton;
        this.$exitSpan;
        this.$roomButton;
        this.$safeButton;
        this.$resetButton = document.getElementById("resetBack");

        this.$roomSpan = this.rooms[this.currentRoomID].roomDesc; //Alters the span content when the page loads
        this.doChangeRoom('start');

        this.$leftButton.addEventListener('click', (event) => {this.doChangeRoom("left");})
        this.$rightButton.addEventListener('click', (event) => {this.doChangeRoom("right");})
        this.$resetButton.addEventListener('click', (event) => {this.resetBack();})

        this.drawBackground();
    }


changeRoom(roomID,direction)  //function for finding the ID of the new room you're moving into
{
    let newRoomID = null;
    if (direction == "left")
    {
        newRoomID = this.rooms[roomID].leftRoomID;
    } else{
        newRoomID = this.rooms[roomID].rightRoomID;
    }
    return newRoomID;
}

doChangeRoom(direction) //function for changing the room
{
    if (direction == 'start') {
        document.getElementById("roomDesc").innerHTML = this.rooms[this.currentRoomID].roomDesc;
        this.$exitButton = document.getElementById("exitButton");
        this.$exitSpan = document.getElementById("exitSpan");
        this.$exitButton.addEventListener('click', (event) => {this.exitDoor();})
    } else {
    this.currentRoomID = this.changeRoom(this.currentRoomID,direction); //get new room ID
    if (this.rooms[this.currentRoomID].roomSearched == true) //check if the room has already been searched
    {
        if (this.keys[0].hasKey == true && this.currentRoomID == 1) //checking if Key 0 has been collected and whether or not you're moving into the room with the safe
        {
            document.getElementById("roomDesc").innerHTML = room1Safe; //if true, use the room1safe dialogue
        } else {
        document.getElementById("roomDesc").innerHTML = this.rooms[this.currentRoomID].roomDescAlt; //else use alt description
        if (this.currentRoomID == 1) {
            this.$safeButton = document.getElementById('safeEnter');
            this.$safeButton.addEventListener('click', (event) => {this.safeEnter();})
        }
        }
    } else{
        document.getElementById("roomDesc").innerHTML = this.rooms[this.currentRoomID].roomDesc; //if the room hasn't been searched, use normal description
        if (this.currentRoomID !== 0) {
        this.$roomButton = document.getElementById("room"+this.currentRoomID+"Button");
        this.$roomButton.addEventListener('click', (event) => {this.roomButton(this.rooms[this.currentRoomID].hasKey,this.rooms[this.currentRoomID].keyID);}) 
        } else {
            this.$exitButton = document.getElementById("exitButton");
            this.$exitSpan = document.getElementById("exitSpan");
            this.$exitButton.addEventListener('click', (event) => {this.exitDoor();})
        }
    } 

    if (this.rooms[this.currentRoomID].leftRoomID > 6){   //checks if the room is the end of the hallway, and sets the direction button to hidden if it is
        this.$leftButton.style.visibility = "hidden";
    } else {
        this.$leftButton.style.visibility = "visible";
    }

    if (this.rooms[this.currentRoomID].rightRoomID > 6){
        this.$rightButton.style.visibility = "hidden";
    } else {
        this.$rightButton.style.visibility = "visible";
    }
    }

    document.getElementById("leftRoom").innerHTML = this.rooms[this.currentRoomID].leftRoomName; //changes the name on the change room buttons to match the new adjacent rooms
    document.getElementById("rightRoom").innerHTML = this.rooms[this.currentRoomID].rightRoomName;
}

exitDoor() //function for the exit door button
{
    if (this.keys[0].hasKey == true && this.keys[1].hasKey == true && this.keys[2].hasKey == true) //checks if you have all 3 keys
    {
        document.getElementById("header").innerHTML = "You have escaped the house!"; //if true, hides the page elements and displays win text
        document.getElementById("roomDesc").innerHTML = "";
        this.$rightButton.style.visibility = "hidden";
        this.$leftButton.style.visibility = "hidden";
    } else{
        document.getElementById("exitSpan").innerHTML = " You need more keys!"; //else tells you to find the keys
    }
}

roomButton(key,keyID) //function for the search button in each room
{
    if (key == true && this.keys[keyID].hasKey == false) //checks if the room has a key and that you don't have it
    {
        this.getKey(keyID); //if true, gives you the key in the room
    }
    document.getElementById("room"+this.currentRoomID+"Span").innerHTML = seachDesc[this.currentRoomID]; //changes the search button to search description dialogue
    if (this.currentRoomID == 1) {
        this.$safeButton = document.getElementById('safeEnter');
        this.$safeButton.addEventListener('click', (event) => {this.safeEnter();})}
    this.rooms[this.currentRoomID].roomSearched = true; //changes the value of roomSearched for the room object to true
    this.$roomButton.style.display = "none";
}

safeEnter() //function for opening the safe
{
    console.log("hi");
    let correctCode = 852; //the safe code
    let enteredCode = document.getElementById("safeCode").value; //grabbing the code that the user entered
    if (enteredCode == correctCode) //checks if the code entered matches the desired code
    {
        this.getKey(0); //if true, gets the key and changes the safe text to tell you you found the key
        document.getElementById("safeSpan").innerHTML = "The safe opens and you find a key!"
    } else {
        document.getElementById("safeSpan").innerHTML += "  Incorrect." // else, display incorrect
    }
}

getKey(keyID) // function for getting keys
{
    this.keys[keyID].hasKey = true; //sets the hasKey value for the key object to true
}



drawBackground(){

    try {
        document.body.style.backgroundImage = `url(${JSON.parse(localStorage["background"])})`;
    } catch {

    
    fetch(`https://php-noise.com/noise.php?hex=&json&base64`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.body.style.background = `url(${data.base64})`;
            localStorage["background"] = JSON.stringify(data.base64);
        })
    }
}

resetBack() {
    localStorage.clear();
    this.drawBackground();
}
        
}

window.onload = () => {new Game()};