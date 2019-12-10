class Player extends Entity {
	constructor(anims, projectileTexture, projRadius, x = 64, y = 7*64) {
		super(anims, projectileTexture, projRadius, x, y);

		this.lastShot = 0;
		this.shootThreshold;
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

		if (keyDown(SHIFT)) this.Shoot();

	    if(mouseIsPressed) camera.zoom = 0.1;
	    else camera.zoom = 0.5;
	}

	Shoot() {
		let currShot = millis();
		if (currShot - this.lastShot > this.shootThreshold) {
			super.Shoot();
			this.lastShot = currShot;
		}
	}
}

class Robot extends Player {
	constructor(anims, projectileTexture, x = 64, y = 7*64) {
		super(anims, projectileTexture, 3, x, y);

		this.MAXPROJECTILE = 7;
		this.shootThreshold = 150;

		this.InitializeProjectiles();
	}

	InitializeProjectiles() {
		for (let i = 0; i < this.MAXPROJECTILE; i++) {
			this.projectiles.push(new PLaser(this.projectileTexture));
			this.projectiles[i].AddToGroup(this.projectileGroup);

		}
	}
}

class Mage extends Player {
	constructor(anims, projectileTexture, x = 64, y = 7*64) {
		super(anims, projectileTexture, 0, x, y);

		this.MAXPROJECTILE = 5;
		this.shootThreshold = 300;

		this.InitializeProjectiles();

	}

	InitializeProjectiles() {
		for (let i = 0; i < this.MAXPROJECTILE; i++) {
			this.projectiles.push(new PMagic(this.projectileTexture));
			this.projectiles[i].AddToGroup(this.projectileGroup);

		}
	}
}


class Archer extends Player {
	constructor(anims, projectileTexture, x = 64, y = 7*64) {
		super(anims, projectileTexture, 1, x, y);

		this.MAXPROJECTILE = 4;
		this.shootThreshold = 50;

		this.InitializeProjectiles();

	}

	InitializeProjectiles() {
		for (let i = 0; i < this.MAXPROJECTILE; i++) {
			this.projectiles.push(new PArrow(this.projectileTexture));
			this.projectiles[i].AddToGroup(this.projectileGroup);

		}
	}
}




