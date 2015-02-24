import System.Collections.Generic; // we want to use a generic list

var flockSize : int = 20; 
var boidPrefab : GameObject;   
var flock:List.<GameObject>; // a list of GameObjects
var deadNum:int = 0;

function Start() { 	
    flock = new List.<GameObject>(); 	
    for (var i=0; i<flockSize; i++) {
        var boid = Instantiate(boidPrefab,transform.position,transform.rotation);
        boid.layer = 9;
        boid.transform.parent = transform;
        var pos : Vector2 = Random.insideUnitCircle * collider.bounds.size.x;
        var position = Vector3(pos.x, 1, pos.y);
        boid.transform.localPosition = position;
        var s:Seek = boid.transform.GetComponent(Seek);
        s.target = null;
        flock.Add(boid);
    }   
    
    for (var boid1 : GameObject in flock) {
        boid1.GetComponent("FlockingBehaviour").StartFlocking(flock);
    }
    
}

function getAliveNum():int{
	return flockSize - deadNum;
}

function Update(){
	var deadOne;
	for(var boid : GameObject in flock){
		if(boid.GetComponent(SheepVision).dead) {
			deadOne = boid;
			break;
		}
	}
	if(deadOne != null){
		flock.Remove(deadOne);
		GameObject.Destroy(deadOne);
		deadNum++;
	}
}

function getNearOne(other : Transform, dist:float):GameObject{
	for(var boid : GameObject in flock){
		if(Vector3.Distance(boid.transform.position, other.position) < dist && !boid.GetComponent(SheepVision).homed && !boid.GetComponent(SheepVision).dead) return boid;
	}
	return null;
}