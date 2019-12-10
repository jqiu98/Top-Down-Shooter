class Player extends Entity {
	constructor(anims, projectileTexture, x = 64, y = 7*64) {
		super(anims, projectileTexture, x, y);
	}

	Run() {
		this.ProcessInputs();
		super.Run();
	}

	ProcessInputs() {
		this.entity.velocity.x = 0;
		this.entity.velocity.y = 0;


		if (keyDown(LEFT_ARROW)) {
			this.entity.velocity.x = -this.speed;
			this.entity.changeAnimation('walk_left');
		}

		if (keyDown(RIGHT_ARROW)) {
			this.entity.velocity.x = this.speed;
			this.entity.changeAnimation('walk_right');
		}

		if(keyDown(UP_ARROW)) {
			this.entity.velocity.y = -this.speed;
			this.entity.changeAnimation('walk_up');
		}

		if (keyDown(DOWN_ARROW)) {
			this.entity.velocity.y = this.speed;
			if (this.entity.velocity.x === 0) this.entity.changeAnimation('walk_down');
		}

		if (this.entity.velocity.mag() === 0) {
			this.entity.animation.changeFrame(1);
		}
		else {
			this.entity.velocity.limit(this.speed);
		}

		if (keyWentDown(" ")) super.Shoot();

	    if(mouseIsPressed) camera.zoom = 0.1;
	    else camera.zoom = 1;
	}
}