var weight = 1.0f;
var target:Transform;

function Update () {
	if(target == null) return;
	var steerController = GetComponent(SteeringController);
	var desiredVel = 
		(target.position - transform.position).normalized * 
		steerController.maxSpeed;
	steerController.steerAccumulator += steerController.maxSpeed/rigidbody.velocity.magnitude * (desiredVel-rigidbody.velocity); 
}

