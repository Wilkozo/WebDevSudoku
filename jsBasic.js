// Variables created for game
var Difficulty = ["Easy","Normal","Hard"];
var BrdSolved = false;
const Z = 0;
let rowoffset = 0;


// Easy
Board_01 = [
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z]
]


// Normal
Board_02 = [
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z]
]


function ClearBoard()
{
    for (var i = 0; i < 9; i++) 
    {
        for (var j = 0; j < 9; j++) 
        {
            Board_01[i][j] = Z; // Sets to Zero
        }
    }
}

function DisplayBoard() 
{
    for (var i = 0; i < 9; i++) 
    {
        for (var j = 0; j < 9; j++) 
        {
            $("#" + i + j).val(Board_01[i][j]);
        }
    }
}

function CheckBoardSolvable() 
{
    for (var i = 0; i < 9; i++) 
    {
        for (var j = 0; j < 9; j++) 
        {
            if (Board_01[j][i] != 0) 
            {
                if (CheckNumber(i, j, Board_01[j][i]) == false) 
                { return false; }
            }
        }
    }
}

function SeedBoard() 
{
    for (var i = 0; i < 9; i++) 
    {

        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 9);
        let number = Math.floor(Math.random() * 9) + 1;

        if (CheckNumber(x, y, number)) 
        {
            Board_01[y][x] = number;
        }
    }

    Board_02 = Board_01;

    if (CheckBoardSolvable()) 
    {
        ClearBoard()
        SeedBoard()
    }

    Board_01 = Board_02;

}


function CheckNumber(x, y, number)
{

    for(var i = 0; i < 9; i++)
    {
        if (Board_01[i][x] == number) 
        { return false; }
    }

    for (var j = 0; j < 9; j++) 
    {
        if (Board_01[y][j] == number) 
        { return false; }
    }
    
    let Lx = 0;
    let Ly = 0;

    if (x < 3) 
    {
        Lx = 0;
    }
    else if (x < 6) 
    {
        Lx = 3;
    }
    else 
    {
        Lx = 6;
    }

    if (y < 3) 
    {
        Ly = 0;
    }
    else if (y < 6) 
    {
        Ly = 3;
    }
    else 
    {
        Ly = 6;
    }

    for (var i = 0; i < 3; i++) 
    {
        for (var j = 0; j < 3; j++) 
        {
            if (Board_01[i + Ly][j + Lx] == number)
            {
                return false;
            }
        }
    }

    return true;
}

function BoardSolved() 
{
    for (var i = 0; i < 9; i++) 
    {
        for (var j = 0; j < 9; j++) 
        {
            if (Board_01[i][j] == 0) 
            { return false; }
        }
    }
    if (SolveBoard() == false) 
    { return false; }
    
    return true;
}

function SolveBoard()
{
    for (var i = 0; i < 9; i++) 
    {
        for (var j = 0; j < 9; j++) 
        {
            // If slot is empty
            if (Board_01[j][i] == 0) 
            {
                for (var n = 1; n < 10; n++)
                {
                    if (CheckNumber(i, j, n)) 
                    {
                        // Sets Slot to number
                        Board_01[j][i] = n;
                        if (SolveBoard()) 
                        { return true; }
                        // Sets slot to empty
                        Board_01[j][i] = 0;

                    }
                }

                return false;
            }
        }
    }
    

    console.log("Solved!");
    return true;
    
}


function updateInput(position) 
{

    let val = $("#" + position).val();
    if (val.length > 1) 
    { val = val[1]; }
    Board_01[position[0]][position[1]] = val;
    $("#" + position).val(val);
}

$("#New").on("click", function () 
{
    ClearBoard();
    SeedBoard();
    DisplayBoard();
});

$("#Solve").on("click", function () 
{
    SolveBoard();
    DisplayBoard();
});

$("#Check").on("click", function () 
{
    if (BoardSolved() == true)
    {$("h2").html("You Win")}
});

$(document).ready(function ()
{
    ClearBoard();
    SeedBoard();
    DisplayBoard();
})