var maxSpeed:float = 10;
var maxTurnSpeed:float = 180.0; // degrees
var maxForce:float = 10;
var steerAccumulator:Vector3 = Vector3.zero;
private var steerForce:Vector3 = Vector3.zero;
private var anim:Animator;

function Start(){
	anim = GetComponent(Animator);
}

function FixedUpdate(){
	rigidbody.AddForce(steerForce);
	if(anim == null) return;
	anim.SetFloat("speed", rigidbody.velocity.magnitude);
}

function LateUpdate() {
	steerAccumulator.y = 0;
	steerForce = Vector3.ClampMagnitude(steerAccumulator,maxForce);
	steerAccumulator = Vector3.zero;
}

function Update () {	
	if (rigidbody.velocity.magnitude>0.1){
		// calucalte the angle between motion and current heading
		var turnAngle:float = Mathf.Clamp(
			Vector3.Angle(transform.forward, rigidbody.velocity),
			0, maxTurnSpeed*Time.deltaTime);
		// calculate the direction that you need to turn
		turnAngle *= Mathf.Sign(Vector3.Dot(transform.right, rigidbody.velocity));
		// turn		
		transform.Rotate(Vector3(0,1,0),turnAngle);		
	}
}