export class PreloadImageSystem {

	update() {

		entityManager.forEach(['imagePath'], (e) => {

			e.image = loadImage(e.imagePath);
		});


	}
}



