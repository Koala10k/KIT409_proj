var visionDist:float = 100f;
var dist:float;
var weight:float = 1f;
var keepDist:float = 10f;
var obstacled:boolean;
var homed:boolean;
var dead:boolean;

function Update () {
	if(homed) return;
	//Debug.DrawRay(transform.position, transform.forward * visionDist,  Color.cyan);
	var target = GameObject.Find("LeaderSheep");
	if(target == null) return;
	var layerMask = ~((1<<8)|(1<<9)|(1<<10)|(1<<11));
	var hitInfo:RaycastHit;
	
	dist = Vector3.Distance(target.transform.position, transform.position);
	obstacled = Physics.Raycast(transform.position,target.transform.position, dist, layerMask);
	var ca = GetComponent(CollisionAvoid);	
	if(dist > keepDist && dist < visionDist){
		if(obstacled && ca.approach){
			GetComponent(Seek).target = null;
			var steerController = GetComponent(SteeringController);
			steerController.steerAccumulator += weight * transform.forward.normalized * steerController.maxSpeed;
		}else
			GetComponent(Seek).target = target.transform;
	}else{
		GetComponent(Seek).target = null;
	}
	
}