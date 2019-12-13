// Child class Enemy inhertits Entity - AI controlled entity
class Enemy extends Entity {
	constructor(anims, projectileTexture, projRadius, x, y) {
		super(anims, projectileTexture, projRadius, x, y);
		
		this.speed = 4; // Update speed for enemy
		this.entity.damage = 10; // Set damage given upon colliding with players

		this.lastShot = 0;
	}

	// Everything needed to make this class fully functioning
	Run() {
		this.ProcessInputs();
		super.Run();
	}

	// Function for AI movement
	ProcessInputs() {
		this.entity.velocity.mult(0); // Keep the velocity constant

		// AI is attracted to the player position, change sprite animations accordingly
		if (!gameOver) this.entity.attractionPoint(this.speed, player.entity.position.x, player.entity.position.y);

		if (-45 > this.entity.velocity.heading() &&  this.entity.velocity.heading() > -135) this.entity.changeAnimation('walk_up');

		else if (135 > this.entity.velocity.heading() && this.entity.velocity.heading() > 45) this.entity.changeAnimation('walk_down');

		else if (-45 < this.entity.velocity.heading() && this.entity.velocity.heading() < 45) this.entity.changeAnimation('walk_right');

		else  this.entity.changeAnimation('walk_left');
	}

	// Override the parent TrackVelocityRotation function as enemy will not be rotating
	TrackVelocityRotation() {
		this.pVelocity.x = this.entity.velocity.x;
		this.pVelocity.y = this.entity.velocity.y;
		this.pRotation = 0;
	}
}