// Parent class for when ammomodating 
// It has children robot, mage, and mages
class Entity {
	constructor(anims, projectileTexture, projRadius, x, y) {
		// Create sprite for general entity -> player or enemy
		this.entity = createSprite(x, y);
		this.player = "enemy" // Set created to be an enemy
		
		// Add their repsective animations from the list
		this.entity.addAnimation('walk_down', anims[0]);
		this.entity.addAnimation('walk_left', anims[1]);
		this.entity.addAnimation('walk_right', anims[2]);
		this.entity.addAnimation('walk_up', anims[3]);

		// Scale the entity up
		this.entity.scale = 1.2;

		this.entity.collider = this.entity.getBoundingBox();

		this.entity.health = 100; // Health of the entity

		/* Keeping additional track of the velocity aside from sprite.velocity
		** Because the sprite.velocity must be reset to 0 each draw to keep speed cosntant
		** We need a way to figure out direction the player should be facing and select
		** the correct animation to use */
		this.pVelocity = createVector(0,5);
		this.pRotation = 0;

		this.projectileTexture = projectileTexture; // Texture for the projectile used - based on selected class
		this.projectiles = []; // Array to keep track of the projectiles -> used so we can index
		this.projectileGroup = new Group(); // Group for the projectiles
		this.projectileIndex = 0; // Index for the array to keep track of the current bullet to activate
		this.MAXPROJECTILE = 3; // Max number of projectiles an entity can use
		
		/* Because projectiles need to be rotated and P5 Play only uses non-rotated 
		** hit boxes, it becomes ugly if we don't create a custom hitbox. A circular
		** hit box is used that's attached the the tip of the projectiles to allow
		** the most accurate collision detection */
		this.projRadius = projRadius;
	}

	// Runs everything needed for this class to fully function
	Run() {
		this.Update();
		this.Display();
	}

	// Player has pressed to shoot (currently only player shoots and would be calling this function
	Shoot() {
		// Loop through all the projectile indexes for the player, active the next available one
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
		this.projectileIndex = (this.projectileIndex + 1) % this.MAXPROJECTILE;

	}

	// Converts a circle in polar coordinates into cartesian coordinates and calculate the position for the
	// projectile to be at
	GetAimPosition(projHalfWidth) {
		// Upper portion is used for projectile location
		let radius = this.entity.width / 2 + 7.5;
		let angle = this.pVelocity.heading();
		let aim = createVector(radius * cos(angle), radius * sin(angle))

		if (projHalfWidth === 0) return aim;
		
		// Lower portion is used for hitbox location
		let newRadius = radius + projHalfWidth;
		let offset = createVector(newRadius * cos(angle), newRadius * sin(angle));

		offset.sub(aim);

		return [aim, offset];

	}

	// Tracks the current velocity and compares it with the last velocity
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

	// Update any attributes such as velocity & rotation as needed
	Update() {
		this.TrackVelocityRotation();
		this.entity.rotation = this.pRotation;
	}

	// Displays the aim indicator that lets the user know where the entity is currently face - as where the projectiles
	// will be shot from
	DisplayAim() {
		let aim = this.GetAimPosition(0);

		push();
		fill("#ff8000");
		ellipse(this.entity.position.x + aim.x, this.entity.position.y + aim.y, 7);
		pop();
	}

	// Display all the currently active projectiles shot by this entity
	DisplayProjectiles() {
		for (let aProjectile of this.projectiles) {
			if (aProjectile.isActive) {
				aProjectile.Run();
			}
		}
	}

	// Displays the current health of the entity as a health bar above their head
	DisplayHealth() {
		push();
		rectMode(CORNER);
		stroke(0);
		noFill();
		rect(this.entity.position.x-32, this.entity.position.y-42.5, 64, 4, 30);

		let currHealth = map(this.entity.health, 0, 100, 0, 64); // Map the health bar position relative to the sprite width
		if (currHealth < 0) currHealth = 0;
		fill(0, 255, 0);
		noStroke();
		rect(this.entity.position.x-32, this.entity.position.y-42.5, currHealth, 4, 30);
		pop();
	}


	// Displays everything needed
	Display() {
		if (!this.entity.removed) {
			drawSprite(this.entity);
			this.DisplayAim();
			this.DisplayProjectiles();
			this.DisplayHealth();
		}
	}
}