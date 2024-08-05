export class PreloadWorldSystem {

	update() {

		let shaderObj = entityManager.createEntity({
			shaderPath: {vertPath: "data/vert.glsl", fragPath: "data/frag.glsl"}
		});

		let imageObj = entityManager.createEntity({
			imagePath: "data/colors.png"
		});


		let paletteObj = entityManager.createEntity({

			palette: {
				imageObj: imageObj
			}
		});

		entityManager.createEntity({
			interactiveBackground: {

				shaderObject: shaderObj,
				paletteObject: paletteObj,
				time: 0,
				lastMousePos: 0,
				noiseSize: 2,
				offsetX: 0,
				offsetY: 0
			}
		});
	}
}