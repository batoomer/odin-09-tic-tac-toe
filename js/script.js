const DisplayController = (()=> {
    const startMenu = document.querySelector('.start-menu');
    const startMenuPvpButton = document.querySelector('.start-menu > :nth-child(2)')
    const startMenuPveButton = document.querySelector('.start-menu > :nth-child(3)')
    
    const pvpMenu = document.querySelector('.pvp-menu');
    const pvpMenuBackButton = document.querySelector('.pvp-menu > .nav-buttons :nth-child(1)');
    const pvpMenuStartButton = document.querySelector('.pvp-menu > .nav-buttons :nth-child(2)');

    const pveMenu = document.querySelector('.pve-menu');
    const pveMenuBackButton = document.querySelector('.pve-menu > .nav-buttons :nth-child(1)');
    const pveMenuStartButton = document.querySelector('.pve-menu > .nav-buttons :nth-child(2)');


    const gameMenu = document.querySelector('.game-menu');
    const gameMenuBackButton = document.querySelector('.game-menu > .nav-buttons :nth-child(1)');

    const handleNavigation = (from, to) => {

        from.style.display = 'none';
        to.style.display = 'flex';

    };

    const addStartMenuEventListeners = () => {
        
        startMenuPvpButton.addEventListener('click', () => {
            handleNavigation(startMenu, pvpMenu)
        });
        
        startMenuPveButton.addEventListener('click', () => {
            handleNavigation(startMenu, pveMenu)});
    };

    const addPvpMenuEventListeners = () => {

        pvpMenuBackButton.addEventListener('click', () => {
            handleNavigation(pvpMenu, startMenu);
        });
        
        pvpMenuStartButton.addEventListener('click', () => {
            handleNavigation(pvpMenu, gameMenu);
        });
    };

    const addPveMenuEventListeners = () => {
        
        pveMenuBackButton.addEventListener('click', () => {
            handleNavigation(pveMenu, startMenu);
        });
        
        pveMenuStartButton.addEventListener('click', () => {
            handleNavigation(pveMenu, gameMenu);
        });
        
    };

    const addGameMenuEventListeners = () => {

        gameMenuBackButton.addEventListener('click', () => {
            handleNavigation(gameMenu, startMenu);
        });

    };


    const addNavigationListeners = () => {
        addStartMenuEventListeners();
        addPveMenuEventListeners();
        addPvpMenuEventListeners();
        addGameMenuEventListeners();
    }

    return {
        addNavigationListeners 
    }
})();


DisplayController.addNavigationListeners();