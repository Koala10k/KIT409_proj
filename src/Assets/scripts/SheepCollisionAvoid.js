var avoidDist:float = 5f;
var weight = 100f;
private var bothSizeHit;
private var side;

function Update () {
	var color = Color.green;
	var lColor = Color.green;
	var rColor = Color.green;
	var hit : RaycastHit;
	var steerController = GetComponent(FlockingBehaviour);
	var forward:Vector3 = transform.TransformDirection(Vector3.forward);
	var leftHit = false;
	var rightHit = false;
	if(Physics.Raycast(transform.position, transform.forward, hit, avoidDist)){
		if(hit.collider.gameObject.tag == "Obstacles"){
		color = Color.red;
		steerController.steerAccumulator += -transform.forward * weight;
		}
	}
	
	if(Physics.Raycast(transform.position, (transform.forward - transform.right), hit, avoidDist)){
		if(hit.collider.gameObject.tag == "Obstacles"){			
			lColor = Color.red;
			leftHit = true;
		}else			
			leftHit = false;
	}
	if(Physics.Raycast(transform.position, (transform.forward + transform.right), hit, avoidDist)){
		if(hit.collider.gameObject.tag == "Obstacles"){
			rColor = Color.red;		
			rightHit = true;
		}
		else
			rightHit = false;
	}
	
	if(leftHit && rightHit && !bothSizeHit){
		bothSizeHit = true;
		side = Random.Range(-1, 1);
		side = side >= 0? 1:-1;
		steerController.steerAccumulator += weight * (side*transform.right + transform.forward);
	}else if(leftHit && rightHit && bothSizeHit){
		steerController.steerAccumulator += weight * (side*transform.right + transform.forward);
	}else if(leftHit){
		bothSizeHit = false;
		steerController.steerAccumulator += weight * (transform.right + transform.forward);
	}else if(rightHit){
		bothSizeHit = false;
		steerController.steerAccumulator += weight * (-transform.right + transform.forward);
	}else{
		bothSizeHit = false;
	}

		Debug.DrawRay(transform.position, transform.forward * avoidDist, color);
		Debug.DrawRay(transform.position, (transform.forward - transform.right) * avoidDist / 2, lColor);
		Debug.DrawRay(transform.position, (transform.forward + transform.right) * avoidDist / 2, rColor);
}