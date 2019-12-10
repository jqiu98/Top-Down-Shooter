class MainMenu {
	constructor() {
		this.storyMode = createSprite(width/2, height/3, 200, 50);
		this.storyMode.shapeColor = color(0, 255, 0);

		this.versusMode = createSprite(width/2, height/3 + 100, 200, 50);
		this.versusMode.shapeColor = color(180);

		this.msgDisplay = false;

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
		if (keyWentDown("w")) this.UpdateSelect(1);
		else if (keyWentDown("s")) this.UpdateSelect(-1);
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
		option.shapeColor = color(180);
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
				this.msgDisplay = true;
				break;
		}
	}

	DisplayMessage() {
		if (this.msgDisplay) {
			push();
			fill(255, 0, 0);
			text("Currently unavailable: Check back in the future!",
				this.versusMode.position.x,
				this.versusMode.position.y + this.versusMode.height/2 + 20,
				width,
				50);
			pop();
		}
	}

	DisplayTitle() {
		push();
		textSize(40);
		textStyle(BOLD);
		text("SELECT A MODE", width/2, height/8, width, 40);
		pop();
	}

	Display() {
		this.DrawStoryMode();
		this.DrawVersusMode();
		this.DisplayTitle();
		this.DisplayMessage();
	}
}