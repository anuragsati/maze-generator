import { useState, useEffect} from 'react';
import Node from './HuntAndKillNode';
import './HuntAndKill.css';

//constants
const dRow = [-1, 0, 1, 0]; 
const dCol = [0, 1, 0, -1];
let directionArray = [0,1,2,3];

//select grid size
let windowWidth;
let windowHeight;

if(window.matchMedia("(max-width: 600px)").matches){
    windowWidth =  Math.floor((window.innerWidth)/24);
    windowHeight = 10;
}
else{
    windowWidth =  Math.floor((window.innerWidth-400)/24);
    windowHeight = 20;
};

let speed=50;
let HuntAndKillInterval;

const HuntAndKill = () => {
    //Hooks
	let [grid, setGrid] = useState([]);

	//when our page first mounts
	useEffect(() => {
		setGrid(getInitialGrid());
	}, []);



	// =========== Additional Functions =============

	//Creates Inital grid
	const getInitialGrid = () => {          
		const initialGrid= [];
		for (let row = 0; row < windowHeight; row++) {
			const currentRow = [];
			for (let col = 0; col < windowWidth; col++) {
				currentRow.push(createNode(row,col));
			}
			initialGrid.push(currentRow);
		}

		return initialGrid;
	}

	//Creates the node template
	const createNode = (row, col) => {
		return {
			row,
			col,
			isVisited : false,
		}
	}

    function disableEverything(enableOrDisable){
        const navbar = document.getElementsByClassName('navbar')[0];
        const generateButton = document.getElementsByClassName('HuntAndKill-generate-button')[0];

        if(enableOrDisable){
            navbar.style.pointerEvents = "none";
            generateButton.style.pointerEvents = "none"
        }
        else{
            navbar.style.pointerEvents = "auto";
            generateButton.style.pointerEvents = "auto"
        }
    }

    
    const generateMaze = () => {
        //Disable everything
        disableEverything(true);

        //start from (5,7)
        let currentNode = {row:5, col:7};

        let curr, prev;
        prev = document.getElementById(`HuntAndKill-node-${currentNode.row}-${currentNode.col}`);
        prev.classList.add('HuntAndKill-consideration');

            
        HuntAndKillInterval = setInterval(() => {

            //visit current node
            grid[currentNode.row][currentNode.col].isVisited = true;

            prev.classList.remove('HuntAndKill-consideration')
            prev.classList.add('HuntAndKill-fully-visited');
            curr = document.getElementById(`HuntAndKill-node-${currentNode.row}-${currentNode.col}`);
            curr.classList.remove('HuntAndKill-fully-visited')
            curr.classList.add('HuntAndKill-consideration');


            //first check if i can visit any neighbour
            if(!canVisitNeighbour(currentNode)){
                let huntResult = startHuntMode();

                //if hunt did not return anything i.e all cells are visited
                if(huntResult === -1){
                    disableEverything(false);
                    clearInterval(HuntAndKillInterval);
                }
                //if hunt returned node which we have to visit next
                else{

                    //animate hunt procedure
                    //
                    //

                    prev = document.getElementById(`HuntAndKill-node-${currentNode.row}-${currentNode.col}`);

                    currentNode = {row:huntResult.row, col:huntResult.col};
                }
            }

            //if there are neighbours that i can visit
            else{
                //Randomly choose an valid adjacent cell that has not been visited
                shuffle(directionArray);
                for(let i of directionArray){
                    if(isValid(currentNode.row, currentNode.col, i)){
                        const adjX = currentNode.row + dRow[i];
                        const adjY = currentNode.col + dCol[i];

                        //remove walls b/w current and next element
                        const currentNodeElement = document.getElementById(`HuntAndKill-node-${currentNode.row}-${currentNode.col}`);
                        const nextNodeElement = document.getElementById(`HuntAndKill-node-${adjX}-${adjY}`);
                        removeWalls(currentNodeElement, nextNodeElement, i);


                        prev = currentNodeElement;

                        currentNode = {row:adjX, col:adjY};
                        break;
                    }
                }
            }

        }, speed);

    }

    function startHuntMode(){
        for (let row = 0; row < windowHeight; row++) {
            for (let col = 0; col < windowWidth; col++) {
                if(unvisitedNodeWithVisitedNeighbour(row, col)){
                    return {row, col};
                }
            }
        }

        return -1;
    }

    function unvisitedNodeWithVisitedNeighbour(row, col){
        //if node is not visited then
        if(!grid[row][col].isVisited){
            //check all direction to see if we can find a node that is visited
            for(let i=0; i<4; ++i){

                const newRow = row + dRow[i];
                const newCol = col + dCol[i];

                //bad row,col
                if (newRow < 0 || newCol < 0 || newRow >= windowHeight || newCol >= windowWidth)
                    continue
                
                //if it is not a bad row,col and it is visited
                if (grid[newRow][newCol].isVisited)
                    return true;
            }
        }

        return false;
    }

  
    function canVisitNeighbour(currentNode){
        for(let i of directionArray){
            if(isValid(currentNode.row, currentNode.col, i)){
                return true;
            }
        }

        return false;
    }
 
    //checks if next node is valid
    function isValid(row, col, nextNodeDirection){
        const newRow = row + dRow[nextNodeDirection];
        const newCol = col + dCol[nextNodeDirection];
    
        if (newRow < 0 || newCol < 0 || newRow >= windowHeight || newCol >= windowWidth)
            return false;
    
        if (grid[newRow][newCol].isVisited)
            return false;
        
        return true;
    }
    
    //randomly shuffles the direction array
    function shuffle() {
        for (let i = directionArray.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directionArray[i], directionArray[j]] = [directionArray[j], directionArray[i]];
        }
        return directionArray;
    }
    
    //remove walls between current and previous element
    //removes walls and and a fake wall in its place
    function removeWalls(currentNodeElement, nextNodeElement, direction){
        if(direction === 0){ //up
            currentNodeElement.classList.remove('HuntAndKill-top-wall');
            nextNodeElement.classList.remove('HuntAndKill-bottom-wall');
    
            currentNodeElement.classList.add('HuntAndKill-fake-top-wall');
            nextNodeElement.classList.add('HuntAndKill-fake-bottom-wall');
        }
        else if(direction === 1){ //right
            currentNodeElement.classList.remove('HuntAndKill-right-wall');
            nextNodeElement.classList.remove('HuntAndKill-left-wall');
    
            currentNodeElement.classList.add('HuntAndKill-fake-right-wall');
            nextNodeElement.classList.add('HuntAndKill-fake-left-wall');
        }
        else if(direction === 2){ //down
            currentNodeElement.classList.remove('HuntAndKill-bottom-wall');
            nextNodeElement.classList.remove('HuntAndKill-top-wall');
    
            currentNodeElement.classList.add('HuntAndKill-fake-bottom-wall');
            nextNodeElement.classList.add('HuntAndKill-fake-top-wall');
        }
        else if(direction === 3){ //left
            currentNodeElement.classList.remove('HuntAndKill-left-wall');
            nextNodeElement.classList.remove('HuntAndKill-right-wall');
    
            currentNodeElement.classList.add('HuntAndKill-fake-left-wall');
            nextNodeElement.classList.add('HuntAndKill-fake-right-wall');
        }
    }



	//resets everything
	const resetAll = () => {
        disableEverything(false);
        clearInterval(HuntAndKillInterval);

        const freshClass = 'HuntAndKill-node HuntAndKill-left-wall HuntAndKill-right-wall HuntAndKill-top-wall HuntAndKill-bottom-wall';
            for (let row = 0; row < windowHeight; row++) {
                for (let col = 0; col < windowWidth; col++) {
                    document.getElementById(`HuntAndKill-node-${row}-${col}`).className = freshClass;
                }
            }

        grid = getInitialGrid();
        setGrid(grid);
        
        directionArray = [0,1,2,3];
	}

  
    return(
        <main className="HuntAndKill-main">
            <div className="HuntAndKill-topic"> 
                <span>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="skull" className="svg-inline--fa fa-skull fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0C114.6 0 0 100.3 0 224c0 70.1 36.9 132.6 94.5 173.7 9.6 6.9 15.2 18.1 13.5 29.9l-9.4 66.2c-1.4 9.6 6 18.2 15.7 18.2H192v-56c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v56h64v-56c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v56h77.7c9.7 0 17.1-8.6 15.7-18.2l-9.4-66.2c-1.7-11.7 3.8-23 13.5-29.9C475.1 356.6 512 294.1 512 224 512 100.3 397.4 0 256 0zm-96 320c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm192 0c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"></path></svg>
                    HUNT-AND-KILL
                </span> 
            </div>

            <div className="HuntAndKill-grid">
            { grid.map(row => 
                <div className="HuntAndKill-grid-div">
                {
                    row.map(node => { return( <Node node = {node} />) })
                }
                </div>
            ) }
            </div>

            <div className="HuntAndKill-functions">
                <a href="#" className="HuntAndKill-generate-button" onClick={() => generateMaze()}>Generate Maze</a>
                <a href="#" className="HuntAndKill-reset-button" onClick={() => resetAll()}>Reset</a>
            </div>

        </main>
    );
}
 
 
export default HuntAndKill;