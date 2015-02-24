var weight:float = 1.0f;
function Attract(trans:Transform) {
	if(GetComponent(Seek).target != null) return;
	var steerController = GetComponent(SteeringController);
	var desiredVel = 
		(trans.position - transform.position).normalized * 
		steerController.maxSpeed;
	steerController.steerAccumulator += weight * (desiredVel-rigidbody.velocity);
}

function Disattract(trans:Transform) {
	if(GetComponent(Seek).target != null) return;
	var steerController = GetComponent(SteeringController);
	var desiredVel = 
		-(trans.position - transform.position).normalized * 
		steerController.maxSpeed;
	steerController.steerAccumulator += weight * (desiredVel-rigidbody.velocity);
}