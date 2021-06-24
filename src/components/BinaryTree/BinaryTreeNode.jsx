import './BinaryTreeNode.css';

const Node = (props) => {
   const {row,col} = props.node;

	return ( 
		<div
			id={`BinaryTree-node-${row}-${col}`}
			className={`BinaryTree-node BinaryTree-left-wall BinaryTree-right-wall BinaryTree-top-wall BinaryTree-bottom-wall`}
		></div>
	);
}
 
export default Node;