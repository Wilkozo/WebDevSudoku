// Variables created for game
var Difficulty = ["Easy","Normal","Hard"];
var SBoard = [81] = 0; // Sudoku Board
var BrdSolved = false;
const Z = 0;


// Easy
const Board_01 = [
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
const Board_02 = [
    [7, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, 6, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, 3, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, Z, Z, Z, Z],
    [Z, Z, Z, Z, Z, 4, Z, Z, Z]
]


function ClearBoard()
{
    

}


function InitialiseBoard()
{
    var m_sboard; // seedboard function;
    //m_sboard =  solve function

}


function SeedBoard()
{

}


function SolveBoard(SBoard)
{
    // Checks if the board has already been solved...
    if (SolveBoard(SBoard))
    {return SBoard}
    else
    {
        const Solutions = nextGrids(SBoard) // Gets possible solutions
        const ValidSolutions = PurgeBadSolutions(Solutions) // Pruning
        return FindSolution(ValidSolutions) // returns the solution 
    }

}


function FindSolution(SBoard)
{
    // checks if the board length
    if (SBoard.length < 1) 
    {return false}
    else
    {
        // backtrack the board for an answer...
        var first = SBoard.shift() // gets first element
        const TryPath = SolveBoard(first)
        // If it fails
        if (TryPath != false)
        { return TryPath}
        else
        { return FindSolution(SBoard)}
    }
}


function CheckSolved(SBoard)
{
    // Rows
    for (var i = 0; i < 9; i++)
    {
        // Columns
        for (var j = 0; j< 9; j++)
        {
            if (board[i][j] === null)
            {
                return false
            }
        }
    }
    return true
}


function nextGrids(SBoard)
{
    var result = []
    const firstBlank = findEmptySlot(SBoard) // should return Coords 
    if (firstBlank != undefined)
    {
        const y = firstBlank[0]
        const x = firstBlank[1]
        for (var i = 1; i <= 9; i++)
        {
            var tmpBoard = [...SBoard]
            var row = [...tmpBoard[y]]
            row[x] = i
            tmpBoard[y] = row
            result.push(tmpBoard)
        }
    }
    return result
}


function findBlankSlot(SBoard)
{
    for (var i = 0; i < 9; i++)
    {
        for (var j = 0; j < 9; j++)
        {
            if (SBoard[i][j] == null)
            {
                return [i,j]
            }
        }
    }
}


function PurgeBadSolutions(SBoard)
{return SBoard.filter(Z => ValidGrid(Z))}


function ValidGrid(SBoard)
{return ValidRow(SBoard) && ValidColumn(SBoard) && ValidGrids(SBoard)}

function ValidRow(SBoard)
{
    for (var i = 0; i < 9; i++)
    {
        var current = []
        for (var j = 0; j < 9; j++)
        {
            if (current.includes(SBoard[i][j]))
            {
                return false
            }
            else if (SBoard[i][j] != null)
            {current.push(SBoard[i][j])}
        }
    }
    return true
}

function ValidColumn(SBoard)
{
    for (var i = 0; i < 9; i++)
    {
        var current = []
        for (var j = 0; j < 9; j++)
        {
            if (current.includes(SBoard[j][i]))
            {
                return false
            }
            else if (SBoard[i][j] != null)
            {current.push(SBoard[j][i])}
        }
    }
    return true
}

function ValidGrids(SBoard)
{
    const GridCoords = [
        [0, 0], [0,1], [0,2],
        [1, 0], [1,1], [1,2],
        [2, 0], [2,1], [2,2]
    ]
    
    for (var y = 0; y < 9; y+=3)
    {
        for (var x = 0; x < 9; x+=3)
        {
            var current = []
            for (var i = 0; i < 9; i++)
            {
                var Coords = [...GridCoords[i]]
                Coords[0] += y
                Coords[1] += x
                if (current.includes(SBoard[Coords[0]][Coords[1]]))
                {return false}
                else if (SBoard[Coords[0]][Coords[1]] != null)
                {current.push(SBoard[Coords[0]][Coords[1]])}
            }
        }
    }
    return true
}

console.log(solve(Board_01))