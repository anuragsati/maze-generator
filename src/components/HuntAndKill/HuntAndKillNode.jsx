import './HuntAndKillNode.css';

const Node = (props) => {
   const {row,col} = props.node;

	return ( 
		<div
			id={`HuntAndKill-node-${row}-${col}`}
			className={`HuntAndKill-node HuntAndKill-left-wall HuntAndKill-right-wall HuntAndKill-top-wall HuntAndKill-bottom-wall`}
		></div>
	);
}
 
export default Node;