var weight:float = 1f;
var target:Transform;
var slowingDist:float = 15f;
var offset:float = 1f;

function Update () {
		if(target == null) return;
        var steerController = GetComponent(SteeringController);
        var distance = (target.position - transform.position).magnitude;
        if(distance > slowingDist) return;
        
        var rampedSpd = steerController.maxSpeed * Mathf.Clamp((distance - offset) / slowingDist, 0, 1f);
        var desiredVel = (target.position - transform.position).normalized * rampedSpd;
        steerController.steerAccumulator += weight * (desiredVel - rigidbody.velocity);
        
        if(distance < offset){
        target = null;
        GetComponent(Seek).target = null;
        }
}