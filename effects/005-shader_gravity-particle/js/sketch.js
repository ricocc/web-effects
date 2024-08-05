import {PhysicsSystem} from "./systems/physicsSystem.js";
import {RenderSystem} from "./systems/renderSystem.js";
import {SetupWorldSystem} from "./systems/setupWorldSystem.js";
import {SystemGroup} from "./ecs/systemGroup.js";
import {MouseInputSystem} from "./systems/mouseInputSystem.js";
import {EntityManager} from "./ecs/entityManager.js";
import {GravitySystem} from "./systems/gravitySystem.js";
import {PreloadImageSystem} from "./systems/preloadImageSystem.js";
import {PreloadWorldSystem} from "./systems/preloadWorldSystem.js";
import {CursorSystem} from "./systems/cursorSystem.js";

window.entityManager = new EntityManager();

window.simulation =
{
	dt: 1 / 60
};

let preloadSystems = new SystemGroup([new PreloadWorldSystem(),new PreloadImageSystem()]);
let setupSystems = new SystemGroup([new SetupWorldSystem()]);
let updateSystems = new SystemGroup([new MouseInputSystem(),new GravitySystem(),new PhysicsSystem(),new RenderSystem(),new CursorSystem()]);

let prevMillis = 0;


window.preload =function() {

	preloadSystems.update();

};

window.setup = function() {

	// fix for iframe on touch devices
	document.body.addEventListener('touchstart',(e)=>{return false;});

	createCanvas(windowWidth,windowHeight);

	setupSystems.update();
	smooth();

	window.parent.postMessage("setupcomplete", '*');
};


window.windowResized = function(){
	resizeCanvas(windowWidth, windowHeight);
	setupSystems.update();
};


window.draw = function(){

	window.simulation.dt = 1/ 60;// (millis() - prevMillis)/1000;

	updateSystems.update();

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

window.touchMoved = function(e){

	return false;
};

window.touchEnded = function(){

	return false;
};