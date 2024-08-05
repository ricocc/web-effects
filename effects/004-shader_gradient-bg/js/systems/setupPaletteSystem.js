export class SetupPaletteSystem {

	update() {

		entityManager.forEach(['palette'], (e) => {

			let palette = e.palette;

			let img = palette.imageObj.image;
			palette.paletteImg = createImage(1, img.height);
			palette.paletteImg.loadPixels();

			palette.paletteTargetImg = createImage(1, img.height);
			palette.paletteTargetImg.loadPixels();

			img.loadPixels();

			var x = 0;
			for (var y = 0; y < img.height; y++) {

				var pixelId = x + y * img.width;

				palette.paletteTargetImg.pixels[y * 4 + 0] = img.pixels[pixelId * 4 + 0];
				palette.paletteTargetImg.pixels[y * 4 + 1] = img.pixels[pixelId * 4 + 1];
				palette.paletteTargetImg.pixels[y * 4 + 2] = img.pixels[pixelId * 4 + 2];
				palette.paletteTargetImg.pixels[y * 4 + 3] = img.pixels[pixelId * 4 + 3];

			}

			palette.paletteTargetImg.updatePixels();
			palette.paletteTargetImg.loadPixels();
		});


	}
}