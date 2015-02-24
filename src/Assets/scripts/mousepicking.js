function Update () {
	if (Input.GetMouseButtonDown(0)){
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hitinfo:RaycastHit;
		if (Physics.Raycast (ray,hitinfo,Mathf.Infinity, ~(1<<8))) {
			transform.position = hitinfo.point;
			transform.position.y = 0.5;
			Debug.Log("mouse hit on: "+hitinfo.collider.gameObject.name);
		}
		var leaderSheep:GameObject = GameObject.Find("LeaderSheep");
		leaderSheep.GetComponent(FindPath).setFinalTarget(transform);
	}
}