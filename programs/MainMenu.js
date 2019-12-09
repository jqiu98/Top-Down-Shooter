class MainMenu {
	constructor() {
		this.storyMode = createSprite(width/2, height/4, 200, 50);
		this.storyMode.shapeColor = color(0, 255, 0);

		this.versusMode = createSprite(width/2, height/4 + 100, 200, 50);
		this.versusMode.shapeColor = color(144);

		this.start = false;
		this.options = [this.storyMode, this.versusMode];
		this.select = 0;
	}

	DrawStoryMode() {
		push();
		strokeWeight(6);
		rect(this.storyMode.position.x, this.storyMode.position.y, this.storyMode.width, this.storyMode.height);
		pop();

		drawSprite(this.storyMode);

		push();
		textSize(24);
		textStyle(BOLD);
		text("STORY MODE", this.storyMode.position.x, this.storyMode.position.y, this.storyMode.width, this.storyMode.height);
		pop();
	}

	DrawVersusMode() {
		push();
		strokeWeight(6);
		rect(this.versusMode.position.x, this.versusMode.position.y, this.versusMode.width, this.versusMode.height);
		pop();

		drawSprite(this.versusMode);

		push();
		textSize(24);
		textStyle(BOLD);
		text("VERSUS MODE", this.versusMode.position.x, this.versusMode.position.y, this.versusMode.width, this.versusMode.height);
		pop();
	}

	Run() {
		this.ProcessInputs();
		this.Display();
	}

	ProcessInputs() {
		if (keyWentDown(UP_ARROW)) this.UpdateSelect(1);
		else if (keyWentDown(DOWN_ARROW)) this.UpdateSelect(-1);
		else if (keyWentDown(ENTER)) this.OptionSelect();
	}

	UpdateSelect(num) {
		this.OptionOff(this.options[this.select]);
		this.select += num;
		if (this.select === this.options.length) this.select = 0;
		else if (this.select === -1) this.select = this.options.length -1;
		this.OptionOn(this.options[this.select]);
	}

	OptionOff(option) {
		option.shapeColor = color(144);
	}

	OptionOn(option) {
		option.shapeColor = color(0, 255, 0);
	}

	OptionSelect() {
		switch (this.options[this.select]) {
			case this.storyMode:
				this.start = true;
				currentScene = "selection";
				break;
			case this.versusMode:
				this.start = true;
				currentScene = "versus";
				break;
		}
	}

	Display() {
		this.DrawStoryMode();
		this.DrawVersusMode();
	}
}