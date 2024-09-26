export class RenderSystem {

	update()
	{
		clear();

		entityManager.forEach(["position","radius","shapeRenderer"],(e)=> {

			push();
			if (e.shapeRenderer.stroke)
				stroke(e.shapeRenderer.stroke);
			else
				noStroke();

			if (e.shapeRenderer.strokeWeight)
				strokeWeight(e.shapeRenderer.strokeWeight);

			if (e.shapeRenderer.fill)
				fill(e.shapeRenderer.fill);
			else
				noFill();

			translate(e.position.x, e.position.y);
			let size = e.radius * 2 + (e.shapeRenderer.radiusOffset || 0);

			if (e.shapeRenderer.shape === "ellipse") {
				ellipse(0, 0, size, size);
			}
			pop();
		});

		entityManager.forEach(["position","radius","textRenderer"],(e)=> {

			push();
			if (e.textRenderer.stroke)
				stroke(e.textRenderer.stroke);
			else
				noStroke();

			if (e.textRenderer.fill)
				fill(e.textRenderer.fill);
			else
				noFill();

			let size = e.radius * 2;

			textAlign(CENTER, CENTER);
			textSize(size);
			textStyle(BOLD);

			translate(e.position.x, e.position.y);
			translate(-size*0.5,-size*0.5);

			let offsetX = size * 0.12;
			let offsetY = size * 0.05;

			text(e.text,offsetX,offsetY,size,size);

			pop();

		});

		angleMode(DEGREES);
		entityManager.forEach(["position","imageRenderer"],(e)=> {

			push();
			translate(e.position.x, e.position.y);
			if(e.rotation)
				rotate(e.rotation);

			imageMode(CENTER);

			let w = e.imageRenderer.image.width;
			let h = e.imageRenderer.image.height;
			if(e.radius)
			{
				w = e.radius*2;
				h = w;
			}

			if(e.imageRenderer.padding)
			{
				w -= e.imageRenderer.padding;
				h -= e.imageRenderer.padding;
			}

			image(e.imageRenderer.image,0,0,w,h);

			pop();

		});
	}
}