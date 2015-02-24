var avoidDist1:float = 30f;
var avoidDist2:float = 10f;
var weight = 1f;
var leftHit:boolean;
var rightHit:boolean;

var approach:boolean;
var approachDist:float = 3f;


function Update () {
	var lColor = Color.green;
	var rColor = Color.green;
	var hit : RaycastHit;
	var steerController = GetComponent(SteeringController);
	var forward:Vector3 = transform.TransformDirection(Vector3.forward);

	var layer = ~((1<<8)|(1<<9)|(1<<10)|(1<<11));
	var lDist:float = avoidDist1+1;
	var rDist:float = avoidDist1+1;
	
	var lLongHit:boolean;
	var rLongHit:boolean;
	var lShortHit:boolean;
	var rShortHit:boolean;
	
	var orign = transform.position+transform.up;
	var distance = 1;
	var direction = transform.forward;
	var radius = avoidDist2;
	/*if(Physics.SphereCast(orign, distance, direction, hit, radius, layer)){
		Debug.DrawRay(orign, (hit.transform.position - orign), Color.red);
		var desiredVel1 = (transform.position - hit.transform.position).normalized * steerController.maxSpeed;
		steerController.steerAccumulator += weight * 100  * (desiredVel1);
	}else{
		Debug.DrawRay(orign+direction.normalized, direction * avoidDist2, Color.cyan);
	}*/
	
	var lOrig:Vector3 = transform.position - transform.right * 3 - transform.forward * 2;
	if(Physics.Raycast(lOrig, transform.forward, hit, avoidDist1, layer)){
		leftHit = true;
		lDist = hit.distance;
		Debug.DrawRay(lOrig,transform.forward * avoidDist1, Color.red);
		
	}else
		Debug.DrawRay(lOrig,transform.forward * avoidDist1, Color.green);
	if(!Physics.Raycast(lOrig, transform.forward * 2 - transform.right, hit, avoidDist1, layer)){
		Debug.DrawRay(lOrig,(transform.forward * 2 - transform.right).normalized * avoidDist1, Color.green);
		
		leftHit = false;
	}else
		Debug.DrawRay(lOrig,(transform.forward * 2- transform.right).normalized * avoidDist1, Color.red);
	
	var rOrig:Vector3 = transform.position + transform.right * 3 - transform.forward * 2;
	if(Physics.Raycast(rOrig, transform.forward, hit, avoidDist1, layer)){
		rightHit = true;
		rDist = hit.distance;
		Debug.DrawRay(rOrig,transform.forward * avoidDist1, Color.red);
		
	}else{
		Debug.DrawRay(rOrig,transform.forward * avoidDist1, Color.green);
	}
	
	if(!Physics.Raycast(rOrig, transform.forward * 2 + transform.right, hit, avoidDist1, layer)){
		Debug.DrawRay(rOrig,(transform.forward * 2 + transform.right).normalized * avoidDist1, Color.green);
		rightHit = false;
	}else{
		Debug.DrawRay(rOrig,(transform.forward * 2 + transform.right).normalized * avoidDist1, Color.red);
	}
	
	var desiredVel = transform.right.normalized * steerController.maxSpeed;
	steerController.steerAccumulator += weight * (rDist - lDist) * (desiredVel);
	
	if(Physics.Raycast(transform.position, transform.right, approachDist, layer) || Physics.Raycast(transform.position, -transform.right, approachDist, layer)){
		Debug.DrawRay(transform.position - transform.right * approachDist,2 * transform.right * approachDist, Color.blue);
		approach = true;
	}else{
		Debug.DrawRay(transform.position - transform.right * approachDist,2 * transform.right * approachDist, Color.yellow);
		approach = false;
	}
	
}