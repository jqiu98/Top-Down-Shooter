class Projectile {
	constructor(texture) {
		this.damage = 5;
		this.speed = 10;
		this.isActive = false;

		/* @private */
		this.item = createSprite(0,0);
		this.item.addImage(texture);
		this.item.debug = true;
	}

	getWidth() {
		return this.item.width;
	}

	SetAlive() {
		this.isActive = true;
		this.item.life = 40;
	}

	SetCollider(x, y) {
		this.item.setCollider("circle", x, y, 3, 3);
	}

	UpdatePosition(x, y) {
		this.item.position.x = x;
		this.item.position.y = y;
	}

	UpdateVelocity(x, y) {
		this.item.velocity.x = x;
		this.item.velocity.y = y;
		this.item.velocity.setMag(this.speed);
		this.item.rotation = this.item.velocity.heading();
	}


	Run() {
		this.TrackLife();
		this.Display();
	}

	TrackLife() {
		if (this.item.life === 1) {
			this.isActive = false;
			this.item.life = -1;
		}
	}

	Display() {
		drawSprite(this.item);
	}
}