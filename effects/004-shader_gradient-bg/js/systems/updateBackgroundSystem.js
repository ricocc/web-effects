export class UpdateBackgroundSystem {
	update() {
		entityManager.forEach(["interactiveBackground"], (e) => {

			let dt = window.simulation.dt;

			let interactiveBackground = e.interactiveBackground;

			var speed = .08;
			interactiveBackground.time += speed * dt;
		});

	}
}