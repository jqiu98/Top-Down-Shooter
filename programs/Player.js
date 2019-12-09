let pInst = this;

class Player {
	constructor(anims) {
		this.player = createSprite(64, 7*64);
		
		this.player.addAnimation('walk_down', anims[0]);
		this.player.addAnimation('walk_left', anims[1]);
		this.player.addAnimation('walk_right', anims[2]);
		this.player.addAnimation('walk_up', anims[3]);

		this.player.scale = 1.2;

		this.player.collider = this.player.getBoundingBox();

		this.health = 100;
		this.speed = 1;
		// this.jump = -18;
		// this.doubleJump = true;
	}

	Run() {
		this.ProcessInputs();
		this.Update();
		this.Display();
	}

	ProcessInputs() {
		this.player.velocity.x = 0;
		this.player.velocity.y = 0;


		if (keyDown(LEFT_ARROW)) {
			this.player.velocity.x = -5;
			this.player.changeAnimation('walk_left');
		}

		if (keyDown(RIGHT_ARROW)) {
			this.player.velocity.x = 5;
			this.player.changeAnimation('walk_right');
		}

		if(keyDown(UP_ARROW)) {
			this.player.velocity.y = -5;
			this.player.changeAnimation('walk_up');
		}

		if (keyDown(DOWN_ARROW)) {
			this.player.velocity.y = 5;
			if (this.player.velocity.x === 0) this.player.changeAnimation('walk_down');
		}

		if (this.player.velocity.mag() === 0) {
			this.player.animation.changeFrame(1);
		}
		else {
			this.player.velocity.limit(5);
		}

	    if(mouseIsPressed) camera.zoom = 0.1;
	    else camera.zoom = 1;
	}


	// Jump() {
	// 	if (this.player.touching.bottom) this.player.velocity.y = this.jump;
	// 	else if (this.doubleJump) {
	// 		this.player.velocity.y = this.jump;
	// 		this.doubleJump = false;
	// 	}
	// }

	Update() {
		if (this.player.velocity.x !== 0 && this.player.velocity.y !== 0) {
			this.player.rotation = -abs(this.player.velocity.heading()) + 90;
		}
		else {
			this.player.rotation = 0;
		}
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