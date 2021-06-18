import React, { useState, useEffect} from 'react';
import './Maze.css';
import Node from './Node';
import logo from './logo.svg';
import caretDown from './caret-down.svg';



//constants
const windowWidth =  Math.floor(window.innerWidth/24);
const windowHeight =  Math.floor((window.innerHeight-200)/24);

let stack = [];
const dRow = [-1, 0, 1, 0]; 
const dCol = [0, 1, 0, -1];
const directionArray = [0,1,2,3];
let time=0, speed=10;

let isDroppedDown = false;



const App = () => {
	//Hooks
	let [grid, setGrid] = useState([]);

	//when our page first mounts
	useEffect(() => {
		let initialGrid = getInitialGrid();
		setGrid(initialGrid);
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
		const newNode = {
			row,
			col,
			isVisited : false,
		}

		return newNode;
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

  //remove walls between current and previous element
  //removes walls and and a fake wall in its place
  function removeWalls(currentNodeElement, previousNodeElement, direction){
      setTimeout(() => {
        
        if(direction == 0){ //up
          previousNodeElement.classList.remove('top-wall');
          currentNodeElement.classList.remove('bottom-wall');
  
          previousNodeElement.classList.add('fake-top-wall');
          currentNodeElement.classList.add('fake-bottom-wall');
        }
        else if(direction == 1){ //right
          previousNodeElement.classList.remove('right-wall');
          currentNodeElement.classList.remove('left-wall');
  
          previousNodeElement.classList.add('fake-right-wall');
          currentNodeElement.classList.add('fake-left-wall');
        }
        else if(direction == 2){ //down
          previousNodeElement.classList.remove('bottom-wall');
          currentNodeElement.classList.remove('top-wall');
  
          previousNodeElement.classList.add('fake-bottom-wall');
          currentNodeElement.classList.add('fake-top-wall');
        }
        else if(direction == 3){ //left
          previousNodeElement.classList.remove('left-wall');
          currentNodeElement.classList.remove('right-wall');
  
          previousNodeElement.classList.add('fake-left-wall');
          currentNodeElement.classList.add('fake-right-wall');
        }
      }, speed*time);

  }

  //randomly shuffles the direction array
  function shuffle(directionArray) {
    for (let i = directionArray.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [directionArray[i], directionArray[j]] = [directionArray[j], directionArray[i]];
    }
    return directionArray;
  }

  //generates the maze
  const generateMaze = (row, col, parent) => {
    stack.push({row, col, parent});

    while(stack.length > 0){
      //pop the top element and set it as current element
      let currentNode = stack.pop();

      //if node is visited do nothing
      if(grid[currentNode.row][currentNode.col].isVisited) 
        continue;
       
      
      //process the node i.e remove walls
      const x = currentNode.row - currentNode.parent.row;
      const y = currentNode.col - currentNode.parent.col;
      const currentNodeElement = document.getElementById(`node-${currentNode.row}-${currentNode.col}`);
      const previousNodeElement = document.getElementById(`node-${currentNode.parent.row}-${currentNode.parent.col}`);


      if(x === -1 && y===0)
        removeWalls(currentNodeElement, previousNodeElement, 0);
      else if(x === 0 && y===1)
        removeWalls(currentNodeElement, previousNodeElement, 1);
      else if(x === 1 && y===0)
        removeWalls(currentNodeElement, previousNodeElement, 2);
      else if(x === 0 && y===-1)
        removeWalls(currentNodeElement, previousNodeElement, 3);


      //visite the node
      grid[currentNode.row][currentNode.col].isVisited = true;
      setTimeout(() => {
        document.getElementById(`node-${currentNode.row}-${currentNode.col}`).classList.add('node-visited');
      }, speed * time++);
      setGrid(grid);
      

      //add adjacent unvisited neighbors of current node randomly to stack
      shuffle(directionArray);
      for(let i of directionArray){
        if(isValid(currentNode.row, currentNode.col, i)){
          const adjX = currentNode.row + dRow[i];
          const adjY = currentNode.col + dCol[i];
          stack.push({row : adjX, col : adjY, parent : {row: currentNode.row, col:currentNode.col}});
        }
      }
    }

  }


	//resets everything
	const resetAll = () => {
    //temporary solution : reload
    window.location.reload();

    // const freshClass = 'node left-wall right-wall top-wall bottom-wall';
		// for (let row = 0; row < windowHeight; row++) {
		// 	for (let col = 0; col < windowWidth; col++) {
    //     document.getElementById(`node-${row}-${col}`).className = freshClass;
		// 	}
		// }

    // time=0;
    // grid = getInitialGrid();
    // setGrid(grid);

    // stack = [];
	}


  //dropdown animations
  const dropdownAnimate = () =>{
    const dropdownList = document.getElementById("dropdown-list"); 

    if(isDroppedDown){
      dropdownList.style.display = "none";
    }
    else{
      dropdownList.style.display = "block";
    }

    isDroppedDown = !isDroppedDown;
  }

  const handleDropdownClick = (clickedElement) => {
    const dropdownButton= document.getElementById("dropdown-button"); 
    const downCaret = document.createElement('img');
    downCaret.className = 'dropdown-caret';
    downCaret.src = `${caretDown}`;

    if(clickedElement===0){
      dropdownButton.innerText= "INSTANT";
      speed = 0;
    }
    else if(clickedElement===1){
      dropdownButton.innerText = "FAST";
      speed = 10;
    }
    else if(clickedElement===2){
      dropdownButton.innerText = "MEDIUM";
      speed = 30;
    }
    else if(clickedElement===3){
      dropdownButton.innerText = "SLOW";
      speed = 80;
    }

    dropdownButton.appendChild(downCaret);
     
    dropdownAnimate();
  }



	//==================Finally return ===============

	return (
		<React.Fragment>

		{/* =====Header====== */}
		<nav className="navbar">
			<ul className="navbar-nav">
				<li className=""> <img className="logo" src={logo} /></li>
				<li className="nav-item"> <a href="#" className="nav-link generate-button" onClick={() => generateMaze(0,0, {row: 0, col:0})}> generate Maze</a> </li>
				<li className="nav-item"> <a href="#" className="nav-link" onClick={() => resetAll()}> Reset </a> </li>

				<li className="dropdown">
          <a id="dropdown-button" className="nav-link" onClick={() => dropdownAnimate()}> SPEED <img className="dropdown-caret" src={caretDown} /></a>
          <ul id="dropdown-list">
            <li onClick={() => handleDropdownClick(0)}><a href="#">INSTANT</a></li>
            <li onClick={() => handleDropdownClick(1)}><a href="#">fast</a></li>
            <li onClick={() => handleDropdownClick(2)}><a href="#">medium</a></li>
            <li onClick={() => handleDropdownClick(3)}><a href="#">slow</a></li>
          </ul>
        </li>
			</ul>
		</nav>

		{/* =====Grid====== */}
		<div className="grid">
			{
				grid.map(row => 
					<div className="grid-div">
							{
								row.map(node => 
									{
										return(
											<Node node = {node} />
										)
									}
								)
							}
					</div>
				)
			}
		</div>
		</React.Fragment>
	);
}


export default App;
