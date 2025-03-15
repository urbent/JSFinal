// Written by Tyler Urben 12/3/24 edited on 3/8/25

class Room {
    constructor(roomID,roomDesc,leftRoomID,leftRoomName,rightRoomID,rightRoomName,roomDescAlt,roomSearched,hasKey,keyID) {
        this.roomID = roomID;
        this.roomDesc = roomDesc;
        this.leftRoomID = leftRoomID;
        this.leftRoomName = leftRoomName;
        this.rightRoomID = rightRoomID;
        this.rightRoomName = rightRoomName;
        this.roomDescAlt = roomDescAlt;
        this.roomSearched = roomSearched;
        this.hasKey = hasKey;
        this.keyID = keyID;
    }
}
 //creating an array for the room dialogue
const roomDesc = [
    "The Foyer is large and imposing. Dust flies through the air, illuminated by<br>a soft, ghostly light filtering in though the large windows. The grand central staircase<br>seems broken and impassable.<br><br>The front door to the outside is held fast by a strange lock with three keyholes.<br>To the left is the doorway to the Parlor.<br>To the Right is the doorway to the Study.<br><br><br> <button id='exitButton'class='btn btn-default'>Exit Door</button><span id='exitSpan'></span>",
    "You enter the Parlor. Around you, you see relics of the people who used to live here.<br>Old lounge couches draped in dusty sheets. A central fireplace, empty of life. A yellowed<br>grand piano, seemingly abandoned mid-song. Above the fireplace, a large portrait of dark<br>figure whose features are impossible to make out.<br><br>To the left is the doorway to the Kitchen.<br>To the right is the doorway to the Foyer.<br><br><br> <button id='room1Button'class='btn btn-default'>Search</button> <span id='room1Span'></span>",
    "You enter the Study, and are met with a quiet alcove. A dusty desk with now empty<br>inkwells and abandoned quils. Next to it, a broken chair set by a fireplace for<br>reading. A small pile of moldy books lay in the corner.<br><br>To the left is the doorway to the Foyer.<br>To the right is the doorway to the Library.<br><br><br> <button id='room2Button'class='btn btn-default'>Search</button> <span id='room2Span'></span>",
    "You enter the Kitchen. Strewn about are various kitchen utensils, caked in dust and<br>rotted food. An old brick oven is drenched in a web of overlapping cobwebs so thick<br>that you can hardly see the bricks. A wash basin is full of dark, oily liquid that<br>doesn't seem to drain.<br><br>To the left is the doorway to the Dining Hall.<br>To the right is the doorway to the Parlor.<br><br><br> <button id='room3Button'class='btn btn-default'>Search</button> <span id='room3Span'></span>",
    "You enter the Library. Amazingly this room seems suprisingly intact, given the state<br>of the rest of the house. Long shelves lined with organized covers, a cold fireplace<br>that still looks usable, and an untouched portrait of a women in a old dress.<br><br>To the left is the doorway to the Study.<br>To the right is the doorway to the Bedroom.<br><br><br> <button id='room4Button'class='btn btn-default'>Search</button> <span id='room4Span'></span>",
    "You enter the Dining Hall. Before you lies what was once a feast. A long table with 13<br>chairs on either side. Each place is set with utencils and dishware. On the table is<br>an incredible banquet of various foods, all now beset with rot and decay. The centerpiece,<br>a whole roast pig, now complete with mold and maggots.<br><br>To the right is the doorway to the Kitchen.<br><br><br> <button id='room5Button'class='btn btn-default'>Search</button> <span id='room5Span'></span>",
    "You enter the Bedroom. A grandiose scale, but with simple adornments. A large master bed<br>centers the room, while only dressed with a simple white sheet. Old disfigured candles<br>rest on a plain vanity, it's mirror shattered on the ground nearby. An open dresser,<br>revealing modest clothes, now adorned with dust.<br><br>To the left is the doorway to the Library.<br><br><br> <button id='room6Button'class='btn btn-default'>Search</button> <span id='room6Span'></span>"
];

