// Class for displaying the character class selection scene
class CharacterSelection {
	constructor() {
		this.scale = 0.6; // Variable used to scale down the images 

		// Create sprite for the robot class half body image
		this.robot = createSprite(width * 1/8, height * 3/5);
		this.robot.addImage(robotPic);
		this.robot.scale = this.scale;

		// Create sprite for the mage class half body image
		this.mage = createSprite(width * 3/8, height * 3/5);
		this.mage.addImage(magePic);
		this.mage.scale = this.scale;

		// Create sprite for the archer class half body image
		this.archer = createSprite(width * 5/8, height * 3/5);
		this.archer.addImage(archerPic);
		this.archer.scale = this.scale;			

		// Create sprite for the player demo
		this.character = createSprite(width * 7/8, height * 3/5);
		this.character.scale = 1.1;

		// List of all possible character classes - allows us to index and easily know what the user is hovering & selected
		this.allClasses = [this.robot, this.mage, this.archer];
		this.selClass = 'robot'; // class title for the class hovered
		this.classIndex = 0; // Current index for the class hovered

		// Add all the walking animations for each of the classes into the demo player - DOWN, LEFT, RIGHT, UP
		let allAnims = [robot, mage, archer];
		for (let i = 0; i < 3; i++) {
			this.character.addAnimation(allClassLabels[i] + '_walk_down', allAnimations[i][0]);
			this.character.addAnimation(allClassLabels[i] + '_walk_left', allAnimations[i][1]);
			this.character.addAnimation(allClassLabels[i] + '_walk_right', allAnimations[i][2]);
			this.character.addAnimation(allClassLabels[i] + '_walk_up', allAnimations[i][3]);
		}
	}

	// Call everything needed to make the scene/class function
	Run() {
		this.ProcessInputs();
		this.Display();
	}

	// Function for processing user input
	ProcessInputs() {
		// Based on the designated keys (arrow keys for solo, story mode), it will control the character movement & animation
		let move = PMove["P1"]; // Grab the appropriate keycodes for P1 -> player 1
		if (keyDown(move["LEFT"])) {
			this.character.changeAnimation(this.selClass + '_walk_left');
		}

		else if (keyDown(move["RIGHT"])) {
			this.character.changeAnimation(this.selClass + '_walk_right');
		}

		else if(keyDown(move["UP"])) {
			this.character.changeAnimation(this.selClass + '_walk_up');
		}

		else if (keyDown(move["DOWN"])) {
			this.character.changeAnimation(this.selClass + '_walk_down');
		}

		else { // If player is not moving, restore to front-facing and freeze the animation
			this.character.changeAnimation(this.selClass + '_walk_down');
			this.character.animation.changeFrame(1);
		}

		if (keyWentDown("a")) this.UpdateClassIndex(-1);
		else if (keyWentDown("d")) this.UpdateClassIndex(1);
		else if (keyWentDown(ENTER)) this.classSelect();
	}

	// Change the current hovered character class -> in a horizontally looping manner
	UpdateClassIndex(num) {
		this.classIndex += num;
		if (this.classIndex === this.allClasses.length) this.classIndex = 0;
		else if (this.classIndex === -1) this.classIndex = this.allClasses.length-1;
		this.selClass = allClassLabels[this.classIndex];

		selectEffect.play(0, 0.35, 0.7, 0); // Play the sound effect for changing hover

	}

	// User has pressed enter to select the character class, this gathers the data to figure out which class it is
	classSelect() {
		currentScene = "start"; // Change to the next scene where the game is initialized and started

		
		// Based on the selected class, create the appropriate one for the user to play as
		let classAnim = allAnimations[this.classIndex];
		let classProjectile = allProjectiles[this.classIndex];

		switch (this.selClass) {
			case "robot":
				player = new Robot(classAnim, classProjectile, 0, 0);
				break;
			case "mage":
				player = new Mage(classAnim, classProjectile, 0, 0);
				break;
			case "archer":
				player = new Archer(classAnim, classProjectile, 0, 0);
				break;
		}

		selectEffect.play(0, 0.35, 0.7, 0); // Play effect for selecting a class

	}

	// Draws the background of the scene -> Boxes for the sprites
	DrawBG() {
		let pW = this.scale * 500; // Width of the sprite scaled
		let pH = this.scale * 462; // Height of the sprite scaled

		// Draw the rectangluar background for each character class & player demo
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

	// Draw the scene title & related directions
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

	// Function to draw the demo character & all associatting text such as class title & class character attributes
	DrawClass() {
		let x = this.character.position.x;
		let y = this.character.position.y;
		let pH = this.scale * 462;
		let pW = this.scale * 500;
		let msg = "(Psst..Press the arrow keys!)"
		
		push();
		textSize(16);
		textStyle(BOLD);

		text(msg, x, y-pH/2-20, pW, 16);

		fill('#ff8000');
		let speed, distance, damage;
		switch (this.selClass) { // Gather data for each of the classes
			case "robot":
				speed = "medium";
				distance = "medium";
				damage = "medium";
				break;
			case "mage":
				speed = "slow";
				distance = "long";
				damage = "high";
				break;
			case "archer":
				speed = "fast";
				distance = "short";
				damage = "low";
				break;
		}
		msg =  
					"\t\t\tATK Speed:\t" + speed +
					"\n\t\t\tATK Distance:\t" + distance +
					"\n\t\t\tATK Damage:\t" + damage;
		textAlign(LEFT, TOP);
		textSize(16);
		text(this.selClass.toUpperCase(), x, y, pW-25, pH-25);
		textSize(14);
		text(msg, x, y, pW-25, pH-80);
		fill(0);
		pop();
	}

	// Function to draw cursor to indicate with class is being hovered
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


	// Displays everything needed in the project
	Display() {
		this.DrawBG();
		drawSprite(this.robot);
		drawSprite(this.mage);
		drawSprite(this.archer);

		drawSprite(this.character);
		this.DrawTitle();
		this.DrawClass();

		if(floor(millis() / 500) % 2 === 0) this.DrawSelect();
	}
}