import {EntityGroup} from "./entityGroup.js";

export class EntityManager {


	constructor() {

		this.tempEntityGroup = new EntityGroup(this);
		this.entities = [];
	}

	forEach(components, doAction) {

		this.tempEntityGroup.components = components;
		this.tempEntityGroup.update();
		this.tempEntityGroup.forEach(doAction);
	}

	createEntity(e) {
		this.entities.push(e);
		return e;
	}
}