//an alternate set of dialogue for each room after you've searched them
const roomDescAlt = [
    "",
    "You enter the Parlor. Around you, you see relics of the people who used to live here.<br>Old lounge couches draped in dusty sheets. A central fireplace, empty of life. A yellowed<br>grand piano, seemingly abandoned mid-song. Above the fireplace, a large portrait of dark<br>figure whose features are impossible to make out.<br><br>To the left is the doorway to the Kitchen.<br>To the right is the doorway to the Foyer.<br><br><br><span id='safeSpan'> There is a safe with a 3-digit code. <br> <input id='safeCode' type='number'/><button id='safeEnter'class='btn btn-default'>Enter</button></span>",
    "You enter the Study, and are met with a quiet alcove. A dusty desk with now empty<br>inkwells and abandoned quils. Next to it, a broken chair set by a fireplace for<br>reading. A small pile of moldy books lay in the corner.<br><br>To the left is the doorway to the Foyer.<br>To the right is the doorway to the Library.<br><br><br> You have already searched this room.",
    "You enter the Kitchen. Strewn about are various kitchen utensils, caked in dust and<br>rotted food. An old brick oven is drenched in a web of overlapping cobwebs so thick<br>that you can hardly see the bricks. A wash basin is full of dark, oily liquid that<br>doesn't seem to drain.<br><br>To the left is the doorway to the Dining Hall.<br>To the right is the doorway to the Parlor.<br><br><br> You have already searched this room.",
    "You enter the Library. Amazingly this room seems suprisingly intact, given the state<br>of the rest of the house. Long shelves lined with organized covers, a cold fireplace<br>that still looks usable, and an untouched portrait of a women in a old dress.<br><br>To the left is the doorway to the Study.<br>To the right is the doorway to the Bedroom.<br><br><br> You have already searched this room. The book you found is still lying open, the numbers <mark>'852'</mark> displayed.",
    "You enter the Dining Hall. Before you lies what was once a feast. A long table with 13<br>chairs on either side. Each place is set with utencils and dishware. On the table is<br>an incredible banquet of various foods, all now beset with rot and decay. The centerpiece,<br>a whole roast pig, now complete with mold and maggots.<br><br>To the right is the doorway to the Kitchen.<br><br><br> You have already searched this room and collected a key.",
    "You enter the Bedroom. A grandiose scale, but with simple adornments. A large master bed<br>centers the room, while only dressed with a simple white sheet. Old disfigured candles<br>rest on a plain vanity, it's mirror shattered on the ground nearby. An open dresser,<br>revealing modest clothes, now adorned with dust.<br><br>To the left is the doorway to the Library.<br><br><br> You have already searched this room and collected a key."
];

//description for searching in each room
const seachDesc = [
    "",
    "<span id='safeSpan'> Inspecting the room, you find a hidden safe behind the portrait. It seems to accept a<br>3-digit code.<br> <input id='safeCode' type='number'/><button id='safeEnter'>Enter</button></span>",
    "Rifling through the drawers of the desk, you are disapointed to find nothing. You attempt<br>to search the books in the pile, but they fall apart in your hands and you find nothing.<br>There appears to be nothing of use in this room.<br>",
    "Searching through the various aspects of the room, you find nothing of use. With all<br>other options removed, you steel yourself to check the oily black liquid. Submerging<br>your arm down to the elbow, you root around the bottom. To your dismay, you fail to fish<br>anything from the bottom. There appears to be nothing of use in this room.<br>",
    "Unsure of where to start with the books, you decide to start with the other aspects of<br>the room. The fireplace yields nothing, but upon inspecting the portrait of the women,<br>you notice that she's holding a book. Remarkably well organized, it only takes you a few<br>minutes to hunt down the book. Opening it to a marked page, you see the numbers <mark>'852'</mark> <br>scrawled inside.<br>",
    "Using the help of the discared silverware, you are able to rifle through the feast on<br>the table without too much trouble. You notice a small glint from inside the mouth of<br>the pig. You are able to pry it out with your makeshift tool. Wiping off the residue,<br>you collect your prize. You have found a key!<br>",
    "Searching the room, you find the bed to be empty of importance. Being careful of<br>the glass, the vanity is also useless. Searching through the clothes of the dresser,<br>you reach into the pocket of a coat and retrieve something metal. You have found a key!<br>"
];

// description for when the safe is open in room 1
const room1Safe = "You enter the Parlor. Around you, you see relics of the people who used to live here.<br>Old lounge couches draped in dusty sheets. A central fireplace, empty of life. A yellowed<br>grand piano, seemingly abandoned mid-song. Above the fireplace, a large portrait of dark<br>figure whose features are impossible to make out.<br><br>To the left is the doorway to the Kitchen.<br>To the right is the doorway to the Foyer.<br><br><br> The safe is open and you have already collected this key."