class CharacterSelection {
	constructor() {
		this.scale = 0.6;

		this.warrior = createSprite(width * 1/8, height * 3/5);
		this.warrior.addImage(warriorPic);
		this.warrior.scale = this.scale;

		this.mage = createSprite(width * 3/8, height * 3/5);
		this.mage.addImage(magePic);
		this.mage.scale = this.scale;

		this.archer = createSprite(width * 5/8, height * 3/5);
		this.archer.addImage(archerPic);
		this.archer.scale = this.scale;			

		this.character = createSprite(width * 7/8, height * 3/5);
		this.character.scale = 1.1;


		this.allClasses = [this.warrior, this.mage, this.archer];
		this.selClass = 'warrior';
		this.classIndex = 0;

		let allAnims = [warrior, mage, archer];

		for (let i = 0; i < 3; i++) {
			this.character.addAnimation(allClassLabels[i] + '_walk_down', allAnimations[i][0]);
			this.character.addAnimation(allClassLabels[i] + '_walk_left', allAnimations[i][1]);
			this.character.addAnimation(allClassLabels[i] + '_walk_right', allAnimations[i][2]);
			this.character.addAnimation(allClassLabels[i] + '_walk_up', allAnimations[i][3]);
		}
	}

	Run() {
		this.ProcessInputs();
		this.Display();
	}

	ProcessInputs() {
		if (keyDown(LEFT_ARROW)) {
			this.character.changeAnimation(this.selClass + '_walk_left');
		}

		else if (keyDown(RIGHT_ARROW)) {
			this.character.changeAnimation(this.selClass + '_walk_right');
		}

		else if(keyDown(UP_ARROW)) {
			this.character.changeAnimation(this.selClass + '_walk_up');
		}

		else if (keyDown(DOWN_ARROW)) {
			this.character.changeAnimation(this.selClass + '_walk_down');
		}

		else {
			this.character.changeAnimation(this.selClass + '_walk_down');
			this.character.animation.changeFrame(1);
		}

		if (keyWentDown("a")) this.UpdateClassIndex(-1);
		else if (keyWentDown("d")) this.UpdateClassIndex(1);
		else if (keyWentDown(ENTER)) this.classSelect();
	}

	UpdateClassIndex(num) {
		this.classIndex += num;
		if (this.classIndex === this.allClasses.length) this.classIndex = 0;
		else if (this.classIndex === -1) this.classIndex = this.allClasses.length-1;
		this.selClass = allClassLabels[this.classIndex];
	}

	classSelect() {
		currentScene = "start";
		selectedClassLabel = this.selClass;
		selectedClassAnim = allAnimations[this.classIndex];
	}

	DrawBG() {
		let pW = this.scale * 500;
		let pH = this.scale * 462;

		push();
		strokeWeight(6.5);

		fill(255, 0 ,0);
		rect(width * 1/8, height * 3/5, pW, pH);

		fill(0, 0, 255);
		rect(width * 3/8, height * 3/5, pW, pH);

		fill(0, 255, 0);
		rect(width * 5/8, height * 3/5, pW, pH);

		fill(220);
		rect(width * 7/8, height * 3/5, pW, pH);
		pop();
	}

	DrawTitle() {
		push();
		textSize(40);
		textStyle(BOLD);
		text("SELECT YOUR CLASS", width/2, height/8, width, 40);

		textSize(20);
		textStyle(NORMAL);
		text("Use a & d to pick", width/2, height/8 + 40, width, 20);
		text("Press ENTER to select", width/2, height/8 + 65, width, 20);
		pop();
	}

	DrawClass() {

		let x = this.character.position.x;
		let y = this.character.position.y;
		let h = this.scale * 462 / 2;
		let w = this.scale * 500;
		let msg = "(Psst..Press the arrow keys!)"

		push();
		textSize(16);
		textStyle(BOLD);

		text(msg, x, y-h-20, w, 16);

		fill('#ff8000');
		text(this.selClass, x, y - 50, textWidth(this.selClass), 16);

		fill(0);
		pop();
	}

	DrawSelect() {
		let x = this.allClasses[this.classIndex].position.x;
		let y = this.allClasses[this.classIndex].position.y;
		let h = this.scale * 462 / 2;

		push();
		fill("#ff8000");
		strokeWeight(2.5);
		triangle(x, y-h-20, x-35, y-h-55, x+35, y-h-55);

		textStyle(BOLD);
		textSize(20);
		text("SELECT", x+5, y-h-62.5, 70, 20);
		pop();
	}


	Display() {
		this.DrawBG();
		drawSprite(this.warrior);
		drawSprite(this.mage);
		drawSprite(this.archer);

		drawSprite(this.character);
		this.DrawTitle();
		this.DrawClass();

		if(floor(millis() / 500) % 2 === 0) this.DrawSelect();
	}
}