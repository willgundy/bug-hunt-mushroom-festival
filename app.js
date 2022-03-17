// import functions and grab DOM elements
import { renderMushroom, renderFriend } from './render-utils.js';
import { addFriend, findFriendByName } from './data-utils.js';

const friendsEl = document.querySelector('.friends');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.querySelector('#add-friend-button');

const friendInputEl = document.querySelector('#friend-input');
// initialize state

let mushroomCount = 3;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2
    },
    {
        name: 'Sarah',
        satisfaction: 3
    },
    {
        name: 'Missael',
        satisfaction: 1
    },
    {
        name: 'Soraya',
        satisfaction: 2
    },
];

function displayFriends() {
    friendsEl.innerHTML = '';

    for (let friend of friendData) {
        const friendEl = renderFriend(friend);

        friendEl.addEventListener('submit', () => {
            const friendInState = findFriendByName(friend.name, friendData);
    
            if (mushroomCount === 0) {
                alert('no mushrooms left! go forage for some more');
            }
            if (mushroomCount > 0 && friendInState.satisfaction < 3) {
                friendInState.happiness++;
                mushroomCount++;
        
                displayFriends();
                displayMushrooms();    
            }
        });

        friendsEl.append(friendEl);
    }
}


function displayMushrooms() { 
    mushroomsEl.innerHTML = '';

    for (let i = 0; i < mushroomCount; i++) {
        const mushroomEl = renderMushroom();

        mushroomsEl.append(mushroomEl);
    }
}


addFriendButton.addEventListener('click', () => {
    const name = friendInputEl.value;

    addFriend(friendData, name);

    friendInputEl.value = '';

    displayFriends();
});


addMushroomButton.addEventListener('click', () => {
    if (Math.random() > .5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

displayFriends();

displayMushrooms();