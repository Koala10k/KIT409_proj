private var anim:Animator;

function Start(){
	anim = GetComponent(Animator);
}

function Update(){
	anim.SetFloat("speed", rigidbody.velocity.magnitude);
}