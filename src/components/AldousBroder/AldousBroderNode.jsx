import './AldousBroderNode.css';

const Node = (props) => {
   const {row,col} = props.node;

	return ( 
		<div
			id={`AldousBroder-node-${row}-${col}`}
			className={`AldousBroder-node AldousBroder-left-wall AldousBroder-right-wall AldousBroder-top-wall AldousBroder-bottom-wall`}
		></div>
	);
}
 
export default Node;