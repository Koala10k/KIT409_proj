var avoidDist1:float = 20f;
var avoidDist2:float = 8f;
var weight = 1f;
var leftHit:boolean;
var rightHit:boolean;


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
	
	var origL:Vector3 = transform.position - transform.forward * 2;
	var origLL:Vector3 = transform.position - transform.forward * 3;
	var dirLL:Vector3 = Vector3.Normalize(transform.forward * 1 - transform.right);
	var dirLS:Vector3 = Vector3.Normalize(transform.forward * 2 - transform.right);
	if(!Physics.Raycast(origLL, dirLL, hit, avoidDist1, layer)){
			lColor = Color.green;
			leftHit = false;
			lDist = -1;
			lLongHit = false;
	}else{
		lDist = hit.distance;
		lLongHit = true;
	}
	
	if(Physics.Raycast(origL, dirLS, hit, avoidDist2, layer)){
		if(hit.collider.gameObject.tag == "Obstacles"){
			lColor = Color.red;
			leftHit = true;
		}
		lShortHit = true;
	}else{
		lShortHit = false;
	}
	
	var origR:Vector3 = transform.position  - transform.forward * 2;
	var origRL:Vector3 = transform.position  - transform.forward * 3;
	var dirRL:Vector3 = Vector3.Normalize(transform.forward * 1 + transform.right);
	var dirRS:Vector3 = Vector3.Normalize(transform.forward * 2 + transform.right);
	if(!Physics.Raycast(origR, dirRL, hit, avoidDist1, layer)){
			rColor = Color.green;	
			rightHit =false;	
			rDist = -1;
			rLongHit = false;
	}else{
		rDist = hit.distance;
		rLongHit = true;
	}
	
	if(Physics.Raycast(origR, dirRS, hit, avoidDist2, layer)){
		if(hit.collider.gameObject.tag == "Obstacles"){
			rColor = Color.red;		
			rightHit = true;
		}
		rShortHit = true;
	}else{
		rShortHit = false;
	}

	var desiredVel;
	if(leftHit && rightHit){
		if(lDist > rDist){// turn left
			desiredVel = (-transform.right).normalized * steerController.maxSpeed;
			steerController.steerAccumulator += weight * (desiredVel);
		}else{//turn right
			desiredVel = (transform.right ).normalized * steerController.maxSpeed;
			steerController.steerAccumulator += weight * (desiredVel);
		}
	}else if(leftHit){
			desiredVel = (transform.right ).normalized * steerController.maxSpeed;
			steerController.steerAccumulator += weight * (desiredVel);
	}else if(rightHit){
			desiredVel = (-transform.right).normalized * steerController.maxSpeed;
			steerController.steerAccumulator += weight * (desiredVel);
	}
	
	Debug.DrawRay(origL, dirLL.normalized * avoidDist1, lColor);
	Debug.DrawRay(origLL, dirLS.normalized * avoidDist2, lColor);
	Debug.DrawRay(origR, dirRL.normalized * avoidDist1, rColor);
	Debug.DrawRay(origRL, dirRS.normalized * avoidDist2, rColor);
}