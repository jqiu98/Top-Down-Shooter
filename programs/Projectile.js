// Parent class for all projectiles
// It has children robot, mage, and mages

class Projectile {
	constructor(texture) {
		this.speed = 6; // Speed of the projectile
		this.isActive = false; // If the projectile is current active and in use (user press to shoot)
		this.maxLife = 40; // Max life count used for the projectile
		this.life = 0;
		this.velocity = createVector(0,0);

		// Create sprite for the projectile
		this.item = createSprite(3000,3000);
		this.item.addImage(texture);
		this.item.setDefaultCollider();
		this.item.damage = 5; // Damage the projectile give to the player
	}

	// @PUBLIC function to add this projectile to a group
	AddToGroup(group) {
		this.item.addToGroup(group);
	}
	// @PUBLIC function to return the width of the projectile
	GetWidth() {
		return this.item.width;
	}

	// Player has press to shoot & there was a projectile available to use
	// Function updates all required fields to achieve an active projectile
	SetAlive() {
		// Set it active
		this.isActive = true;
		this.item.deactivate = false;
		this.life = this.maxLife;

		// Update velocity to seek.
		this.item.velocity.x = this.velocity.x;
		this.item.velocity.y = this.velocity.y;
		this.item.velocity.setMag(this.speed);
		this.item.rotation = this.item.velocity.heading(); // Making sure the projectile isn't too fast
	}

	// Set collider for this projectile
	SetCollider(x, y, radius) {
		this.item.setCollider("circle", x, y, 3, 3);
	}

	// Update x position for this projectile
	UpdatePosition(x, y) {
		this.item.position.x = x;
		this.item.position.y = y;
	}

	// Update y position for this projectile
	UpdateVelocity(x, y) {
		this.velocity.x = x;
		this.velocity.y = y;
	}

	// Calls everything needed to make this projectile;
	Run() {
		this.TrackLife();
		this.Display();
	}

	// See if we've collided with a non-player (& or player)
	TrackLife() {
		if (this.life-- === 1 || this.item.deactivate) {
			this.isActive = false;
		}
	}

	// Displays everything there is to do in the
	Display() {
		drawSprite(this.item);
	}
}


// Child class for mage shooting magic balls
class PMagic extends Projectile {
	constructor(texture) {
		super(texture);

		// Update the attributes to better balance the classes & make them unique
		this.speed = 12;
		this.maxLife = 110;

		this.item.damage = 30;

	}

	SetCollider(x, y, radius) {
		this.item.setCollider("circle");
	}
}

class PLaser extends Projectile {
	constructor(texture) {
		super(texture);

		this.speed = 25;
		this.maxLife = 56;

		// Update the attributes to better balance the classes & make them unique

		this.item.damage = 15;
	}
 // Find the oset & use it to update our game if not done.
	SetCollider(x, y, radius) {
		this.item.setCollider("circle", x, y, radius+2);
	}
}

class PArrow extends Projectile {
	constructor(texture) {
		super(texture);

		this.speed = 25;
		this.maxLife = 47;
		
		// Update the attributes to better balance the classes & make them unique

		this.item.damage = 8;
	}

	setCollider(x, y, radius) {
		this.item.setCollider("circle", x, y, radius);
	}
}