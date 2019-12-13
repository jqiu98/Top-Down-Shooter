// Child class Player inherits Entity - User controlled entity
class Player extends Entity {
	constructor(anims, projectileTexture, projRadius, x, y) {
		super(anims, projectileTexture, projRadius, x, y); // Call parent constructor

		this.speed = 9; // Update speed for the player
		this.player = "P1"; // Update the title 

		this.lastShot = 0; // time of when player last shot
		this.shootThreshold; // Threshold for fire rate of projectiles
	}

	// Runs everything needed for the clas to fully function
	Run() {
		this.ProcessInputs();
		super.Run(); // Call the parent function AFTER dealing with our own stuff
	}

	// Function for processing user input
	ProcessInputs() {
		this.entity.velocity.mult(0); // Reset the velocity to 0 to keep speed constant and not accelerate
		if (!gameOver) { // Only allow user input if game is currently running
			
			// Based on the designated keys (arrow keys for solo, story mode), it will control the character movement & animation
			let move = PMove[this.player]; // Grab the appropriate key codes based on if it is player1/player2/enemy
			if (keyDown(move["LEFT"])) {
				this.entity.velocity.x = -this.speed;
				this.entity.changeAnimation('walk_left');
			}

			if (keyDown(move["RIGHT"])) {
				this.entity.velocity.x = this.speed;
				this.entity.changeAnimation('walk_right');
			}

			if(keyDown(move["UP"])) {
				this.entity.velocity.y = -this.speed;
				this.entity.changeAnimation('walk_up');
			}

			if (keyDown(move["DOWN"])) {
				this.entity.velocity.y = this.speed;
				if (this.entity.velocity.x === 0) this.entity.changeAnimation('walk_down');
			}

			if (this.entity.velocity.mag() === 0) {
				this.entity.animation.changeFrame(1); // If player is not moving, freeze the animation
			}
			else {
				this.entity.velocity.limit(this.speed); // Limit the movement speed -> basically normalizing * speed
			}

			if (keyDown(SHIFT)) this.Shoot(); // User shoots a projectile
		}
	}

	// User pressed to shoot, this function activates a projectile if available
	Shoot() {
		let currShot = millis();
		if (currShot - this.lastShot > this.shootThreshold) {
			super.Shoot();
			this.lastShot = currShot;
		}
	}
}

/* Child classes of Player used to distinctuate the different
** character classes. Each creates their reslective child class
** projectile and projectile sprite image */

class Robot extends Player {
	constructor(anims, projectileTexture, x, y) {
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
	constructor(anims, projectileTexture,x, y) {
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
	constructor(anims, projectileTexture, x, y) {
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

