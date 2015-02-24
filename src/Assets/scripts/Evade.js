var maxWeight = 2f;
var weight = 1.0f;
var target:Transform;
var c = 0.05f;
var evadeDist:float = 20f;

function Update () {
	if(target == null) return;
	var steerController = GetComponent(SteeringController);
	var dist = (target.position - transform.position).magnitude;
	if(dist > evadeDist) return;
	var targetPrediction = target.position + target.rigidbody.velocity * dist * c;
	var desiredVel = -(targetPrediction - transform.position).normalized * steerController.maxSpeed;
	steerController.steerAccumulator += (desiredVel-rigidbody.velocity) * Mathf.Clamp(evadeDist / dist, 0, maxWeight);
}