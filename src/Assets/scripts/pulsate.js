var magnitude:float = 0.2;
var speed:float = 5;
function Update () {
	var s = 1+(Mathf.Sin(speed*Time.time)-0.5)*magnitude;
	transform.localScale = Vector3(s,s,s);
}