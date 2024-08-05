export class PreloadWorldSystem {

	update() {

		entityManager.createEntity({

			preloadedImages: {

				n: entityManager.createEntity({
					imagePath: "data/n.png"
				}),
				s: entityManager.createEntity({
					imagePath: "data/s.png"
				}),
			}
		});


	}
}