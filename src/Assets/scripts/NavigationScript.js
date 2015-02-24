import System.Collections.Generic;

var index:int;
var edges:List.<int>;
var maxEdgeLength = 20;


function CalcEdges(graph) {
	edges = new List.<int>();
	
	var layerMask = ~((1<<8)|(1<<9)|(1<<10));
	for (node in graph.nodes){
		if (node.index!=index){
			var dist = (node.transform.position - transform.position).magnitude;
			if (dist<maxEdgeLength && !Physics.Linecast (transform.position, node.transform.position, layerMask)) {
				edges.Add(node.index);
			}
		}
	}
}

function OnTriggerStay(other : Collider) {
	if(other.tag == "LeaderSheep"){
		GameObject.Find("LeaderSheep").GetComponent(FindPath).setNextTarget(index);
	}
}