export class SetupWorldSystem {

	update() {

		let preloadedImagesEntity = entityManager.first(["preloadedImages"]);
		let preloadedImages = preloadedImagesEntity.preloadedImages;

		let size = Math.min(width, height);
		let centerX = width / 2;
		let centerY = height / 2;

		entityManager.entities = [preloadedImagesEntity];

		let radius = map(size,1080,300,26,15);
		let mouseInputRadius = radius*2;

		entityManager.createEntity({
			position: createVector(mouseX, mouseY),
			radius: mouseInputRadius,
			isFixed: true,
			velocity: createVector(0, 0),
			isMouseControlled: true,
			shapeRenderer: {
				//shape: "ellipse",
				fill:color(128,0,0)
			}
		});

		let circleArea =size*size*3.14;

		let objectArea =radius*radius*3.14;

		let count = circleArea /objectArea * 0.1;// constrain(size * 0.2,10,200);
		count = constrain(count,10,200);

		for (var i = 0; i < count; i++) {


			let inverse = i % 2 === 0;

			entityManager.createEntity({
				isBody: true,
				position: createVector(centerX + random(-size / 2, size / 2), centerY + random(-size / 2, size / 2)),
				rotation:random(-15,15),
				radius: radius,
				velocity: createVector(0, 0),
				acceleration: createVector(0, 0),
				mass: 1,
				restitution: 0,
				drag: 3,
				gravity: createVector(0, 3000 * (inverse ? -1 : 1)),
				shapeRenderer: {
					shape: "ellipse",
				//	fill:color(255,128)
				},
				imageRenderer: {
					padding:radius*0.25,
					image:inverse ? preloadedImages.n.image : preloadedImages.s.image
				},
				accelerometerInput:1000
				//textRenderer: {
				//	fill: color(255, 255, 255),
				//},
				//text: inverse ? "N" : "S"
			});
		}

		let strokeWeight = size * .007;

		entityManager.createEntity({
			isFixed: true,
			isDomain: true,
			restitution: .8,
			position: createVector(centerX,centerY),
			velocity: createVector(0, 0),
			radius: size / 2 * 0.9,
			shapeRenderer: {
				radiusOffset:strokeWeight*4,
				shape: "ellipse",
				strokeWeight: strokeWeight,
				//stroke: color(255, 255, 255)
			}
		});
	}
}

