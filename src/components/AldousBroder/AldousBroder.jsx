import { useState, useEffect} from 'react';
import Node from './AldousBroderNode';
import './AldousBroder.css';

//constants
const dRow = [-1, 0, 1, 0]; 
const dCol = [0, 1, 0, -1];
let directionArray = [0,1,2,3];

const windowWidth =  Math.floor((window.innerWidth-400)/24);
const windowHeight =  Math.floor((window.innerHeight-400)/24);


let speed=1;


const AldousBroder = () => {
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

    function disableEverything(action){
        const navbar = document.getElementsByClassName('navbar')[0];
        const generateButton = document.getElementsByClassName('AldousBroder-generate-button')[0];

        if(action){
            navbar.style.pointerEvents = "none";
            generateButton.style.pointerEvents = "none";
        }
        else{
            navbar.style.pointerEvents = "auto";
            generateButton.style.pointerEvents = "auto";
        }
    }

    
    const generateMaze = () => {
        //Disable everything
        disableEverything(true);

        //start at (0,0)
        let currentNode = {row:0, col:1};
        let remaining = windowHeight * windowWidth-2;

        let curr, prev;

        //initially (0,0) is visited and under processing
        grid[0][0].isVisited = true;
        prev = document.getElementById(`AldousBroder-node-${0}-${0}`);
        prev.classList.add('AldousBroder-node-under-processing');
        removeWalls(document.getElementById(`AldousBroder-node-${0}-${0}`),document.getElementById(`AldousBroder-node-${0}-${1}`),1)

        let AldousBroderInterval = setInterval(() => {
            if(remaining > 0){
                //visit current node
                grid[currentNode.row][currentNode.col].isVisited = true;

                curr = document.getElementById(`AldousBroder-node-${currentNode.row}-${currentNode.col}`);
                curr.classList.add('AldousBroder-node-under-processing');
                prev.classList.remove('AldousBroder-node-under-processing');
                prev.classList.add('AldousBroder-node-visited');

                // document.getElementById(`AldousBroder-node-${currentNode.row}-${currentNode.col}`).classList.add('AldousBroder-node-visited');

                //choose a valid neighbour
                shuffle(directionArray);
                for(let i of directionArray){
                    if(isValid(currentNode.row, currentNode.col, i)){
                        const adjX = currentNode.row + dRow[i];
                        const adjY = currentNode.col + dCol[i];

                        const currentNodeElement = document.getElementById(`AldousBroder-node-${currentNode.row}-${currentNode.col}`);
                        const nextNodeElement = document.getElementById(`AldousBroder-node-${adjX}-${adjY}`);

                        //check if that neighbor is visited or not
                        //if it is not visited then carve a path and decrease remaining
                        if(!grid[adjX][adjY].isVisited){
                            removeWalls(currentNodeElement, nextNodeElement, i);
                            remaining--;
                        }

                        //no matter what next node will be this
                        prev = currentNodeElement;
                        curr = nextNodeElement;
                        currentNode = {row: adjX, col: adjY};
                        break;
                    }
                }

            }

            else{
                //run loop one last time to complete maze
                curr.classList.add('AldousBroder-node-visited');
                prev.classList.remove('AldousBroder-node-under-processing');
                prev.classList.add('AldousBroder-node-visited');

                disableEverything(false);
                clearInterval(AldousBroderInterval);
            }

        }, speed);

    }
  
 
    //checks if next node is valid
    function isValid(row, col, nextNodeDirection){
        const newRow = row + dRow[nextNodeDirection];
        const newCol = col + dCol[nextNodeDirection];
    
        if (newRow < 0 || newCol < 0 || newRow >= windowHeight || newCol >= windowWidth)
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
            currentNodeElement.classList.remove('AldousBroder-top-wall');
            nextNodeElement.classList.remove('AldousBroder-bottom-wall');
    
            currentNodeElement.classList.add('AldousBroder-fake-top-wall');
            nextNodeElement.classList.add('AldousBroder-fake-bottom-wall');
        }
        else if(direction === 1){ //right
            currentNodeElement.classList.remove('AldousBroder-right-wall');
            nextNodeElement.classList.remove('AldousBroder-left-wall');
    
            currentNodeElement.classList.add('AldousBroder-fake-right-wall');
            nextNodeElement.classList.add('AldousBroder-fake-left-wall');
        }
        else if(direction === 2){ //down
            currentNodeElement.classList.remove('AldousBroder-bottom-wall');
            nextNodeElement.classList.remove('AldousBroder-top-wall');
    
            currentNodeElement.classList.add('AldousBroder-fake-bottom-wall');
            nextNodeElement.classList.add('AldousBroder-fake-top-wall');
        }
        else if(direction === 3){ //left
            currentNodeElement.classList.remove('AldousBroder-left-wall');
            nextNodeElement.classList.remove('AldousBroder-right-wall');
    
            currentNodeElement.classList.add('AldousBroder-fake-left-wall');
            nextNodeElement.classList.add('AldousBroder-fake-right-wall');
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
        <main className="AldousBroder-main">
            <div className="AldousBroder-topic"> 
                <span>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="road" className="svg-inline--fa fa-road fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M573.19 402.67l-139.79-320C428.43 71.29 417.6 64 405.68 64h-97.59l2.45 23.16c.5 4.72-3.21 8.84-7.96 8.84h-29.16c-4.75 0-8.46-4.12-7.96-8.84L267.91 64h-97.59c-11.93 0-22.76 7.29-27.73 18.67L2.8 402.67C-6.45 423.86 8.31 448 30.54 448h196.84l10.31-97.68c.86-8.14 7.72-14.32 15.91-14.32h68.8c8.19 0 15.05 6.18 15.91 14.32L348.62 448h196.84c22.23 0 36.99-24.14 27.73-45.33zM260.4 135.16a8 8 0 0 1 7.96-7.16h39.29c4.09 0 7.53 3.09 7.96 7.16l4.6 43.58c.75 7.09-4.81 13.26-11.93 13.26h-40.54c-7.13 0-12.68-6.17-11.93-13.26l4.59-43.58zM315.64 304h-55.29c-9.5 0-16.91-8.23-15.91-17.68l5.07-48c.86-8.14 7.72-14.32 15.91-14.32h45.15c8.19 0 15.05 6.18 15.91 14.32l5.07 48c1 9.45-6.41 17.68-15.91 17.68z"></path></svg>
                    ALDOUS-BRODER
                </span> 
            </div>

            <div className="AldousBroder-grid">
            { grid.map(row => 
                <div className="AldousBroder-grid-div">
                {
                    row.map(node => { return( <Node node = {node} />) })
                }
                </div>
            ) }
            </div>

            <div className="AldousBroder-functions">
                <a href="#" className="AldousBroder-generate-button" onClick={() => generateMaze()}>Generate Maze</a>
                <a href="#" className="AldousBroder-reset-button" onClick={() => resetAll()}>Reset</a>
            </div>

        </main>
    );
}
 
export default AldousBroder;