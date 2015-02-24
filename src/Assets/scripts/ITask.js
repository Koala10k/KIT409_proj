import System.Collections.Generic;
private var behave:Task;
var home:GameObject;
var weight:float = 1.0f;
var wanderTar:GameObject;
var dist1:float = 30f;
var dist2:float = 80f;

function Start () {
	var closeCondition = new Leaf(CloseToHome,dist1);
	var farCondition = new Leaf(FarFromHome,dist2);
	var middleCondition = new Leaf(MiddleToHome, null);
	var goHomeAction = new Leaf(GoHome,null);
	var wanderAction = new Leaf(WanderAway,null);
	var fleeAction = new Leaf(Flee, null);
	
	var goHomeSeq = new Sequence(new List.<Task>([farCondition,goHomeAction]));
	var wanderSeq = new Sequence(new List.<Task>([middleCondition,wanderAction]));
	var fleeSeq = new Sequence(new List.<Task>([closeCondition,fleeAction]));
	
	behave = new Selector(new List.<Task>([goHomeSeq, wanderSeq, fleeSeq]));
	StartCoroutine("Evaluate");
}

function Update () {

}

function Evaluate(){
	while (true){	
		behave.Run();
		yield WaitForSeconds(Random.Range(0.2, 0.5));
	}
}

interface Task{
	function Run():boolean;
}

class Leaf implements Task{
	var taskFunction;
	var parameter;
	
	function Leaf(t,p){
		taskFunction = t;
		parameter = p;
	}
	
	function Run():boolean{
		if (parameter==null)
			return taskFunction();
		else
			return taskFunction(parameter);
	}
}

class Sequence implements Task{
	var tasks:List.<Task>;
	
	function Sequence(taskList){
		tasks = taskList;
	}

	function Run():boolean{
		for (t in tasks){
			if (!t.Run()) return false;
		}
		return true;
	}
}

class Selector implements Task{
	var tasks:List.<Task>;
	
	function Selector(taskList){
		tasks = taskList;
	}

	function Run():boolean{
		for (t in tasks){
			if (t.Run()) return true;
		}
		return false;
	}
}

function CloseToHome(dist):boolean{	
	var d:float = Vector3.Distance(transform.position,home.transform.position);
	return d<dist;
}

function FarFromHome(dist):boolean{	
	var d:float = Vector3.Distance(transform.position,home.transform.position);
	return d>dist;
}

function MiddleToHome():boolean{	
	var d:float = Vector3.Distance(transform.position,home.transform.position);
	return (d > dist1 && d < dist2);
}

function GoHome():boolean{
Debug.Log("GoHome");
	GetComponent(Seek).target = home.transform;
	GetComponent(Flee2).target = null;
	return true;
}


function WanderAway():boolean{
Debug.Log("WanderAway");
	if(wanderTar == null) return false;
	//if(Vector3.Distance(transform.position, wanderTar.transform.position) > 5 && GetComponent(Seek).target == wanderTar.transform) return false;
	GetComponent(Flee2).target = null;
	var alpha:float = Random.Range(-Mathf.PI / 4, Mathf.PI / 4);
	Debug.Log("alpha:" + alpha);
	var sc = GetComponent(SteeringController);
	var tarVec:Vector3 =Quaternion.Euler(0, alpha * Mathf.Rad2Deg, 0) * transform.forward * 10 + transform.position;
	wanderTar.transform.position = tarVec;
	GetComponent(Seek).target = wanderTar.transform;
	return true;
}

function Flee():boolean{
Debug.Log("Flee");
	GetComponent(Seek).target = null;
	GetComponent(Flee2).target = home.transform;
	return true;
}