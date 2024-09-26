export class SystemGroup {
	constructor(subsystems) {
		this.subsystems = subsystems;
	}

	update() {

		for (let i = 0; i < this.subsystems.length; i++) {

			this.subsystems[i].update();
		}
	}
}