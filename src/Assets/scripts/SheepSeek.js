var weight = 1.0f;
var target:Transform;

function Update () {
	if(target == null) return;
	var steerController = GetComponent(SteeringController);
	var desiredVel = 
		(target.position - transform.position).normalized * 
		steerController.maxSpeed;
	steerController.steerAccumulator += weight * (desiredVel-rigidbody.velocity); 
}