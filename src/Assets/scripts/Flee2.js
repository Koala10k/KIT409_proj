var fleeDist:float = 20f;
var weight:float = 10f;
var target:Transform;
function Start () {

}

function Update () {	
		if(target == null) return;	
        var steerController = GetComponent(SteeringController);
        var dist = target.transform.position - transform.position;
        var desiredVel = -dist.normalized * steerController.maxSpeed;
        steerController.steerAccumulator += weight * fleeDist/dist.magnitude  *  (desiredVel - rigidbody.velocity) ;
}