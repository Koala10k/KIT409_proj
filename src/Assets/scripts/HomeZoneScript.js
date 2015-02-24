var num:int = 0;
var text : TextMesh;
var score : TextMesh;
var home: Transform;
private var nextScore:int = 0;
private var currentScore:int = 0;
private var flock:GameObject;

function Start(){
	flock = GameObject.Find("Flock");
}

function OnTriggerEnter(other : Collider) {
	if(other.tag == "Sheep" && !other.gameObject.GetComponent(SheepVision).homed){
		other.gameObject.GetComponent(SheepVision).homed = true;
		num++;
		nextScore += 500;
		text.text = "Sheeps: "+num;
		other.gameObject.GetComponent(Seek).target = home;
	}
}

function Update(){
	if(nextScore > currentScore){
	currentScore += 25;
	score.text = "Score:" + currentScore;
	}
	var flockSize = flock.GetComponent(Flock).flockSize;
	var deadNum = flock.GetComponent(Flock).deadNum;
	if(num >= flockSize - deadNum) end(deadNum, flockSize);
}
function end(deadNum,flockSize){
			if(deadNum < flockSize * 0.2f) text.text = "You saved more than 80% sheeps, Excellent work!";
			else if(deadNum < flockSize * 0.3f) text.text = "You saved more than 70% sheeps, Nice work!";
			else if(deadNum < flockSize * 0.4f) text.text = "You saved more than 60% sheeps, Good work!";
			else if(deadNum < flockSize * 0.5f) text.text = "You saved more than 50% sheeps, OK work!";
			else text.text = "You lost more than a half of sheeps, not your best!";
}