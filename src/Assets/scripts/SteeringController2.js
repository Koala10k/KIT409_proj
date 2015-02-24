import System.Collections.Generic;

var maxSpeed:float = 15; 
var maxForce:float = 15;
var maxTurnSpeed:float = 10;

var steering:List.<SteerBehaviour>;
var target:Transform;
var weight:float = 5;
private var steerForce:Vector3 = Vector3.zero;

private var seekSteering:SteerBehaviour;
private var fleeSteering:SteerBehaviour;
private var wanderSteering:SteerBehaviour;
function FixedUpdate(){
	rigidbody.AddForce(steerForce);
}

function Start(){
	seekSteering = new SeekSteering(this, target, weight);
	fleeSteering = new FleeSteering(this, target, weight);
	wanderSteering = new WanderSteering(this, target, weight);
	steering = new List.<SteerBehaviour>([seekSteering, fleeSteering, wanderSteering]);
	
	StartCoroutine("SteerUpdate");
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

function SteerUpdate() { 
	while (true){		 
		var steerAccumulator = Vector3.zero;
		for (s in steering){
			steerAccumulator += s.Steer();
		}
		
		steerAccumulator.y = 0; 
		if (steerAccumulator.magnitude>maxForce){
			steerForce = steerAccumulator.normalized*maxForce;
		} else {
			steerForce = steerAccumulator;
		}
		
		var waitTime = Random.Range(0.2, 0.5);
		yield WaitForSeconds(waitTime);
	}
}

interface SteerBehaviour{
    function Steer():Vector3;
}

class SeekSteering implements SteerBehaviour{
	var self;
	var target;
	var weight;
	
	function SeekSteering(s,t,w){
		self = s;
		target = t;
		weight = w;
	}
	
	function Steer():Vector3{
		/*var desiredVel = (target.position-self.transform.position).normalized*self.maxSpeed;
		return weight*(desiredVel-self.rigidbody.velocity);*/
		return Vector3.zero;
	}
}

class FleeSteering implements SteerBehaviour{
	var self;
	var target;
	var weight;
	
	function FleeSteering(s,t,w){
		self = s;
		target = t;
		weight = w;
	}
	
	function Steer():Vector3{
		var desiredVel = -(target.position-self.transform.position).normalized*self.maxSpeed;
		return weight*(desiredVel-self.rigidbody.velocity);
	}
}

class WanderSteering implements SteerBehaviour{
	var self;
	var target;
	var weight;
	var r:float = 10;
	function WanderSteering(s,t,w){
		self = s;
		target = t;
		weight = w;
	}
	
	function Steer():Vector3{
		/*var alpha = Random.Range(-Mathf.PI / 4, -Mathf.PI / 4);
		var tar_pos = Vector3(Mathf.Cos(alpha)*r + self.transform.position.x,self.transform.position.y, Mathf.Sin(alpha)*r + self.transform.position.z);
		
		var desiredVel = (tar_pos-self.transform.position); 
		if (desiredVel.magnitude>self.maxSpeed)
			desiredVel = desiredVel.normalized*self.maxSpeed;
		return weight*(desiredVel-self.rigidbody.velocity);*/
		return Vector3.zero;
	}
}