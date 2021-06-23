import './RecursiveBacktrackerNode.css';

const Node = (props) => {
   const {row,col} = props.node;

	return ( 
		<div
			id={`RecursiveBacktracker-node-${row}-${col}`}
			className={`RecursiveBacktracker-node RecursiveBacktracker-left-wall RecursiveBacktracker-right-wall RecursiveBacktracker-top-wall RecursiveBacktracker-bottom-wall`}
		></div>
	);
}
 
export default Node;