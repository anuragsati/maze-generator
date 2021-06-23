import './MainPage.css'

const MainPage = () => {
    return (
        <main className="mainPage-main">
            <div className="mainPage-topic"> 
                <span>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="puzzle-piece" className="svg-inline--fa fa-puzzle-piece fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"></path></svg>
                    MAZES
                </span> 
            </div>
            <p>A maze is a complex structure of interconnected passageways. There should be (at least) one way to get from a designated start location to a designated end. Typically the path is convoluted and branched (these branches can also be branched, and often leading to dead-ends) making it not obvious to the naked eye the correct path to take (even when exposed to a God’s eye view from above with all information exposed).
                Mazes are even more challenging to solve when you are inside one and are only exposed to the information you can immediately see!</p>

            <h2>Generating mazes</h2>
            <hr />
            <p>Different algorithms for generating mazes work in different ways. Some start with a ‘solid’ block and ‘carve’ out passages as they progress. Others start with an ‘empty’ space and ‘build’ walls. The back track recursive algorithm is a carving algorithm: It starts out as a complete grid with all boundaries and walls set and removes walls to generate the labyrinth.
                In this article I’m using a 2D rectangular grid but the technique can be generalized to any tessellating shapes in any number of dimensions.</p>

            <h2>Properties of mazes</h2>
            <hr />
            <p>Mazes have characteristics that describe them. A maze is classified as ‘perfect’ if it does not contain loops (as we will see later, the dual of a maze is a graph, and if this graph is a single tree with no cycles then it is a perfect maze. A perfect maze can also be described as a ‘simply connected’ maze.
                If a maze is simply connected it is possible to solve it using a wall following algorithm. By always keeping you right hand (or left if you prefer!), against the maze wall and walking around you will walk a path that will eventually visit every location in the maze and return to the same location.</p>
            
            <p>Mazes are usually generated using random number generators and even running the same algorithm twice in a row (with different seeds for the random number generator) will produce different results. However, on average, different algorithms have different characteristics and properties. Here are some of these characteristics:</p>

            <ul>
                <li><span><b>Connected/Complex</b> - We’ve mentioned this already. Is it possible to visit every location by simply following one wall? If so, the maze is simply connected. A simply connected maze does not have any loops.</span></li>
                <li><span><b>Number of dead-ends</b> - It’s possible to make maze that has no wrong turns at all, it’s just a convoluted loop! This would not be a very challenging maze! The number of dead ends in a maze is the measure of the number of locations in the maze that have only one way in. A maze that has only a few dead-ends, and long pathways in-between, might be quite frustrating as you’d have to go a long distance before finding out you’d gone the wrong way!</span></li>
                <li><span><b>Length of longest path</b> - This is often measured as percentage. First you find the shortest (optimal) path through the maze, then measure the ratio of the number of cells on this path to all the cells in the maze. A high percentage indicates a fair amount of convolution and twisting of the solution (taking lots of turns in order to get to the destination, and visiting a good measure of the maze before exiting).</span></li>
                <li><span><b>Convolution</b> - Either measured as twistiness, or its inverse straightness, and is some metric to measure how often in the maze that the path exits a cell on the opposite side of the way it came in, and how often it turns a corner in a cell. The human brain has an easier job following paths that are straight (if you see a long line a cells in a straight line you instantly know that there is a clear path to the end of this section. However, if the path is twisted, you can’t immediately see to the end and have to trace it to find out).</span></li>
                <li><span><b>Distribution of Valency</b> - Dead ends cells have a valency of one (There is only one way in and out of that cell). Crossroads have a valency of four (in a rectangular grid maze); there are four possible directions to go from this cell. Unbranched corridors have a valency of two, and T-junctions have a valency of three. Different maze algorithms generate different distributions of valencies. An algorithm with a high percentage of T-junctions and crossroads exposes the solver to lots of options. One with a high percentage of corridors (valence two cells), takes the user on long ‘rides’.</span></li>
                <li><span><b>Complexity</b> - Related to all the above, this is a measure of the average number of ‘decisions’ a solver will have make to get from the start to the end. What is the average number of junctions you’ll encounter when solving a maze? </span></li>
            </ul>
        </main>
    );
}
export default MainPage;