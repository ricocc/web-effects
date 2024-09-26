export class PreloadWorldSystem {

	update() {

		entityManager.createEntity({

			preloadedImages: {

				n: entityManager.createEntity({
					imagePath: "data/love.png"
				}),
				s: entityManager.createEntity({
					imagePath: "data/face.png"
				}),
			}
		});


	}
}