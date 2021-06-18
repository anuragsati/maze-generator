import './Node.css'

const Node = (props) => {
   const {row,col} = props.node;

	return ( 
		<div
			id={`node-${row}-${col}`}
         className={`node left-wall right-wall top-wall bottom-wall`}
		></div>
	);
}
 
export default Node;