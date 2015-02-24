var targetIdxList:List.<int>;
var currTar:int = 0;
var finalTarget:Transform;
var currTarTran:Transform; //for sheep

function setNextTarget(currentIdx:int){
	if(targetIdxList == null || targetIdxList.Count == 0) return;
	if(currTar < targetIdxList.Count - 1){
	if(targetIdxList[currTar] == currentIdx) {
		currTar++;
		transform.GetComponent(Seek).target = GameObject.Find("Graph").GetComponent(GraphScript).getTargetTransform(targetIdxList[currTar]);
	}
	}else if(currTar == targetIdxList.Count - 1 && finalTarget != null){
		transform.GetComponent(Seek).target = finalTarget; //set the final target
	}
}

function setFirstTarget(){
	if(targetIdxList == null || targetIdxList.Count == 0) return;
	currTarTran= GameObject.Find("Graph").GetComponent(GraphScript).getTargetTransform(targetIdxList[currTar]);
	transform.GetComponent(Seek).target = currTarTran;
	prevIdx = targetIdxList[currTar];
}

function setPath(pathIdx){
	targetIdxList = pathIdx;
	setFirstTarget();
}

function setFinalTarget(tar:Transform){
	currTar = 0;
	finalTarget = tar;
	GameObject.Find("Graph").GetComponent("GraphScript").FindPath1(transform, finalTarget, this);
}