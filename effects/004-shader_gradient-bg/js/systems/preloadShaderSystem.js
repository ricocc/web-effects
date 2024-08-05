export class PreloadShaderSystem {

	update() {

		entityManager.forEach(['shaderPath'], (e) => {

			e.shader = loadShader( e.shaderPath.vertPath,  e.shaderPath.fragPath);

		});


	}
}