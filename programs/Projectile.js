class Projectile {
	constructor(texture) {
		this.damage = 5;
		this.speed = 6;
		this.isActive = false;
		this.life = 40;
		this.velocity = createVector(0,0);

		/* @private */
		this.item = createSprite(3000,3000);
		this.item.addImage(texture);
		this.item.setDefaultCollider();
	}

	AddToGroup(group) {
		this.item.addToGroup(group);
	}

	// ResetLife() {
	// 	this.item.life = -1;
	// }

	GetLife() {
		return this.item.life;
	}

	GetWidth() {
		return this.item.width;
	}

	SetAlive() {
		this.isActive = true;
		this.item.life = this.life;
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
		if (this.item.life < 2 && this.isActive) {
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
		this.item.setCollider("circle", x, y, radius+2);
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
		this.item.setCollider("circle", x, y, radius);
	}
}