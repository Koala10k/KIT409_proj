var weight = 1.0;

var finalTarget:Transform;
var currTarTran:Transform; //for sheep
private var moving = false;
function refreshTarget(currTrans:Transform, index:int){
	moving = true;
	Debug.Log("1"+currTarTran);
	if(currTarTran == null){
		currTarTran = currTrans;
		transform.GetComponent(Seek).target = currTrans;
	}else{
		if(currTrans.Equals(currTarTran)){
			currTarTran = GameObject.Find("Graph").GetComponent(GraphScript).NextNavi(index, finalTarget);	
			transform.GetComponent(Seek).target = currTarTran;
			
		}
	}
	Debug.Log("2"+currTarTran);
}

function Update(){
	if(!moving){
	transform.GetComponent(Seek).target = finalTarget;
	}else{
		finalTarget = GameObject.Find("LeaderSheep").transform;
	}
}