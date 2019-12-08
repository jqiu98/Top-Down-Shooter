class MainMenu {
	constructor() {
		this.storyMode = createSprite(width/2, height/4, 200, 50);
		this.versusMode = createSprite(width/2, height/4 + 100, 200, 50);
		this.start = false;
		this.mode = null;
		this.InitializeStoryMode();
		this.InitializeVersusMode();

	}

	InitializeStoryMode() {
		this.storyMode.setDefaultCollider();
		this.storyMode.shapeColor = color(255, 0, 0);

		this.storyMode.onMouseOver = function() {
			this.shapeColor = color(0, 255, 0);
		}

		this.storyMode.onMouseOut = function() {
			this.shapeColor = color(255, 0, 0);
		}
		
		this.storyMode.onMousePressed = () => {
			this.start = true;
			this.mode = "story";
		}
	}

	InitializeVersusMode() {
		this.versusMode.setDefaultCollider();
		this.versusMode.shapeColor = color(255, 0, 0);

		this.versusMode.onMouseOver = function() {
			this.shapeColor = color(0, 255, 0);
		}

		this.versusMode.onMouseOut = function() {
			this.shapeColor = color(255, 0, 0);
		}
		
		this.versusMode.onMousePressed = () => {
			this.start = true;
			this.mode = "versus";
		}
	}

	DrawStoryMode() {
		drawSprite(this.storyMode);
		push();
		rectMode(CENTER);
		textAlign(CENTER, CENTER);
		textSize(24);
		textStyle(BOLD);
		text("STORY MODE", this.storyMode.position.x, this.storyMode.position.y, this.storyMode.width, this.storyMode.height);
		pop();
	}

	DrawVersusMode() {
		drawSprite(this.versusMode);
		push();
		rectMode(CENTER);
		textAlign(CENTER, CENTER);
		textSize(24);
		textStyle(BOLD);
		text("VERSUS MODE", this.versusMode.position.x, this.versusMode.position.y, this.versusMode.width, this.versusMode.height);
		pop();
	}

	Display() {
		this.DrawStoryMode();
		this.DrawVersusMode();
	}
}