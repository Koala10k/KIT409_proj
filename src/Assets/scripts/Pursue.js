var weight = 1.0f;
var target:Transform;
var c = 0.005f;

function Update () {
	if(target == null) return;
	var steerController = GetComponent(SteeringController);
	var dist = (target.position - transform.position).magnitude;
	var targetPrediction = target.position + target.rigidbody.velocity * dist * c;
	var desiredVel = (targetPrediction - transform.position).normalized * steerController.maxSpeed;
	steerController.steerAccumulator += weight * (desiredVel-rigidbody.velocity);
}