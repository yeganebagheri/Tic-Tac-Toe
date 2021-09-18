X_CLASS = 'x'
CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winn = document.querySelector('[winn]')
const restartbtn = document.getElementById('btnWin')
const winningMessage = document.getElementById('winingMessage')

let circleTurn

getStart()

restartbtn.addEventListener('click', getStart)


function getStart(){   
    circleTurn = false
cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener("click", handleClick)
     cell.addEventListener("click", handleClick , { once : true })
})
hoverBoard()
winningMessage.classList.remove('show')
}



function handleClick(e) {
    const cell=e.target
    const currentClass= circleTurn? CIRCLE_CLASS : X_CLASS
placemark(cell,currentClass)
if(checkWin(currentClass)){
    getEnd(false)
}else if(isDraw()){
    getEnd(true)
}else{
    swapTurns()
    hoverBoard()
}
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
    
}

function getEnd(draw){
 if(draw){
    winn.innerText = 'Draw!'
 }else{
     winn.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
 }
 winningMessage.classList.add('show')
}

function hoverBoard(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function placemark(cell , currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combi => {
        return combi.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}