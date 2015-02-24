function OnTriggerStay(other : Collider) {
	if(other.tag == "Sheep"){
		other.GetComponent(SheepAttention).Attract(this.transform);
	}
}