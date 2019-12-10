class Projectile {
	constructor(texture) {
		this.speed = 6;
		this.isActive = false;
		this.maxLife = 40;
		this.life = 0;
		this.velocity = createVector(0,0);

		/* @private */
		this.item = createSprite(3000,3000);
		this.item.addImage(texture);
		this.item.setDefaultCollider();
		this.item.damage = 5;
	}

	AddToGroup(group) {
		this.item.addToGroup(group);
	}

	GetWidth() {
		return this.item.width;
	}

	SetAlive() {
		this.isActive = true;
		this.item.deactivate = false;
		this.life = this.maxLife;

		this.item.velocity.x = this.velocity.x;
		this.item.velocity.y = this.velocity.y;
		this.item.velocity.setMag(this.speed);
		this.item.rotation = this.item.velocity.heading();
	}

	SetCollider(x, y, radius) {
		this.item.setCollider("circle", x, y, 3, 3);
	}

	UpdatePosition(x, y) {
		this.item.position.x = x;
		this.item.position.y = y;
	}

	UpdateVelocity(x, y) {
		this.velocity.x = x;
		this.velocity.y = y;
	}

	Run() {
		this.TrackLife();
		this.Display();
	}

	TrackLife() {
		if (this.life-- === 1 || this.item.deactivate) {
			this.isActive = false;
		}
	}

	Display() {
		drawSprite(this.item);
	}
}


class PMagic extends Projectile {
	constructor(texture) {
		super(texture);

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

		this.item.damage = 15;
	}

	SetCollider(x, y, radius) {
		this.item.setCollider("circle", x, y, radius+2);
	}
}


class PArrow extends Projectile {
	constructor(texture) {
		super(texture);

		this.speed = 25;
		this.maxLife = 47;

		this.item.damage = 8;
	}

	setCollider(x, y, radius) {
		this.item.setCollider("circle", x, y, radius);
	}
}