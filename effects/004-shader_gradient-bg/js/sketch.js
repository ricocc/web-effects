
import {SystemGroup} from "./ecs/systemGroup.js";
import {EntityManager} from "./ecs/entityManager.js";
import {UpdatePaletteSystem} from "./systems/updatePaletteSystem.js";
import {PreloadImageSystem} from "./systems/preloadImageSystem.js";
import {PreloadShaderSystem} from "./systems/preloadShaderSystem.js";
import {RenderBackgroundSystem} from "./systems/renderBackgroundSystem.js";
import {UpdateBackgroundSystem} from "./systems/updateBackgroundSystem.js";
import {SetupPaletteSystem} from "./systems/setupPaletteSystem.js";
import {PreloadWorldSystem} from "./systems/preloadWorldSystem.js";

window.entityManager = new EntityManager();

window.simulation =
	{
		dt: 1 / 60
	};

let preloadSystems = new SystemGroup([new PreloadWorldSystem(), new PreloadImageSystem(),new PreloadShaderSystem()]);
let setupSystems = new SystemGroup([new SetupPaletteSystem()]);
let simulationSystems =  new SystemGroup([new UpdatePaletteSystem(), new UpdateBackgroundSystem()]);
let presentationSystems =  new SystemGroup([new RenderBackgroundSystem()]);

let prevMillis = 0;


window.preload =function() {

	preloadSystems.update();

};

window.setup = function() {

	createCanvas(windowWidth,windowHeight,WEBGL);

	setupSystems.update();

	window.parent.postMessage("setupcomplete", '*');
};

window.windowResized = function(){

	resizeCanvas(windowWidth, windowHeight);
};


window.draw = function(){

	window.simulation.dt = (millis() - prevMillis)/1000;

	simulationSystems.update();
	presentationSystems.update();

	prevMillis = millis();
};


window.keyPressed = function()
{
};

window.mousePressed = function(){

	return false;
};

window.mouseMoved = function(){

	return false;
};

window.mouseDragged = function(){

	return false;
};

window.mouseReleased = function(){

	return false;
};

window.touchStarted = function(){

	return false;
};

window.touchMoved = function(){

	return false;
};

window.touchEnded = function(){

	//return false;
};


