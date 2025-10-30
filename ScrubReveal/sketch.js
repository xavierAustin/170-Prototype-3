let inputs = {
    ['w']: {p: 0, r: 0, d: 0},
    ['a']: {p: 0, r: 0, d: 0},
    ['s']: {p: 0, r: 0, d: 0},
    ['d']: {p: 0, r: 0, d: 0},
    ['r']: {p: 0, r: 0, d: 0},
    [' ']: {p: 0, r: 0, d: 0},
    ['arrowright']: {p: 0, r: 0, d: 0},
    ['arrowleft']:  {p: 0, r: 0, d: 0},
    ['arrowup']:    {p: 0, r: 0, d: 0},
    ['arrowdown']:  {p: 0, r: 0, d: 0},
};

function handleKeys(){
    for (let x in inputs){
        inputs[x].p = 0;
        inputs[x].r = 0;
    }
}