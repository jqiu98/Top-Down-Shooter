class Enemy extends Entity {
	constructor(anims, projectileTexture, projRadius, x, y) {
		super(anims, projectileTexture, projRadius, x, y);

		this.speed = 4;
		this.entity.damage = 10;

		this.lastShot = 0;
		this.shootThreshold;
	}

	Run() {
		this.ProcessInputs();
		super.Run();
	}

	ProcessInputs() {
		this.entity.velocity.mult(0);

		if (!gameOver) this.entity.attractionPoint(this.speed, player.entity.position.x, player.entity.position.y);

		if (-45 > this.entity.velocity.heading() &&  this.entity.velocity.heading() > -135) this.entity.changeAnimation('walk_up');

		else if (135 > this.entity.velocity.heading() && this.entity.velocity.heading() > 45) this.entity.changeAnimation('walk_down');

		else if (-45 < this.entity.velocity.heading() && this.entity.velocity.heading() < 45) this.entity.changeAnimation('walk_right');

		else  this.entity.changeAnimation('walk_left');
	}


	TrackVelocityRotation() {
		this.pVelocity.x = this.entity.velocity.x;
		this.pVelocity.y = this.entity.velocity.y;
		this.pRotation = 0;
	}

	Shoot() {
		let currShot = millis();
		if (currShot - this.lastShot > this.shootThreshold) {
			super.Shoot();
			this.lastShot = currShot;
		}
	}
}