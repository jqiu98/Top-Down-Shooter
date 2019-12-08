class Player {
	constructor() {
		this.player = createSprite(64, 7*64);
		this.player.addImage('standing', playerTexture);
		this.player.addAnimation('walking', 'assets/ghost_walk0001.png', 'assets/ghost_walk0004.png');
		this.player.scale = 0.50;

		this.health = 100;
		this.speed = 1;
		this.jump = -18;
		this.doubleJump = true;
	}

	Run() {
		this.ProcessInput();
		this.Update();
	}

	ProcessInput() {
		this.player.velocity.x = 0;
		this.player.changeAnimation('standing');

		if (keyIsDown(LEFT_ARROW)) {
			this.player.velocity.x = -5;
			this.player.mirrorX(-1);
			this.player.changeAnimation('walking');
		}

		if (keyIsDown(RIGHT_ARROW)) {
			this.player.velocity.x = 5;
			this.player.mirrorX(1);
			this.player.changeAnimation('walking');
		}
	}

	Jump() {
		if (this.player.touching.bottom) this.player.velocity.y = this.jump;
		else if (this.doubleJump) {
			this.player.velocity.y = this.jump;
			this.doubleJump = false;
		}
	}

	Update() {
		this.player.velocity.y += GRAVITY;
		if (this.player.touching.bottom) this.doubleJump = true;
	}

	Display() {
		drawSprite(this.player);
		stroke(0);
		rect(this.player.position.x-32, this.player.position.y-42.5, 64, 4, 30);

		let currHealth = map(this.health, 0, 100, 0, 64);
		fill(255, 0, 0);
		noStroke();
		rect(this.player.position.x-32, this.player.position.y-42.5, currHealth, 4, 30);
	}
}