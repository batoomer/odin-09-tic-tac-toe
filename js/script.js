
const playerFactory = (name) =>{
    let score = 0;
    const getScore = () => {return score};
    
    const updateScore = (value) => {
        score += value;
    } 

    const resetScore = () => {score=0;}

    return {name, getScore, updateScore, resetScore};
};



const optionFactory = (playerX, playerO, gameType, difficulty="easy") => {
    return {playerX, playerO, gameType, difficulty};
};


const DisplayController = (()=> {
    const startMenu = document.querySelector('.start-menu');
    const startMenuPvpButton = document.querySelector('.start-menu > :nth-child(2)')
    const startMenuPveButton = document.querySelector('.start-menu > :nth-child(3)')
    
    const pvpMenu = document.querySelector('.pvp-menu');
    const pvpMenuBackButton = document.querySelector('.pvp-menu > .nav-buttons :nth-child(1)');
    const pvpMenuStartButton = document.querySelector('.pvp-menu > .nav-buttons :nth-child(2)');
    const pvpMenuPlayerXInput = document.querySelector('#player-x');
    const pvpMenuPlayerXName = document.querySelector('.pvp-menu > .options > :nth-child(1) > :first-child > span');
    const pvpMenuPlayerOInput = document.querySelector('#player-o');
    const pvpMenuPlayerOName = document.querySelector('.pvp-menu > .options > :nth-child(1) > :last-child > span');

    const pveMenu = document.querySelector('.pve-menu');
    const pveMenuBackButton = document.querySelector('.pve-menu > .nav-buttons :nth-child(1)');
    const pveMenuStartButton = document.querySelector('.pve-menu > .nav-buttons :nth-child(2)');
    
    const pveMenuEasyButton = document.querySelector('.pve-menu > .options > :nth-child(2) > :nth-child(2) > :nth-child(1)');
    const pveMenuNormalButton = document.querySelector('.pve-menu > .options > :nth-child(2) > :nth-child(2) > :nth-child(2)');
    const pveMenuImpossibleButton = document.querySelector('.pve-menu > .options > :nth-child(2) > :nth-child(2) > :nth-child(3)');



    const gameMenu = document.querySelector('.game-menu');
    const gameMenuBackButton = document.querySelector('.game-menu > .nav-buttons :nth-child(1)');
    const gameMenuRestartButton = document.querySelector('.game-menu > .nav-buttons :nth-child(2)');
    const gameMenuPlayerXName = document.querySelector('.game-menu > .scoreboard > div > :first-child > :nth-child(2)');
    const gameMenuPlayerXScore = document.querySelector('.game-menu > .scoreboard > div > :first-child > :nth-child(3)');
    const gameMenuPlayerOName = document.querySelector('.game-menu > .scoreboard > div > :last-child > :nth-child(2)');
    const gameMenuPlayerOScore = document.querySelector('.game-menu > .scoreboard > div > :last-child > :nth-child(3)');

    let activeDifficultyButton = pveMenuEasyButton;
    let gameOption = {};
    /** Returns the game options */
    const getGameOption = () => {
        return gameOption;
    };

    //


    // =============== START Option Listeners PVP/PVE Menus =========
    /**
     * Displays the input of the Input Element to a given Output Element.
     * @param {Element} displayElement Element to display the value to
     * @param {Element} inputElement input element to get the value from
     */
    const handleNameInput = (displayElement, inputElement) => {
        displayElement.textContent = inputElement.value.trim();
    };

    /**
     * Adds the Option Listeners for the PVP Menu. (Name Inputs)
     */
    const addPvpMenuOptionListeners = () => {
        // PlayerX Name
        pvpMenuPlayerXInput.addEventListener('input', () => {
            handleNameInput(pvpMenuPlayerXName, pvpMenuPlayerXInput);
        });

        // PlayerO Name
        pvpMenuPlayerOInput.addEventListener('input', () => {
            handleNameInput(pvpMenuPlayerOName, pvpMenuPlayerOInput);
        });
    };

    /**
     * Toogles the active class on the selected difficulty button
     * and sets the activeDifficultyButton to the clicked difficulty button
     * @param {Event} e 
     */
    const handleDifficulty = (e) => {
        activeDifficultyButton.classList.remove('active-difficulty');

        e.target.classList.add('active-difficulty');
        activeDifficultyButton = e.target;
    };

    /**
     * Adds the Option Listeners for the PVE Menu. (Difficulty Buttons)
     */
    const addPveMenuOptionListeners = () => {
       
        // Easy Button
        pveMenuEasyButton.addEventListener('click', (e) => {
            handleDifficulty(e);
        });
        
        // Normal Button
        pveMenuNormalButton.addEventListener('click', (e) => {
            handleDifficulty(e);
        });

        // Impossible Button
        pveMenuImpossibleButton.addEventListener('click', (e) => {
            handleDifficulty(e);
        });
    };


    const addOptionListeners = () => {
        addPvpMenuOptionListeners();
        addPveMenuOptionListeners();
    }
    // =============== END Option Listeners PVP/PVE Menus =========




    // =============== START Navigation Between Menus ==============
    // TODO: - ON NAVIGATION CLEAR PVP/PVE Settings on Display
    // TODO: - ON NAVIGATION SET GAME MENU OPTIONS
    /**
     * Changes the menu to display on the screen by changing the display attribute.
     * @param {Element} from menu Element to navigate from
     * @param {Element} to menu Element to navigate to
     */
    const handleNavigation = (from, to) => {
        from.style.display = 'none';
        to.style.display = 'flex';
    };

    /**
     * Generates the options for the game.
     * @param {String} menuType the type of the menu, should be pvp or pve
     * @returns object containing options for the game
     */
    const generateOptions = (menuType) => {
        if (menuType === 'pvp'){
            const playerX = playerFactory(pvpMenuPlayerXName.firstChild.nodeValue.trim());
            const playerO = playerFactory(pvpMenuPlayerOName.firstChild.nodeValue.trim());
            const gameType = 'pvp';
            return optionFactory(playerX, playerO, gameType);
        } else if (menuType === 'pve'){
            const playerX = playerFactory('Player');
            const playerO = playerFactory('Robot');
            const gameType = 'pve';
            const difficulty = activeDifficultyButton.dataset['difficulty'];
            return optionFactory(playerX, playerO, gameType, difficulty);
        } else {
            throw new Error('Unknown game menu');
        }

    };

    /** Updates Game Menu Player Names */
    const updateGameMenuNames = () => {
        gameMenuPlayerXName.textContent = gameOption.playerX.name;
        gameMenuPlayerOName.textContent = gameOption.playerO.name;
    };

    /** Updates Game Menu Player Scores */
    const updateGameMenuScores = () => {
        gameMenuPlayerXScore.textContent = gameOption.playerX.getScore();
        gameMenuPlayerOScore.textContent = gameOption.playerO.getScore();
    }

    /**
     * Adds the event listeners for the Start Menu Navigation Buttons.
     * NOTE: The Start Menu Navigation buttons are implemented with divs not buttons
     */
    const addStartMenuNavigationListeners = () => {
        // PVP Button
        startMenuPvpButton.addEventListener('click', () => {
            handleNavigation(startMenu, pvpMenu)
        });
        // PVE Button
        startMenuPveButton.addEventListener('click', () => {
            handleNavigation(startMenu, pveMenu)});
    };

    /**
     * Adds the event listeners for the PVP Menu Navigation Buttons.
     */
    const addPvpMenuNavigationListeners = () => {
        //pvp back button
        pvpMenuBackButton.addEventListener('click', () => {
            handleNavigation(pvpMenu, startMenu);
        });
        //pvp start button
        pvpMenuStartButton.addEventListener('click', () => {
            handleNavigation(pvpMenu, gameMenu);
            gameOption = generateOptions('pvp');
            updateGameMenuNames();
            updateGameMenuScores();
        });
    };

    /**
     * Adds the event listeners for the PVE Menu Navigation Buttons.
     */
    const addPveMenuNavigationListeners = () => {
        //pve back button
        pveMenuBackButton.addEventListener('click', () => {
            handleNavigation(pveMenu, startMenu);
        });
        //pve start button
        pveMenuStartButton.addEventListener('click', () => {
            handleNavigation(pveMenu, gameMenu);
            gameOption = generateOptions('pve');
            updateGameMenuNames();
            updateGameMenuScores();
        });
        
    };

    /**
     * Adds the event listeners for the Game Menu Navigation Buttons.
     */
    const addGameMenuNavigationListeners = () => {
        //game back button
        gameMenuBackButton.addEventListener('click', () => {
            handleNavigation(gameMenu, startMenu);
        });

        //TODO IMPLEMENT LOGIC
        gameMenuRestartButton.addEventListener('click', () => {

        });

    };


    /**
     * Adds the event listeners for Navigating between the menus.
     */
    const addNavigationListeners = () => {
        addStartMenuNavigationListeners();
        addPveMenuNavigationListeners();
        addPvpMenuNavigationListeners();
        addGameMenuNavigationListeners();
    }
    // =============== END Navigation Between Menus ==============


    return {
        addNavigationListeners,
        addOptionListeners
    }
})();


DisplayController.addNavigationListeners();
DisplayController.addOptionListeners();
