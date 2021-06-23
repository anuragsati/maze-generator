import { useState, useEffect} from 'react';
import Node from './RecursiveBacktrackerNode';
import './RecursiveBacktracker.css';

//constants
let stack = [];
const dRow = [-1, 0, 1, 0]; 
const dCol = [0, 1, 0, -1];
let directionArray = [0,1,2,3];

const windowWidth =  Math.floor((window.innerWidth-400)/24);
const windowHeight =  Math.floor((window.innerHeight-400)/24);

let speed=30;


const RecursiveBacktracker = () => {
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
			isVisited : 0,
		}
	}

    function disableEverything(enableOrDisable){
        const navbar = document.getElementsByClassName('navbar')[0];
        const generateButton = document.getElementsByClassName('RecursiveBacktracker-generate-button')[0];

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

        //initially push (0,0) to stack
        stack.push({row:0, col:0});

        let curr, prev;
        prev = document.getElementById(`RecursiveBacktracker-node-${0}-${0}`);
        prev.classList.add('consideration');

            
        let RecursiveBacktrackerInterval = setInterval(() => {
            //if there is somthing in stack
            if(stack.length > 0){

                //current node is under consideration
                let currentNode = stack[stack.length-1];
                grid[currentNode.row][currentNode.col].isVisited = 1;

                prev.classList.remove('consideration')
                prev.classList.add('fully-visited');
                curr = document.getElementById(`RecursiveBacktracker-node-${currentNode.row}-${currentNode.col}`);
                curr.classList.remove('fully-visited')
                curr.classList.add('consideration');


                //if there are no neighbor cells to visit from current cell then start popping
                if(!canVisitNeighbour(currentNode)){
                    let xx = stack.pop();
                    grid[xx.row][xx.col].isVisited = 2;

                    prev = document.getElementById(`RecursiveBacktracker-node-${xx.row}-${xx.col}`);
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
                            const currentNodeElement = document.getElementById(`RecursiveBacktracker-node-${currentNode.row}-${currentNode.col}`);
                            const nextNodeElement = document.getElementById(`RecursiveBacktracker-node-${adjX}-${adjY}`);
                            removeWalls(currentNodeElement, nextNodeElement, i);


                            prev = currentNodeElement;

                            stack.push({row:adjX, col:adjY});
                            break;
                        }
                    }
                }
            }

            else{
                disableEverything(false);
                clearInterval(RecursiveBacktrackerInterval);
            }


        }, speed);








        // let RecursiveBacktrackerInterval = setInterval(() => {
            
        //     if(stack.length > 0){
        //         //pop the top element and set it as current element
        //         let currentNode = stack.pop();
            
        //         //if node is not visited then visit it
        //         if(!grid[currentNode.row][currentNode.col].isVisited){
                    
        //             //process the node i.e remove walls
        //             const x = currentNode.row - currentNode.parent.row;
        //             const y = currentNode.col - currentNode.parent.col;
        //             const currentNodeElement = document.getElementById(`RecursiveBacktracker-node-${currentNode.row}-${currentNode.col}`);
        //             const previousNodeElement = document.getElementById(`RecursiveBacktracker-node-${currentNode.parent.row}-${currentNode.parent.col}`);
                
                
        //             if(x === -1 && y===0)
        //                 removeWalls(currentNodeElement, previousNodeElement, 0);
        //             else if(x === 0 && y===1)
        //                 removeWalls(currentNodeElement, previousNodeElement, 1);
        //             else if(x === 1 && y===0)
        //                 removeWalls(currentNodeElement, previousNodeElement, 2);
        //             else if(x === 0 && y===-1)
        //                 removeWalls(currentNodeElement, previousNodeElement, 3);
                
                
        //             //visite the node
        //             grid[currentNode.row][currentNode.col].isVisited = true;
        //             document.getElementById(`RecursiveBacktracker-node-${currentNode.row}-${currentNode.col}`).classList.add('RecursiveBacktracker-node-visited');
                    
                
        //             //add adjacent unvisited neighbors of current node randomly to stack
        //             shuffle(directionArray);
        //             for(let i of directionArray){
        //                 if(isValid(currentNode.row, currentNode.col, i)){
        //                     const adjX = currentNode.row + dRow[i];
        //                     const adjY = currentNode.col + dCol[i];
        //                     stack.push({row : adjX, col : adjY, parent : {row: currentNode.row, col:currentNode.col}});
        //                 }
        //             }
        //         }
        //     }

        //     else{
        //         disableEverything(false);
        //         clearInterval(RecursiveBacktrackerInterval);
        //     }

        // }, speed);

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
    
        if (grid[newRow][newCol].isVisited >= 1)
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
            currentNodeElement.classList.remove('RecursiveBacktracker-top-wall');
            nextNodeElement.classList.remove('RecursiveBacktracker-bottom-wall');
    
            currentNodeElement.classList.add('RecursiveBacktracker-fake-top-wall');
            nextNodeElement.classList.add('RecursiveBacktracker-fake-bottom-wall');
        }
        else if(direction === 1){ //right
            currentNodeElement.classList.remove('RecursiveBacktracker-right-wall');
            nextNodeElement.classList.remove('RecursiveBacktracker-left-wall');
    
            currentNodeElement.classList.add('RecursiveBacktracker-fake-right-wall');
            nextNodeElement.classList.add('RecursiveBacktracker-fake-left-wall');
        }
        else if(direction === 2){ //down
            currentNodeElement.classList.remove('RecursiveBacktracker-bottom-wall');
            nextNodeElement.classList.remove('RecursiveBacktracker-top-wall');
    
            currentNodeElement.classList.add('RecursiveBacktracker-fake-bottom-wall');
            nextNodeElement.classList.add('RecursiveBacktracker-fake-top-wall');
        }
        else if(direction === 3){ //left
            currentNodeElement.classList.remove('RecursiveBacktracker-left-wall');
            nextNodeElement.classList.remove('RecursiveBacktracker-right-wall');
    
            currentNodeElement.classList.add('RecursiveBacktracker-fake-left-wall');
            nextNodeElement.classList.add('RecursiveBacktracker-fake-right-wall');
        }
    }



	//resets everything
	const resetAll = () => {
        window.location.reload();

        // const freshClass = 'node left-wall right-wall top-wall bottom-wall';
        //     for (let row = 0; row < windowHeight; row++) {
        //         for (let col = 0; col < windowWidth; col++) {
        //             document.getElementById(`node-${row}-${col}`).className = freshClass;
        //         }
        //     }

        // grid = getInitialGrid();
        // setGrid(grid);
        
        // stack = [];
        // directionArray = [0,1,2,3];
	}

  
    return(
        <main className="RecursiveBacktracker-main">
            <div className="RecursiveBacktracker-topic"> 
                <span>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="layer-group" className="svg-inline--fa fa-layer-group fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z"></path></svg>
                    RANDOMIZED DFS
                </span> 
            </div>

            <div className="RecursiveBacktracker-grid">
            { grid.map(row => 
                <div className="RecursiveBacktracker-grid-div">
                {
                    row.map(node => { return( <Node node = {node} />) })
                }
                </div>
            ) }
            </div>

            <div className="RecursiveBacktracker-functions">
                <a href="#" className="RecursiveBacktracker-generate-button" onClick={() => generateMaze()}>Generate Maze</a>
                <a href="#" className="RecursiveBacktracker-reset-button" onClick={() => resetAll()}>Reset</a>
            </div>

        </main>
    );
}
 
export default RecursiveBacktracker;