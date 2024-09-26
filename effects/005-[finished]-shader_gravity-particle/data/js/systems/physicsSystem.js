import {EntityGroup} from "../ecs/entityGroup.js";

export class PhysicsSystem {
	constructor() {

		this.iterations = 5;
		this.bodiesGroup = new EntityGroup(entityManager, ['position', 'radius', 'isBody']);
		this.domainsGroup = new EntityGroup(entityManager, ['position', 'radius', 'isDomain']);
	}

	update() {

		var dt = window.simulation.dt;

		entityManager.forEach(['position', 'velocity', 'acceleration'], (b) => {

			if (!b.isFixed) {
				b.velocity.x += b.acceleration.x * dt;
				b.velocity.y += b.acceleration.y * dt;
				if(b.drag)
				{
					let dragC = Math.exp(-b.drag*dt);
					b.velocity.x *= dragC;
					b.velocity.y *= dragC;
				}
				b.position.x += b.velocity.x * dt;
				b.position.y += b.velocity.y * dt;
			}
			b.acceleration.x = 0;
			b.acceleration.y = 0;
		});

		/*
		entityManager.forEach(['position'],(b)=>{

			if (!b.isFixed) {
				b.position.x += b.acceleration.x * dt;
				b.position.y += b.acceleration.y * dt;
			}
			b.acceleration.x = 0;
			b.acceleration.y = 0;

			if(b.prevPosition === undefined)
				b.prevPosition = b.position.copy();

			let tempPrevPosX = b.position.x;
			let tempPrevPosY = b.position.y;

			if(!b.isFixed)
			{
				b.position.x += b.position.x - b.prevPosition.x;
				b.position.y += b.position.y - b.prevPosition.y;
			}

			b.prevPosition.x = tempPrevPosX;
			b.prevPosition.y = tempPrevPosY;
		});*/

		this.bodiesGroup.update();
		this.domainsGroup.update();

		const dist = (x,y)=> Math.sqrt(x*x+y*y);
		const dot = (x1, y1, x2, y2) => x1 * x2 + y1 * y2;
		const impulseMultiplier = .5;
		const offsetMultiplier = .5;
		for (let iter = 0; iter < this.iterations; iter++) {

			for (let i = 0; i < this.bodiesGroup.entityCount; i++) {

				let other = this.bodiesGroup.getEntity(i);

				for (let j = 0; j < this.bodiesGroup.entityCount; j++) {

					if (i === j)
						continue;

					let b = this.bodiesGroup.getEntity(j);
					let relativePosX = b.position.x - other.position.x;
					let relativePosY = b.position.y - other.position.y;
					let ballDist = dist(relativePosX, relativePosY);

					let minDist = other.radius + b.radius;

					let overlap = minDist - ballDist;


					if (overlap > 0) {

						let relativePosNormX = relativePosX / ballDist;
						let relativePosNormY = relativePosY / ballDist;
						let correctionX = overlap * relativePosNormX * offsetMultiplier;
						let correctionY = overlap * relativePosNormY * offsetMultiplier;

						if (!b.isFixed && !other.isFixed) {

							b.position.x += correctionX * 0.5;
							b.position.y += correctionY * 0.5;
							other.position.x -= correctionX * 0.5;
							other.position.y -= correctionY * 0.5;

						} else if (b.isFixed) {
							other.position.x -= correctionX;
							other.position.y -= correctionY;
						} else if (other.isFixed) {
							b.position.x += correctionX;
							b.position.y += correctionY;
						}
						let velocityDiffX = b.velocity ? b.velocity.x : 0 - other.velocity ? other.velocity.x : 0;
						let velocityDiffY = b.velocity ? b.velocity.y : 0 - other.velocity ? other.velocity.y : 0;

						let contactVelocity = dot(velocityDiffX, velocityDiffY, relativePosNormX, relativePosNormY);

						if (contactVelocity < 0) {

							let thisInvMass = 1 / (b.mass || Infinity);
							let otherInvMass = 1 / (other.mass || Infinity);
							let restitution=  ((b.restitution || 0) + (other.restitution || 0)) * 0.5;
							let j = -(1.0 + restitution) * contactVelocity / (thisInvMass+otherInvMass);

							let impulseX = relativePosNormX * j * impulseMultiplier;
							let impulseY = relativePosNormY * j * impulseMultiplier;
							other.velocity.x -= impulseX * otherInvMass;
							other.velocity.y -= impulseY * otherInvMass;
							b.velocity.x += impulseX * thisInvMass;
							b.velocity.y += impulseY * thisInvMass;
						}
					}
				}
			}
			//Keep the balls inside the domain
			for (let i = 0; i < this.domainsGroup.entityCount; i++) {
				let other = this.domainsGroup.getEntity(i);

				for (let j = 0; j < this.bodiesGroup.entityCount; j++) {

					let b = this.bodiesGroup.getEntity(j);
					if (b.isFixed)
						continue;

					let relativePosX = b.position.x - other.position.x;
					let relativePosY = b.position.y - other.position.y;
					let ballDist = dist(relativePosX, relativePosY);

					let maxDist = other.radius - b.radius;

					let overlap = ballDist - maxDist;
					if (overlap > 0) {

						let relativePosNormX = relativePosX / ballDist;
						let relativePosNormY = relativePosY / ballDist;
						let correctionX = overlap * relativePosNormX;
						let correctionY = overlap * relativePosNormY;
						b.position.x -= correctionX;
						b.position.y -= correctionY;

						relativePosNormX = -relativePosNormX;
						relativePosNormY = -relativePosNormY;


						let velocityDiffX = b.velocity ? b.velocity.x : 0 - other.velocity ? other.velocity.x : 0;
						let velocityDiffY = b.velocity ? b.velocity.y : 0 - other.velocity ? other.velocity.y : 0;
						let contactVelocity = dot(velocityDiffX, velocityDiffY, relativePosNormX, relativePosNormY);

						if (contactVelocity < 0) {

							let thisInvMass = 1 / (b.mass || Infinity);
							let otherInvMass = 1 / (other.mass || Infinity);
							let restitution=  ((b.restitution || 0) + (other.restitution || 0)) * 0.5;
							let j = -(1.0 + restitution) * contactVelocity / (thisInvMass+otherInvMass);

							let impulseX = relativePosNormX * j;
							let impulseY = relativePosNormY * j;
							other.velocity.x -= impulseX * otherInvMass;
							other.velocity.y -= impulseY * otherInvMass;
							b.velocity.x += impulseX * thisInvMass;
							b.velocity.y += impulseY * thisInvMass;
						}
					}
				}
			}
		}
	}
}

