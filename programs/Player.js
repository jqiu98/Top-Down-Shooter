class Player {
	constructor(anims) {
		this.player = createSprite(64, 7*64);
		
		this.player.addAnimation('walk_down', anims[0]);
		this.player.addAnimation('walk_left', anims[1]);
		this.player.addAnimation('walk_right', anims[2]);
		this.player.addAnimation('walk_up', anims[3]);

		this.player.scale = 1.2;

		this.health = 100;
		this.speed = 1;
		this.jump = -18;
		this.doubleJump = true;
	}

	Run() {
		this.ProcessInputs();
		this.Update();
	}

	ProcessInputs() {
		this.player.velocity.x = 0;

		if (keyDown(LEFT_ARROW)) {
			this.player.velocity.x = -5;
			// this.player.mirrorX(-1);
			this.player.changeAnimation('walk_left');
		}

		else if (keyDown(RIGHT_ARROW)) {
			this.player.velocity.x = 5;
			// this.player.mirrorX(1);
			this.player.changeAnimation('walk_right');
		}

		else if(keyDown(UP_ARROW)) {
			this.player.changeAnimation('walk_up');
		}

		else if (keyDown(DOWN_ARROW)) {
			this.player.changeAnimation('walk_down');
		}

		else {
			this.player.animation.changeFrame(1);
		}

		if (keyWentDown(" ")) {
			this.Jump();
		}

	    if(mouseIsPressed) camera.zoom = 0.1;
	    else camera.zoom = 1;
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
		push();
		rectMode(CORNER);
		stroke(0);
		noFill();
		rect(this.player.position.x-32, this.player.position.y-42.5, 64, 4, 30);

		let currHealth = map(this.health, 0, 100, 0, 64);
		fill(255, 0, 0);
		noStroke();
		rect(this.player.position.x-32, this.player.position.y-42.5, currHealth, 4, 30);
	}
}