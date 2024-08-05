export class UpdatePaletteSystem {


	update() {
		let dt = window.simulation.dt;

		entityManager.forEach(['palette'], (e) => {

			let palette = e.palette;
			// lerp to palette target
			for (var i = 0; i < palette.paletteImg.pixels.length; i++) {
				palette.paletteImg.pixels[i] = map(dt * 10, 0, 1, palette.paletteImg.pixels[i], palette.paletteTargetImg.pixels[i]);
			}

			palette.paletteImg.updatePixels();
		});
	}
}