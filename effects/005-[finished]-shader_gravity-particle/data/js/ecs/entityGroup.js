export class EntityGroup {
	constructor(entityManager, components) {
		this.entityManager = entityManager;
		this.entityCount = 0;
		this.entityIdArray = new Uint8Array(256);
		this.components = components;
	}

	hasComponents (entity) {
		const exists = (x) => typeof x !== "undefined";

		for (let i = 0; i < this.components.length; i++) {

			if(!exists(entity[this.components[i]]))
			{
				return false;
			}
		}

		return true;
	}

	update() {

		this.entityCount = 0;
		for (let i = 0; i < this.entityManager.entities.length; i++) {

			let e = this.entityManager.entities[i];
			if (this.hasComponents(e)) {
				this.entityIdArray[this.entityCount] = i;
				this.entityCount++;
			}
		}
		/*console.log("update",this.entityCount,"entities found",this.components)
		this.forEach((e)=>{
			console.log("entity",e,this.entityIdArray)
		})*/
	}

	getEntity(id) {
		return this.entityManager.entities[ this.entityIdArray[id]];
	}

	forEach(doAction) {
		for (let i = 0; i < this.entityCount; i++) {

			doAction(this.getEntity(i));
		}
	}
}