export class GravitySystem {
	update() {

		entityManager.forEach(['gravity', 'acceleration'], (b) => {

			b.acceleration.x += b.gravity.x;
			b.acceleration.y += b.gravity.y;
		});

	}
}