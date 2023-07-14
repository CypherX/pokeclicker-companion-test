(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "name": "pokeclicker",
  "version": "0.10.12",
  "description": "PokéClicker repository",
  "main": "index.js",
  "scripts": {
    "start": "cross-env NODE_ENV=development gulp",
    "test": "npm run ts-test && npm run eslint && npm run stylelint && npm run vitest",
    "ts-test": "gulp scripts",
    "vitest": "vitest --run",
    "eslint": "eslint --ext ts ./src/scripts ./src/modules",
    "eslint-fix": "eslint --ext ts --fix ./src/scripts ./src/modules",
    "stylelint": "stylelint \"./src/**/*.less\" --cache",
    "stylelint-fix": "npm run stylelint -- --fix",
    "website": "npm run tl:update && npm test && cross-env NODE_ENV=production gulp website",
    "publish": "npm test && node publish.js",
    "tl:init": "git submodule update --init",
    "tl:update": "git submodule update --remote",
    "clean": "npm ci && npm run tl:init"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/pokeclicker/pokeclicker.git"
  },
  "babel": {
    "presets": [
      "env"
    ]
  },
  "author": "RedSparr0w",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/pokeclicker/pokeclicker/issues"
  },
  "homepage": "https://github.com/pokeclicker/pokeclicker#readme",
  "devDependencies": {
    "@types/bootstrap": "^4.3.1",
    "@types/bootstrap-notify": "^3.1.34",
    "@types/gtag.js": "0.0.4",
    "@types/intro.js": "^2.4.7",
    "@types/jquery": "^3.5.16",
    "@types/knockout": "^3.4.66",
    "@types/sortablejs": "^1.10.5",
    "@typescript-eslint/eslint-plugin": "^5.50.0",
    "@typescript-eslint/parser": "^5.50.0",
    "@vitest/coverage-c8": "^0.29.8",
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0",
    "babel-register": "^6.26.0",
    "bootstrap-notify": "^3.1.3",
    "browser-sync": "^2.28.3",
    "cross-env": "^7.0.2",
    "del": "^5.1.0",
    "es6-promise": "^4.2.8",
    "eslint-config-airbnb-typescript": "^17.0.0",
    "eslint-plugin-import": "^2.22.1",
    "gh-pages": "^4.0.0",
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^7.0.1",
    "gulp-changed": "^4.0.2",
    "gulp-clean": "^0.4.0",
    "gulp-concat": "^2.6.0",
    "gulp-connect": "^5.7.0",
    "gulp-ejs": "^5.1.0",
    "gulp-file-include": "^2.2.2",
    "gulp-filter": "^6.0.0",
    "gulp-html-import": "^0.0.2",
    "gulp-less": "^4.0.1",
    "gulp-minify-css": "^1.2.1",
    "gulp-minify-html": "^1.0.4",
    "gulp-plumber": "^1.2.1",
    "gulp-rename": "^2.0.0",
    "gulp-replace": "^1.0.0",
    "gulp-size": "^3.0.0",
    "gulp-sourcemaps": "^2.6.5",
    "gulp-stream-to-promise": "^0.1.0",
    "gulp-strip-debug": "^3.0.0",
    "gulp-typescript": "^5.0.1",
    "gulp-util": "^3.0.7",
    "husky": "^4.3.8",
    "natives": "^1.1.6",
    "postcss-less": "^6.0.0",
    "stylelint": "^15.4.0",
    "stylelint-config-standard-less": "^1.0.0",
    "ts-loader": "^8.0.4",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.5",
    "vitest": "^0.29.8",
    "webpack": "^5.76.0",
    "webpack-cli": "^5.0.1",
    "webpack-stream": "^6.1.0"
  },
  "dependencies": {
    "bootstrap": "^4.5.3",
    "eslint": "^7.4.0",
    "i18next": "^21.9.2",
    "i18next-browser-languagedetector": "^6.1.5",
    "i18next-chained-backend": "^3.1.0",
    "i18next-http-backend": "^1.4.4",
    "intro.js": "^2.9.3",
    "jquery": "^3.5.1",
    "knockout": "^3.5.1",
    "popper.js": "^1.16.0",
    "sortablejs": "^1.10.2"
  }
}

},{}],2:[function(require,module,exports){
const saveData = ko.observable(undefined);
const showRequiredOnly = ko.observable(false);
const showAllRegions = ko.observable(false);

const partyList = ko.pureComputed(() => {
    if (!saveData()) {
        return {};
    }

    const party = saveData().save.party.caughtPokemon;
    return party.reduce((_map, p) => {
        const partyPokemon = PokemonFactory.generatePartyPokemon(p.id);
        partyPokemon.fromJSON(p);
        _map[p.id] = partyPokemon;
        return _map;
    }, {});
});

const pokemonStatTableSearch = ko.observable('');
const pokemonStatTableFilter = ko.observable('none');

//const pokemonStatTableSort = ko.observable('name');
//const pokemonStatTableSortDir = ko.observable('desc');

const loadFile = (file) => {
    fr.readAsText(file);
};

const loadSaveData = () => {
    const saveFile = JSON.parse(atob(fr.result));
    player.highestRegion(saveFile.player.highestRegion);
    App.game.challenges.list.slowEVs.active(saveFile.save.challenges.list.slowEVs);

    saveData(saveFile);
};

const fr = new FileReader();
fr.addEventListener('load', loadSaveData);

const isSaveLoaded = ko.pureComputed(() => {
    return saveData() !== undefined;
});

const hideFromPokemonStatsTable = (partyPokemon) => {
    return ko.pureComputed(() => {
        const searchVal = pokemonStatTableSearch();
        if (searchVal) {
            if (!partyPokemon.id.toString().includes(searchVal)
                && !partyPokemon.name.toLowerCase().includes(searchVal)) {
                return true;
            }
        }

        const filterVal = pokemonStatTableFilter();
        if (filterVal) {
            switch (filterVal) {
                case 'not-shiny':
                    if (partyPokemon.shiny) {
                        return true;
                    }
                    break;
                case 'not-resistant':
                    if (partyPokemon.pokerus === GameConstants.Pokerus.Resistant) {
                        return true;
                    }
                    break;
                case 'not-resistant-evable':

                    break;
                case 'resistant':
                    if (partyPokemon.pokerus !== GameConstants.Pokerus.Resistant) {
                        return true;
                    }
                    break;
            }
        }

        return false;
    });
};

const getPokemonStatsTableCount = ko.pureComputed(() => {
    return Object.values(partyList()).reduce((sum, p) => !hideFromPokemonStatsTable(p)() ? sum + 1 : sum, 0);
});

const isEventDiscordClientPokemon = (pokemonName) => {
    return Companion.data.EventDiscordClientPokemon.includes(pokemonName);
};

const getPokeballImage = (partyPokemon) => {
    return `/pokeclicker/docs/assets/images/pokeball/Pokeball${partyPokemon.shiny ? '-shiny' : ''}.svg`;
};

const getPokerusImage = (partyPokemon) => {
    return `/pokeclicker/docs/assets/images/breeding/pokerus/${GameConstants.Pokerus[partyPokemon.pokerus]}.png`;
};

const getDungeonList = () => {
    const dungeonList = [];
    const dungeonOverrides = Companion.data.DungeonListOverride.map(d => d.dungeons).flat();

    GameConstants.RegionDungeons.forEach((rd, idx) => {
        dungeonList.push({
            region: idx,
            dungeons: rd.filter(d => !dungeonOverrides.includes(d))
        });
    });

    Companion.data.DungeonListOverride.forEach((rd) => dungeonList.push({...rd}));
    return dungeonList.sort((a, b) => a.region - b.region);
};

const getDungeonClearCount = (dungeon) => {
    if (!saveData()) {
        return 0;
    }

    const dungeonIndex = GameConstants.getDungeonIndex(dungeon);
    return saveData().save.statistics.dungeonsCleared[dungeonIndex] || 0;
};

const getGymList = () => {
    const gymList = [];

    GameConstants.RegionGyms.forEach((gyms, region) => {
        if (region > GameConstants.MAX_AVAILABLE_REGION) {
            return;
        }

        if (region == GameConstants.Region.alola) {
            gyms = gyms.filter(g => !g.endsWith(' Trial'));
        }

        gymList.push({
            region: region,
            gyms: gyms
        });
    });

    Companion.data.GymListOverride.forEach((g) => gymList.push({...g}));
    return gymList.sort((a, b) => a.region - b.region);
};

const getGymClearCount = (gym) => {
    if (!saveData()) {
        return 0;
    }

    const gymIndex = GameConstants.getGymIndex(gym);
    return saveData().save.statistics.gymsDefeated[gymIndex] || 0;
};

const getRouteList = () => {
    const routeList = [];
    const overrides = Companion.data.RouteListOverride;

    GameHelper.enumNumbers(GameConstants.Region).forEach(region => {
        if (region > GameConstants.MAX_AVAILABLE_REGION || region < 0) {
            return;
        }

        const regionRoutes = Routes.regionRoutes.filter(r => r.region == region);
        const routes = SubRegions.list[region].length == 1 ? regionRoutes
            : regionRoutes.filter(r => !overrides.some(o => o.region === r.region && o.subRegion === r.subRegion));

        routeList.push({
            region: region,
            subRegion: 0,
            routes: routes
        });
    });

    overrides.forEach((r) => routeList.push({...r}));

    routeList.forEach(r => {
        const regionName = GameConstants.camelCaseToString(GameConstants.Region[r.region]);
        r.routes.forEach(route => {
            route.routeName = route.routeName.replace(regionName, '').trim();
        });
    });

    return routeList.sort((a, b) => (a.displayRegion || a.region) - (b.displayRegion || b.region)
        || (a.displaySubRegion || a.subRegion) - (b.displaySubRegion || b.subRegion));
};

const getRouteDefeatCount = (region, routeNumber) => {
    if (!saveData()) {
        return 0;
    }

    const regionName = GameConstants.Region[region];
    return saveData().save.statistics.routeKills[regionName][routeNumber] || 0;
};

const hideOtherStatSection = (data) => {
    if (data.hidden) {
        return true;
    }

    const region = data.displayRegion ?? data.region;
    if (region > GameConstants.MAX_AVAILABLE_REGION) {
        return true;
    }

    if (!showAllRegions() && Math.floor(region) > player.highestRegion()) {
        return true;
    }

    return false;
};

$(document).ready(() => {
    const container = document.getElementById('container');
    ko.applyBindings({}, container);
    container.classList.remove('d-none');

    /*document.querySelectorAll('#mainTabs button.nav-link').addEventListener('show.bs.tab', (event) => {
        console.log(event.target);
    });*/

    /*$('#mainTabs button.nav-link').on('show.bs.tab', (event) => {
        //const tab = event.target.dataset.bsTarget
        activeTab(event.target.dataset.bsTarget.substring(1));
        console.log(event.target.dataset.bsTarget.substring(1));
    });*/
});

const arrayToWhatever = (array) => {
    const newArray = [];
    for (let i = 0; i < array.length; i += 2) {
        newArray.push([array[i], array?.[i+1] ]);
    }
    return newArray;
};

/*const activeTab = ko.observable('dungeon-stats');
const isTabActive = (id) => {
    return ko.pureComputed(() => {
        return id == activeTab();
    });
}*/

module.exports = {
    saveData,
    showRequiredOnly,
    showAllRegions,

    loadFile,
    isSaveLoaded,
    partyList,
    hideFromPokemonStatsTable,
    getPokemonStatsTableCount,
    pokemonStatTableSearch,
    pokemonStatTableFilter,
    isEventDiscordClientPokemon,
    getPokeballImage,
    getPokerusImage,

    getDungeonList,
    getDungeonClearCount,
    getGymList,
    getGymClearCount,
    getRouteList,
    getRouteDefeatCount,
    hideOtherStatSection,

    arrayToWhatever,
    //isTabActive,
};



},{}],3:[function(require,module,exports){
const EventDiscordClientPokemon = [
    'Bulbasaur (Clone)',
    'Spooky Bulbasaur',
    'Bulbasaur (Rose)',
    'Ivysaur (Clone)',
    'Spooky Ivysaur',
    'Ivysaur (Rose)',
    'Venusaur (Clone)',
    'Spooky Venusaur',
    'Venusaur (Rose)',
    'Charmander (Clone)',
    'Charmeleon (Clone)',
    'Charizard (Clone)',
    'Squirtle (Clone)',
    'Wartortle (Clone)',
    'Blastoise (Clone)',
    'Red Spearow',
    'Flying Pikachu',
    'Surfing Pikachu',
    'Pikachu (Gengar)',
    'Let\'s Go Pikachu',
    'Charity Chansey',
    'Let\'s Go Eevee',
    'Santa Snorlax',
    'Armored Mewtwo',
    'Spooky Togepi',
    'Surprise Togepi',
    'Spooky Togetic',
    'Blessing Blissey',
    'Grinch Celebi',
    'Handout Happiny',
    'Elf Munchlax',
    'Spooky Togekiss',
    'Rotom (Discord)',
    'Vivillon (Fancy)',
];

const DungeonListOverride = [
    {
        region: 0.1,
        name: 'Sevii Islands 123',
        dungeons: [
            ...Object.values(TownList)
                .filter(t => t.region == GameConstants.Region.kanto
                    && t.subRegion == GameConstants.KantoSubRegions.Sevii123
                    && t instanceof DungeonTown)
                .map(t => t.name)
        ]
    },
    {
        region: 2.1,
        name: 'Sevii Islands 4567',
        dungeons: [
            ...Object.values(TownList)
                .filter(t => t.region == GameConstants.Region.kanto
                    && t.subRegion == GameConstants.KantoSubRegions.Sevii4567
                    && t instanceof DungeonTown)
                .map(t => t.name)
        ]
    },
    {
        region: 2.2,
        name: 'Orre',
        dungeons: [
            ...Object.values(TownList)
                .filter(t => t.region == GameConstants.Region.hoenn
                    && t.subRegion == GameConstants.HoennSubRegions.Orre
                    && t instanceof DungeonTown)
                .map(t => t.name)
        ],
        hidden: true
    },
];

const GymListOverride = [
    {
        region: 2.1,
        name: 'Orange League',
        gyms: [ ...GameConstants.OrangeGyms ]
    },
    {
        region: 2.2,
        name: 'Orre',
        gyms: [ ...GameConstants.OrreGyms ],
        hidden: true
    },
    {
        region: 6.1,
        name: 'Magikarp Jump',
        gyms: [ ...GameConstants.MagikarpJumpGyms ]
    }
];

const RouteListOverride = [
    {
        region: 0,
        subRegion: 1,
        name: 'Sevii Islands 123',
        routes: Routes.regionRoutes.filter(r => r.region == GameConstants.Region.kanto
            && r.subRegion == GameConstants.KantoSubRegions.Sevii123)
    },
    {
        region: 0,
        displayRegion: 2,
        subRegion: 2,
        name: 'Sevii Islands 4567',
        routes: Routes.regionRoutes.filter(r => r.region == GameConstants.Region.kanto
            && r.subRegion == GameConstants.KantoSubRegions.Sevii4567)
    },
    {
        region: 2,
        subRegion: 1,
        displaySubRegion: 2,
        name: 'Orre',
        routes: Routes.regionRoutes.filter(r => r.region == GameConstants.Region.hoenn
            && r.subRegion == GameConstants.HoennSubRegions.Orre),
        hidden: true
    },
    {
        region: 6,
        subRegion: 1,
        name: 'Magikarp Jump',
        routes: Routes.regionRoutes.filter(r => r.region == GameConstants.Region.alola
            && r.subRegion == GameConstants.AlolaSubRegions.MagikarpJump)
    }
];

module.exports = {
    EventDiscordClientPokemon,
    DungeonListOverride,
    GymListOverride,
    RouteListOverride,
}
},{}],4:[function(require,module,exports){
player = new Player();
player.highestRegion(0);
const multiplier = new Multiplier();
App.game = new Game(
  new Update(),
  new Profile(),
  new Breeding(multiplier),
  new Pokeballs(),
  new PokeballFilters(),
  new Wallet(multiplier),
  new KeyItems(),
  new BadgeCase(),
  new OakItems([20, 50, 100], multiplier),
  new OakItemLoadouts(),
  new PokemonCategories(),
  new Party(multiplier),
  new Gems(),
  new Underground(),
  new Farming(multiplier),
  new LogBook(),
  new RedeemableCodes(),
  new Statistics(),
  new Quests(),
  new SpecialEvents(),
  new Discord(),
  new AchievementTracker(),
  new Challenges(),
  new BattleFrontier(),
  multiplier,
  new SaveReminder(),
  new BattleCafeSaveObject(),
  new DreamOrbController()
);


},{}],5:[function(require,module,exports){
const package = require('../pokeclicker/package.json');

window.Companion = {
    package,
    ...require('./game'),
    ...require('./app'),
    data: require('./data'),
}

},{"../pokeclicker/package.json":1,"./app":2,"./data":3,"./game":4}]},{},[5]);