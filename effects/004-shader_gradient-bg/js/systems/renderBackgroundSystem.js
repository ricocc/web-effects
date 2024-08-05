export class RenderBackgroundSystem {
	update() {
		entityManager.forEach(["interactiveBackground"], (e) => {

			let interactiveBackground = e.interactiveBackground;

			let s = interactiveBackground.shaderObject.shader;
			s.setUniform('uSamplerPalette', interactiveBackground.paletteObject.palette.paletteImg);
			s.setUniform('time', interactiveBackground.time);
			s.setUniform('noiseSize', interactiveBackground.noiseSize);
			s.setUniform('aspect', width / height);
			s.setUniform('offset', [interactiveBackground.offsetX, interactiveBackground.offsetY]);

			push();
			shader(s);
			noStroke();
			plane(width, height);
			pop();
		});

	}
}

