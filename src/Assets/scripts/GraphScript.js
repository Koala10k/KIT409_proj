import System.Collections.Generic;

var nodes:List.<NavigationScript> = new List.<NavigationScript>();

var currNodeIdx:int = -1;
var naviNodePrefab:GameObject;

function Start(){
	var i=0;
	for (n in transform){
		var navnode:NavigationScript = n.GetComponent(NavigationScript);
		nodes.Add(navnode);
		navnode.index = i;
		i++;
	}
	
	for (n in nodes){
		n.CalcEdges(this);
	}
}

function NextNavi(src:int, tar:Transform):Transform{
	var nearNaviTar = 1000f;
	var layerMask = ~(1<<8);
	var nearTarIdx = -1;
	for(node in nodes){
		var dist = Vector3.Distance(tar.position, node.transform.position);
		if( dist  < nearNaviTar && !Physics.Linecast(tar.position, node.transform.position, layerMask)){
			nearNaviTar = dist;
			nearTarIdx = node.index;
		}
	}
	
	var pathNodes:List.<int>;
		if(nearTarIdx != -1)
			pathNodes = FindPath(src, nearTarIdx);
			
	if(pathNodes!=null && pathNodes.Count > 1){
		return nodes[pathNodes[1]].transform;
	}
	return null;
}

function FindPath1(src:Transform, tar:Transform, me:FindPath){
	var nearNaviSrc = 1000f;
	var nearNaviTar = 1000f;
	var layerMask = ~(1<<8);
	var nearSrcIdx = -1;
	var nearTarIdx = -1;
	for(node in nodes){
		var dist = Vector3.Distance(src.position, node.transform.position);
		if( dist  < nearNaviSrc && !Physics.Linecast(src.position, node.transform.position, layerMask)){
			nearNaviSrc = dist;
			nearSrcIdx = node.index;
		}
		dist = Vector3.Distance(tar.position, node.transform.position);
		if( dist  < nearNaviTar && !Physics.Linecast(tar.position, node.transform.position, layerMask)){
			nearNaviTar = dist;
			nearTarIdx = node.index;
		}
	}
//	Debug.Log(nearSrcIdx+","+nearTarIdx);
	var pathNodes:List.<int>;
	if(nearSrcIdx != -1 && nearTarIdx != -1)
		pathNodes = FindPath(nearSrcIdx, nearTarIdx);
	
	
	if(pathNodes!= null && pathNodes.Count > 0){
		me.setPath(pathNodes);
	}
}


function getTargetTransform(idx):Transform{
	if(idx >= 0 && idx < nodes.Count){
		return nodes[idx].transform;
	}
	return null;
}

function FindPath(start, goal):List.<int> {	
	var from = new int[nodes.Count]; // stores the previous node
	
	var status = new int[nodes.Count]; // 1 open, 2 closed
	var open:List.<int> = new List.<int>();
	
	var g = new float[nodes.Count];
	var h = new float[nodes.Count];
	var f = new float[nodes.Count];
		
	for (i=0; i<nodes.Count; i++){
		status[i] = 0; // not open or closed
		from[i] = -1; // flag for unknown
		g[i] = -1; // flag for infinity
		f[i] = -1; // flag for infinity
		h[i] = Heuristic(i,goal);
	}
	
	// initialise open list
	open.Add(start);
	status[start] = 1;
	from[start]  = -1;
	g[start] = 0;	
	f[start] = h[start];
	
	while (open.Count>0){
		// find nearest in open list
		var openIndex = 0;
		var minValue = f[open[0]];
		for (i=1; i<open.Count; i++){
			if  (f[open[i]]<minValue){
				minValue = f[open[i]];
				openIndex = i;
			}
		}
		
		var x = open[openIndex];		
		if (x==goal)
			return ConstructPath(from,goal);
		
		// add to closed, remove from open
		status[x] = 2;
		open.RemoveAt(openIndex);
		
		for (y in nodes[x].edges){
			if (status[y]!=2){ // not closed
				// normally we would use edge weight here
				// but our edge weight is the same as the heuristic
				var newEst = g[x]+Heuristic(x,y);				

				if (status[y]!=1){ // not visited
					// add to open, update costs and from
					status[y] = 1;
					open.Add(y);
					from[y] = x;
					g[y] = newEst;
					f[y] = g[y] + h[y];
				} else if (newEst<g[y]) { // new best
					// update cost and from
					from[y] = x;
					g[y] = newEst;
					f[y] = g[y] + h[y];
				}
			}
		}
	}
	return new List.<int>(); // no path found
}
function Heuristic(a,b):float{
	return (nodes[a].transform.position-nodes[b].transform.position).magnitude;
}

function ConstructPath(from,goal):List.<int>{
	var path = new List.<int>();
	var p = goal;
	
	while (p!= -1){
		path.Add(p);
		p = from[p];
	}
	path.Reverse();
	return path;
}

