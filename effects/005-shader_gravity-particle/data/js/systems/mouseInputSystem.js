export class MouseInputSystem {

	update()
	{
		var dt = window.simulation.dt;
		entityManager.forEach(['position','isMouseControlled'],(e)=>{
			e.position.x = mouseX;
			e.position.y = mouseY;
			e.velocity.x = (mouseX - pmouseX)/dt;
			e.velocity.y = (mouseY - pmouseY)/dt;
			e.isBody = true;// mouseIsPressed ? true : undefined;
		});

	}
}