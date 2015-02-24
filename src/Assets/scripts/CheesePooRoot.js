var pooSize : int = 20; 
var cheeseSize : int = 20;
var pooPrefab : GameObject;
var cheesePrefab : GameObject;

function Start() { 	
	var i : int;
	var pos : Vector2;
	var position : Vector3;
    for (i=0; i<pooSize; i++) {
        var poo = Instantiate(pooPrefab,transform.position,transform.rotation);
        poo.transform.parent = transform;
        poo.layer = 10;
        pos = Random.insideUnitCircle * collider.bounds.size.x;
        position = Vector3(pos.x, 1, pos.y);
        poo.transform.localPosition = position;
    }
    
    for (i=0; i<cheeseSize; i++) {
        var cheese = Instantiate(cheesePrefab,transform.position,transform.rotation);
        cheese.transform.parent = transform;
        cheese.layer = 10;
        pos = Random.insideUnitCircle * collider.bounds.size.x;
        position = Vector3(pos.x, 1, pos.y);
        cheese.transform.localPosition = position;
    } 
}