import System.Collections.Generic;
private var behave:Task;
var tar:GameObject;
var weight:float = 1.0f;
var wanderTar:GameObject;
var sheep:GameObject;
var dist1:float = 30f;
var dist2:float = 100f;

function Start () {
	var closeCondition = new Leaf(CloseToTar,dist1);
	var farCondition = new Leaf(FarFromTar,dist2);
	var pursueAction = new Leaf(Pursue,null);
	var wanderAction:Task = new Leaf(Wander,null);
	var goBackAction = new Leaf(GoBack,null);
	
	var goHomeSeq = new Sequence(new List.<Task>([closeCondition,pursueAction]));
	var wanderSeq = new Sequence(new List.<Task>([farCondition,goBackAction]));
	
	behave = new Selector(new List.<Task>([goHomeSeq, wanderSeq, wanderAction]));
	StartCoroutine("Evaluate");
}

function Evaluate(){
	while (true){	
		behave.Run();
		yield WaitForSeconds(Random.Range(0.2, 0.5));
	}
}

function CloseToTar(dist):boolean{
	var isNear = GameObject.Find("Flock").GetComponent(Flock).getNearOne(transform, dist);
	if(isNear != null){
		sheep = isNear;
		return true;
	}
	return false;
}

function FarFromTar(dist):boolean{	
	var d:float = Vector3.Distance(transform.position,tar.transform.position);
	return d>dist;
}

function Pursue():boolean{
	GetComponent(Seek).target = (sheep == null? null: sheep.transform);
	return true;
}

function GoBack():boolean{
	GetComponent(Seek).target = tar.transform;
	return true;
}

function Wander():boolean{
	if(wanderTar == null) return false;
	var alpha:float = Random.Range(-Mathf.PI / 4, Mathf.PI / 4);
	var sc = GetComponent(SteeringController);
	var tarVec:Vector3 =Quaternion.Euler(0, alpha * Mathf.Rad2Deg, 0) * transform.forward * 10 + transform.position;
	wanderTar.transform.position = tarVec;
	GetComponent(Seek).target = wanderTar.transform;
	return true;
}


function OnTriggerEnter(other : Collider) {
	if(other.tag == "Sheep"){
		if(!other.gameObject.GetComponent(SheepVision).homed){
			other.gameObject.GetComponent(SheepVision).dead = true;
		}
	}
}
