var fleeDist:float = 20f;
var weight:float = 10f;
var target:GameObject;
function Start () {

}

function Update () {	
		target = GameObject.Find("LeaderSheep");
		if(target == null) return;	
		if(GetComponent(SheepVision).homed) return;
        var steerController = GetComponent(SteeringController);
        var dist = target.transform.position - transform.position;
        if(dist.magnitude > fleeDist) return;
        var desiredVel = -dist.normalized * steerController.maxSpeed;
        steerController.steerAccumulator += weight * fleeDist/dist.magnitude  *  (desiredVel - rigidbody.velocity) ;
}