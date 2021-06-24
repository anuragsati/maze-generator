import { useState, useEffect} from 'react';
import Node from './BinaryTreeNode';
import './BinaryTree.css';

//constants
const dRow = [-1, 0, 1, 0]; 
const dCol = [0, 1, 0, -1];
let directionArray = [1,2];

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

//other
let speed=10;
let BinaryTreeInterval;

const BinaryTree = () => {
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
        const generateButton = document.getElementsByClassName('BinaryTree-generate-button')[0];

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

        let remaining = windowHeight * windowWidth;
        let currentNode, cell=0;

        let curr, prev;
        prev = document.getElementById(`BinaryTree-node-${0}-${0}`);
        prev.classList.add('BinaryTree-consideration');


        BinaryTreeInterval = setInterval(() => {

            //if there are notes that needs to be visited
            if(remaining > 0){
                //visit current node
                currentNode = getCurrentNode(cell++);
                remaining--;
                grid[currentNode.row][currentNode.col].isVisited = true;

                prev.classList.remove('BinaryTree-consideration');
                prev.classList.add('BinaryTree-fully-visited');
                curr = document.getElementById(`BinaryTree-node-${currentNode.row}-${currentNode.col}`);
                curr.classList.remove('BinaryTree-fully-visited');
                curr.classList.add('BinaryTree-consideration');


                //if can't visit anything mark it as visited
                if(!canVisitNeighbour(currentNode)){
                    prev = curr;
                }
                //if can visit anyone of neighbour
                else{
                    //find what directions you can visit and randomly visit one of them
                    shuffle(directionArray);
                    for(let i of directionArray){
                        if(isValid(currentNode.row, currentNode.col, i)){
                            const adjX = currentNode.row + dRow[i];
                            const adjY = currentNode.col + dCol[i];

                            //remove walls b/w current and next element
                            const currentNodeElement = document.getElementById(`BinaryTree-node-${currentNode.row}-${currentNode.col}`);
                            const nextNodeElement = document.getElementById(`BinaryTree-node-${adjX}-${adjY}`);
                            removeWalls(currentNodeElement, nextNodeElement, i);


                            prev = currentNodeElement;
                            break;
                        }
                    }
                }
            }

            //all nodes have been visited
            else{
                disableEverything(false);
                clearInterval(BinaryTreeInterval); 
            }
        }, speed);
    }

    function getCurrentNode(cell){
        let row = Math.floor(cell / windowWidth);
        let col = cell % windowWidth;

        return {row, col};
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
            currentNodeElement.classList.remove('BinaryTree-top-wall');
            nextNodeElement.classList.remove('BinaryTree-bottom-wall');
    
            currentNodeElement.classList.add('BinaryTree-fake-top-wall');
            nextNodeElement.classList.add('BinaryTree-fake-bottom-wall');
        }
        else if(direction === 1){ //right
            currentNodeElement.classList.remove('BinaryTree-right-wall');
            nextNodeElement.classList.remove('BinaryTree-left-wall');
    
            currentNodeElement.classList.add('BinaryTree-fake-right-wall');
            nextNodeElement.classList.add('BinaryTree-fake-left-wall');
        }
        else if(direction === 2){ //down
            currentNodeElement.classList.remove('BinaryTree-bottom-wall');
            nextNodeElement.classList.remove('BinaryTree-top-wall');
    
            currentNodeElement.classList.add('BinaryTree-fake-bottom-wall');
            nextNodeElement.classList.add('BinaryTree-fake-top-wall');
        }
        else if(direction === 3){ //left
            currentNodeElement.classList.remove('BinaryTree-left-wall');
            nextNodeElement.classList.remove('BinaryTree-right-wall');
    
            currentNodeElement.classList.add('BinaryTree-fake-left-wall');
            nextNodeElement.classList.add('BinaryTree-fake-right-wall');
        }
    }



	//resets everything
	const resetAll = () => {
        disableEverything(false);
        clearInterval(BinaryTreeInterval);

        const freshClass = 'BinaryTree-node BinaryTree-left-wall BinaryTree-right-wall BinaryTree-top-wall BinaryTree-bottom-wall';
            for (let row = 0; row < windowHeight; row++) {
                for (let col = 0; col < windowWidth; col++) {
                    document.getElementById(`BinaryTree-node-${row}-${col}`).className = freshClass;
                }
            }

        grid = getInitialGrid();
        setGrid(grid);
        
        directionArray = [1,2];
	}

  
    return(
        <main className="BinaryTree-main">
            <div className="BinaryTree-topic"> 
                <span>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tree" className="svg-inline--fa fa-tree fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M378.31 378.49L298.42 288h30.63c9.01 0 16.98-5 20.78-13.06 3.8-8.04 2.55-17.26-3.28-24.05L268.42 160h28.89c9.1 0 17.3-5.35 20.86-13.61 3.52-8.13 1.86-17.59-4.24-24.08L203.66 4.83c-6.03-6.45-17.28-6.45-23.32 0L70.06 122.31c-6.1 6.49-7.75 15.95-4.24 24.08C69.38 154.65 77.59 160 86.69 160h28.89l-78.14 90.91c-5.81 6.78-7.06 15.99-3.27 24.04C37.97 283 45.93 288 54.95 288h30.63L5.69 378.49c-6 6.79-7.36 16.09-3.56 24.26 3.75 8.05 12 13.25 21.01 13.25H160v24.45l-30.29 48.4c-5.32 10.64 2.42 23.16 14.31 23.16h95.96c11.89 0 19.63-12.52 14.31-23.16L224 440.45V416h136.86c9.01 0 17.26-5.2 21.01-13.25 3.8-8.17 2.44-17.47-3.56-24.26z"></path></svg>
                    BINARY-TREE
                </span> 
            </div>

            <div className="BinaryTree-grid">
            { grid.map(row => 
                <div className="BinaryTree-grid-div">
                {
                    row.map(node => { return( <Node node = {node} />) })
                }
                </div>
            ) }
            </div>

            <div className="BinaryTree-functions">
                <a href="#" className="BinaryTree-generate-button" onClick={() => generateMaze()}>Generate Maze</a>
                <a href="#" className="BinaryTree-reset-button" onClick={() => resetAll()}>Reset</a>
            </div>

        </main>
    );
}
 
 
export default BinaryTree;