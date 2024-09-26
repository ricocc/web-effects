
export class CursorSystem {
	update() {

		let closestDist = Infinity;


		entityManager.forEach(['isDomain','position','radius'], (b) => {

			let d = dist(mouseX, mouseY, b.position.x, b.position.y)- b.radius;
			closestDist = min(d, closestDist);
		});

		entityManager.forEach(['isMouseControlled','radius'], (b) => {

			let realDist = closestDist - b.radius;
			if(realDist<b.radius)
				cursor('pointer');
			else
				cursor('auto');

		});


	}
}