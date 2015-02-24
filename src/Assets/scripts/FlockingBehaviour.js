import System.Collections.Generic; // we want to use a generic list

var maxSpeed:float = 10;
var maxForce:float = 10;
private var maxTurnSpeed = 5;

var range = 50; 
var alignWeight = 1;
var cohesionWeight = 1;
var separationWeight = 1;

var steerAccumulator:Vector3 = Vector3.zero;
private var steerForce:Vector3 = Vector3.zero;

private var theFlock: List.<GameObject>;
private var inRange : List.<GameObject>; // a list of GameObjects

function Update () {	
    if (rigidbody.velocity.magnitude>0.1){
        // calucalte the angle between motion and current heading
        var turnAngle:float = Mathf.Clamp(
        Vector3.Angle(transform.forward, rigidbody.velocity),0, maxTurnSpeed*Time.deltaTime);

        // calculate the direction that you need to turn
        turnAngle *= Mathf.Sign(Vector3.Dot(transform.right, rigidbody.velocity));
		
        // turn		
        transform.Rotate(Vector3(0,1,0),turnAngle);		
    }
}

function StartFlocking(flock){
	theFlock = flock;
	StartCoroutine("FlockUpdate");
}

function FixedUpdate(){
    rigidbody.AddForce(steerForce);
}

function FlockUpdate () {
    while (true){
    inRange = new List.<GameObject>();
        for (var boid:GameObject in theFlock){
        	if(boid == null) continue;
            var separation:Vector3 =transform.position-boid.transform.position;
            if (separation.magnitude>0.01 && separation.magnitude<range){
                inRange.Add(boid);
            }
        }
        
        
        var steerAccumulator = Vector3.zero;
        if (inRange.Count>0){
            steerAccumulator += cohesionWeight*CohesionSteering();
            steerAccumulator += alignWeight*AlignSteering();
            steerAccumulator += separationWeight*SeparateSteering();
        }
		
        // Limit steering force to maximum
        steerAccumulator.y = 0;
        if (steerAccumulator.magnitude>maxForce){
            steerForce = steerAccumulator.normalized*maxForce;
        } else {
            steerForce = steerAccumulator;
        }
        waitTime = Random.Range(0.1, 0.2);
        yield WaitForSeconds(waitTime);
    }
}

function CohesionSteering(){
	var cohesionVector3 = Vector3.zero;
	var tempVector3 = Vector3.zero;
	for( var boid:GameObject in inRange) {
		tempVector3 += boid.transform.position;
	}
	tempVector3 = tempVector3/inRange.Count;
	var d = tempVector3 - transform.position;
	cohesionVector3 = Mathf.Clamp(d.magnitude / (range / 2), 0.1, 1) * d.normalized * maxSpeed;
	return cohesionVector3;
}

function AlignSteering() {
	var alignVector3 = Vector3.zero;
	for(var boid:GameObject in inRange) {
		alignVector3 += boid.rigidbody.velocity;
	}
	return (alignVector3.normalized - rigidbody.velocity);
}

function SeparateSteering() {
	var separateV = Vector3.zero;
	var tempVector3 = Vector3.zero;
	for( var boid:GameObject in inRange) {
		tempVector3 += boid.transform.position;
	}
	tempVector3 = tempVector3/inRange.Count;
	var d = transform.position - tempVector3;
	separateV =  Mathf.Clamp((range/ 2) / d.magnitude,0.1, 1) * d.normalized * maxSpeed;
	return separateV;
	//return Vector3.zero;
}