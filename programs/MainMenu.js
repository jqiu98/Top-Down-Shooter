// Class for displaying the main menu
class MainMenu {
	constructor() {
		 // Button selector for story mode -> implemented mode
		this.storyMode = createSprite(width/2, height/3, 200, 50);
		this.storyMode.shapeColor = color(0, 255, 0);

		// Button selector for versus mode -> mode not implemented (Refractored for future improvement)
		this.versusMode = createSprite(width/2, height/3 + 100, 200, 50);
		this.versusMode.shapeColor = color(180);

		this.msgDisplay = false; // Boolean to display message that versus mode is not available

		// List of all modes available - allows us to index and easily know what the user is hovering & selected
		this.options = [this.storyMode, this.versusMode];
		this.select = 0; // Current index for mode being hovered
	}

	// Display the sprite button & text for story mode
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

	// Display the sprite button & text for versus mode
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

	// Function called in main that fully automates the MainMenu scene
	Run() {
		this.ProcessInputs();
		this.Display();
	}

	// Function for processing user key inputs
	ProcessInputs() {
		if (keyWentDown("w")) this.UpdateSelect(1); // Rotate through modes
		else if (keyWentDown("s")) this.UpdateSelect(-1); // Rotate through modes
		else if (keyWentDown(ENTER)) this.OptionSelect(); // Select current mode to proceed with in the next scene
	}

	 // Change the current hovered mode -> in a vertical looping manner
	UpdateSelect(num) {
		this.OptionOff(this.options[this.select]);
		this.select += num;
		if (this.select === this.options.length) this.select = 0;
		else if (this.select === -1) this.select = this.options.length -1;
		this.OptionOn(this.options[this.select]);

		selectEffect.play(0, 0.35, 0.7, 0); // Play sound effect for changing hovered mode

	}

	// Change color to show the mode is currently not being hovered
	OptionOff(option) {
		option.shapeColor = color(180);
	}
	
 	// Change color to show this mode is currently being hovered
	OptionOn(option) {
		option.shapeColor = color(0, 255, 0);
	}

	// User has pressed enter to select the mode, this gathers the data to figure out which mode it is
	OptionSelect() {
		switch (this.options[this.select]) {
			case this.storyMode:
				this.start = true;
				currentScene = "selection"; // Change to the next scene called for character class selection
				break;
			case this.versusMode: // Currently not implemented
				this.msgDisplay = true; // Turn boolean true to display the unavailable message
				break;
		}
		selectEffect.play(0, 0.35, 0.7, 0); // Play effect for selecting

	}

	DisplayMessage() { // Displays the versus mode unavailable message
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

	// Draws the title of the scene
	DisplayTitle() {
		push();
		textSize(40);
		textStyle(BOLD);
		text("SELECT A MODE", width/2, height/8, width, 40);
		pop();
	}

	// Display everything needed for the menu scene
	Display() {
		this.DrawStoryMode();
		this.DrawVersusMode();
		this.DisplayTitle();
		this.DisplayMessage();
	}
}