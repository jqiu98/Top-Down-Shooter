class Entity {
	constructor(anims, projectileTexture, projRadius, x = 64, y = 7*64) {
		this.entity = createSprite(x, y);
		
		this.entity.addAnimation('walk_down', anims[0]);
		this.entity.addAnimation('walk_left', anims[1]);
		this.entity.addAnimation('walk_right', anims[2]);
		this.entity.addAnimation('walk_up', anims[3]);

		this.entity.scale = 1.2;

		this.entity.collider = this.entity.getBoundingBox();

		this.health = 100;
		this.speed = 9;
		this.damage = 5;

		this.pVelocity = createVector(0,5);
		this.pRotation = 0;

		this.projectileTexture = projectileTexture;
		this.projectiles = [];
		this.projectileGroup = new Group();
		this.projectileIndex = 0;
		this.MAXPROJECTILE = 3;
		this.projRadius = projRadius;
	}

	Run() {
		this.Update();
		this.Display();
	}

	//ProcessInputs(){}

	Shoot() {
		let aProjectile = this.projectiles[this.projectileIndex];
		if (!aProjectile.isActive) {
			let data = this.GetAimPosition(aProjectile.GetWidth()/2 - this.projRadius);
			let aim = data[0];
			let offset = data[1];

			aProjectile.UpdatePosition(this.entity.position.x + aim.x, this.entity.position.y + aim.y);
			aProjectile.UpdateVelocity(this.pVelocity.x, this.pVelocity.y);
			aProjectile.SetCollider(offset.x, offset.y, this.projRadius);

			aProjectile.SetAlive();
		}
		else if (aProjectile.GetLife() === aProjectile.life) aProjectile.isActive = false;
		this.projectileIndex = (this.projectileIndex + 1) % this.MAXPROJECTILE;

	}

	GetAimPosition(projHalfWidth) {
		let radius = this.entity.width / 2 + 7.5;
		let angle = this.pVelocity.heading();
		let aim = createVector(radius * cos(angle), radius * sin(angle))

		if (projHalfWidth === 0) return aim;

		let newRadius = radius + projHalfWidth;
		let offset = createVector(newRadius * cos(angle), newRadius * sin(angle));

		offset.sub(aim);

		return [aim, offset];

	}

	TrackVelocityRotation() {
		if (this.entity.velocity.x !== 0 && this.entity.velocity.y !== 0) {
			this.pVelocity.x = this.entity.velocity.x;
			this.pVelocity.y = this.entity.velocity.y;
			this.pRotation = -abs(this.pVelocity.heading()) + 90;
		}
		else if (this.entity.velocity.x !== 0) {
			this.pVelocity.x = this.entity.velocity.x;
			this.pVelocity.y = 0;
			this.pRotation = 0;
		}
		else if (this.entity.velocity.y !== 0) {
			this.pVelocity.x = 0;
			this.pVelocity.y = this.entity.velocity.y;
			this.pRotation = 0;
		}
	}

	Update() {
		this.TrackVelocityRotation();
		this.entity.rotation = this.pRotation;
	}

	DisplayAim() {
		let aim = this.GetAimPosition(0);

		push();
		fill("#ff8000");
		ellipse(this.entity.position.x + aim.x, this.entity.position.y + aim.y, 5);
		pop();
	}

	DisplayProjectiles() {
		for (let aProjectile of this.projectiles) {
			if (aProjectile.isActive) {
				aProjectile.Run();
			}
		}
	}

	DisplayHealth() {
		push();
		rectMode(CORNER);
		stroke(0);
		noFill();
		rect(this.entity.position.x-32, this.entity.position.y-42.5, 64, 4, 30);

		let currHealth = map(this.health, 0, 100, 0, 64);
		fill(0, 255, 0);
		noStroke();
		rect(this.entity.position.x-32, this.entity.position.y-42.5, currHealth, 4, 30);
		pop();
	}


	Display() {
		drawSprite(this.entity);
		this.DisplayAim();
		this.DisplayProjectiles();
		this.DisplayHealth();
	}
}