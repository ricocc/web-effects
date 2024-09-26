import {EntityGroup} from "./entityGroup.js";

export class EntityManager {


	constructor() {

		this.tempEntityGroup = new EntityGroup(this);
		this.entities = [];
	}

	createEntity(e) {
		this.entities.push(e);
		return e;
	}

	forEach(components, doAction) {

		if(!Array.isArray(components))
			throw "components is not array";

		this.tempEntityGroup.components = components;
		this.tempEntityGroup.update();
		this.tempEntityGroup.forEach(doAction);
	}

	first(components) {

		if(!Array.isArray(components))
			throw "components is not array";

		this.tempEntityGroup.components = components;
		this.tempEntityGroup.update();
		if(this.tempEntityGroup.entityCount > 0)
			return this.tempEntityGroup.getEntity(0);
	}
}


