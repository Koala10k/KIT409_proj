To launch this demo, 
place the 'SHEEPBOSS.html' and the 'SHEEPBOSS.unity3d' in a same directory. 
Then open the 'SHEEPBOSS.html' with a browser application.


Works I have completed:

Part A:
Sheep Mechanics:
	Sheep is controlled by flocking behaviours and also seek the lead sheep. (Seek Behaviour, Flocking behaviour)
	Sheep avoids simple obstacles. (Collision Avoiding behaviour)
	A poo scares the sheep (Flee behaviour)
	A cheese weakly attracts the sheep (Seek behaviour, Collision Trigger)
	A sheep avoids leadersheep when they are too close to each other.
	A sheep flees a wolf when they are too close to each other.

	Sheep animation is driven by steering behaviour

Control Mechanics:
	LeaderSheep is controlled indirectly by clicking on the target location.
	LeaderSheep Path finding behaviour.
	LeaderSheep performs arriving behaviour when he or she is approaching the target location
	
Victory condition:
The game will end up with a "Excellent" result, when more than 80% of the sheep arrived their home safely.
The game will end up with a "Nice" result, when more than 70% of the sheep arrived their home safely.
The game will end up with a "Good" result, when more than 60% of the sheep arrived their home safely.
The game will end up with a "OK" result, when more than 50% of the sheep arrived their home safely.
The game will end up with a "not your best" result, when less than 50% of the sheep arrived their home safely.

Part B:
An AI controlled wolf has been added.
The behaviours (Wandering, GoBack, chasingSheep) of the wolf is driven by a planning system, 
Conditions include:
	the distance between the wolf and wolf's home
	the distance between the wolf and the nearest sheep (excluding the LeaderSheep)
