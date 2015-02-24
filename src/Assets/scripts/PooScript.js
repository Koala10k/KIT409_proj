function OnTriggerStay(other : Collider) {
	if(other.tag == "Sheep"){
		other.GetComponent(SheepAttention).Disattract(this.transform);
	}
}