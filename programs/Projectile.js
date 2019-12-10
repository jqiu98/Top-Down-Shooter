class Projectile {
	constructor(texture) {
		this.damage = 5;
		this.speed = 6;
		this.isActive = false;
		this.life = 40;

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
		this.item.life = this.life;
	}

	SetCollider(x, y, radius) {
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


class PMagic extends Projectile {
	constructor(texture) {
		super(texture);

		this.damage = 30;
		this.speed = 12;
		this.life = 110;
	}

	SetCollider(x, y, radius) {
		this.item.setCollider("circle");
	}
}

class PLaser extends Projectile {
	constructor(texture) {
		super(texture);

		this.damage = 15;
		this.speed = 25;
		this.life = 56;
	}

	SetCollider(x, y, radius) {
		this.item.setCollider("circle", x, y, radius, radius);
	}
}


class PArrow extends Projectile {
	constructor(texture) {
		super(texture);

		this.damage = 8;
		this.speed = 25;
		this.life = 47;
	}

	setCollider(x, y, radius) {
		this.item.setCollider("circle", x, y, radius, radius);
	}
}