(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "name": "pokeclicker",
  "version": "0.10.13",
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
    const statistics = saveData().save.statistics;

    return party.reduce((_map, p) => {
        const partyPokemon = PokemonFactory.generatePartyPokemon(p.id);
        partyPokemon.fromJSON(p);

        partyPokemon.statistics = {
            totalObtained: statistics.pokemonCaptured[p.id] || 0,
            totalHatched: statistics.pokemonHatched[p.id] || 0,
            totalShinyObtained: statistics.shinyPokemonCaptured[p.id] || 0,
            totalShinyHatched: statistics.shinyPokemonHatched[p.id] || 0,
            totalDefeated: statistics.pokemonDefeated[p.id] || 0,
        };

        _map[p.id] = partyPokemon;
        return _map;
    }, {});
});

const pokemonStatTableSearch = ko.observable('');
const pokemonStatTableFilter = ko.observable('none');
const pokemonStatTableSort = ko.observable('id');
const pokemonStatTableSortDir = ko.observable(false);

const loadFile = (file) => {
    fr.readAsText(file);
};

const loadSaveData = () => {
    const saveFile = JSON.parse(atob(fr.result));
    player.highestRegion(saveFile.player.highestRegion);
    App.game.challenges.list.slowEVs.active(saveFile.save.challenges.list.slowEVs);

    saveData(saveFile);

    if (saveFile.save.profile.name.toLowerCase() == 'bailey') {
        if (Rand.intBetween(1, 20) == 1) {
            alert('Ȟ̷̨̠͈͖̲̠͍͓̊͂̐e̵͈͖̮̼̼͚͍̳̠̖̺͚̓͝ĺ̷̢̧̧̻̫͚̒l̴̛̲̼͒̽́͒̆̑͑̃̌̎o̸̡̘̞̝̭̙̠̰͋̆̚.̵̡̛̹͙̤̺̳̱͚̹̏͌̓̓̌̿̊̒́͂̂̊͂̚ ̵̨̨̖̭̞̰͖̞̮͚̺̟̰̔B̴̢̰̳͓̬̤̯̬͍̙͎̟͉͓̙̓̈́̓̽͑̍̓̂͑́͘͘a̵̛̭̬͎̪̔͋͌̀͂̏i̷̱͉̪͖̫͇̮͔̯͆̄̔͋͂ḽ̵̳͕͆̎̈́ę̶̛͕̘͎̮̯͙̱͔̙͓͉̿̽̍͂̋̇̏̐̈̽͜y̷̡̟̦̓̍͐̓̆̀̍̂̕.̶̤͖͚̅̅̒̔͘͘ ̴̧̤͔̜̪̦͇̿̀̋͒̾̋͋̚W̸̨̜͍̲̖̱̯̖͇̣̩̉̏͘͘͘͜͝͝e̴̛̩͈̥̻̺̝̲̹͂̈́̉͆̀̀͊́͐.̶̢̱͙̱̱͈͖̳̫̝͇̰̐̏̀̂̎̇͋͛͛̇̉͐́̚̕ͅͅ ̸̙̩̥͕̪̖̅̆̓̏̕͝͝͝ͅS̸̙͈̺͙̟͓̠̼͍͖̭͇͂̍̊͂̎̃̂͜e̸̟͊́̈́͆̉̽̎̔̈̊̔̑̕̕̚e̷̛̯̼̱͐͊͒̈́́̽͐̏̉̔.̴̧̛̉̈̊͛͐ ̶̨͕̗̱̙͚̗̩͉̖̥͈̠̬̑̉̀Ỹ̷̡͖̪̝̦͈̲͘͝o̵̢͍̗͍̱̪̮̊͛͛͋̂̆̔̒͊́̈͂̾̋ͅû̶̹̳̽͌̊̌̓̑͝.̶̡̢̹̤͚͚̟͇͕͖̦̠̪͆̍̈̉̉̈́͆̑̎̆͘̚͝ ̶̙͈͋̾͊̆̒̌͐̂Ŵ̸̧̺̗̥̲͈̳̟̜͚̜͚̏̽͗̊̾̐̿̉͝ȩ̵̼̪͎͉͇͙̭͎̻͈͗̈́͂̓̈́̒̃̈̔̋̉̂̈̕ͅ.̷̤͔͕̎̎̐̂͆̈́̀ ̸̢̧̻̗̯̥͓̥͕̱̖̬̲̅́̒͌̿̎̔͌̈͌̀͠͠ͅͅÂ̸̛̛̖͕̱̫̲̞̯̫͉͖̻̳͂̂̅̈́̑̓́͐̈̀r̷̢̗̳̗̤͔͓̻̳̳̠̳̬̩̞̆̎̾̈́͋̊̕͝e̴͓͇͙̬͔̼͔͇̋̋̐̐̽͐̈́͘̚.̸͍̞̼͈̖̩̮̹̈́̊̄͠ ̴͓͔̬̟̈́̈W̵͍͍̼̜̤͔̭̻̞̫̹̎̇̿́̀͘ͅa̷̡̡̨̩̙͍͖̜̍̾̈́͊̽̂͂͜t̵̟͚͙͇̫͚̠̭͈̣̘̫͆͒̑͊̀͒̆̉́͑͋̊̕͘ͅç̶̮͉͍̫̋̅̅̓͑͠ḩ̷͕̟̠̩̼̼͓̜̳̦͝ĭ̵̧̢̨̼͓̩͈̮͖͖͓̰͕̈́̈́͂̋̅̐̍̔̎̀́̕n̸̛͚͕̝̐́̿͌͂̊͛̓̂̓̓͑͋͝g̸̞̠̭͖̯̲͕̫̗͖͔͙̀̿̇͜.̸̨̡̢̱͖͙̰͍͙̟͈͓̪͙͊̓̆̃́̀̀̈́');
        } else {
            const hour = (new Date()).getHours();
            if (hour < 5) {
                alert('Bailey! What are you still doing up!? GO TO BED!');
            } else if (hour < 12) {
                alert('Good morning, Bailey! Did you sleep well?');
            } else if (hour < 18) {
                alert('Good afternoon, Bailey! We missed you. Enjoy your stay.');
            } else if (hour < 22) {
                alert('Good evening, Bailey. How was your day? ');
            } else {
                alert('Hello, Bailey. It\'s getting kind of late, perhaps consider retiring to bed soon?');
            }
        }
    }
};

const fr = new FileReader();
fr.addEventListener('load', loadSaveData);

const isSaveLoaded = ko.pureComputed(() => {
    return saveData() !== undefined;
});

const getSortedPartyList = ko.pureComputed(() => {
    if (!saveData()) {
        return [];
    }

    const sortOption = pokemonStatTableSort();
    const sortDirection = pokemonStatTableSortDir();
    return Object.values(partyList()).sort(compareBy(sortOption, sortDirection));
});

const getMissingPokemon = ko.pureComputed(() => {
    if (!isSaveLoaded()) {
        return [];
    }

    const caughtPokemon = partyList();
    const missingPokemon = {
        ...GameHelper.enumNumbers(GameConstants.Region)
            .filter(r => r !== GameConstants.Region.none && r <= GameConstants.MAX_AVAILABLE_REGION)
            .map(r => {
                return {
                    region: r,
                    regionName: GameConstants.camelCaseToString(GameConstants.Region[r]),
                    pokemon: []
                };
            })
    };

    missingPokemon[-2] = {
        region: -2,
        regionName: 'Event / Discord / Client',
        pokemon: []
    };

    getObtainablePokemonList().forEach(p => {
        if (caughtPokemon[p.id]) {
            return;
        }

        const nativeRegion = getPokemonNativeRegion(p.name);
        if (!showAllRegions() && nativeRegion > player.highestRegion()) {
            return;
        }

        if (showRequiredOnly()) {
            if (nativeRegion == -2) {
                return;
            }

            //const gameRegion = PokemonHelper.calcNativeRegion(p.name);
            const formCaught = saveData().save.party.caughtPokemon.some(c => Math.floor(c.id) == Math.floor(p.id));
            if (formCaught) {
                return;
            }
        }

        missingPokemon[nativeRegion].pokemon.push(p);
    });

    return Object.values(missingPokemon).filter(r => r.pokemon.length);
});

const getMissingRegionPokemonCount = (region) => {
    return ko.pureComputed(() => {
        const data = getMissingPokemon().find(r => r.region == region);
        if (!data) {
            return 0;
        }

        return showRequiredOnly() ? (new Set(data.pokemon.map(p => Math.floor(p.id)))).size : data.pokemon.length;
    });
};

const getTotalMissingPokemonCount = ko.pureComputed(() => {
    return getMissingPokemon().reduce((count, r) => {
        return count + getMissingRegionPokemonCount(r.region)();
    }, 0);
});

const getPokemonNativeRegion = (pokemonName) => {
    return Companion.data.pokemonRegionOverride[pokemonName] || PokemonHelper.calcNativeRegion(pokemonName);
};

const getObtainablePokemonList = () => {
    const unobtainableList = Companion.data.UnobtainablePokemon.filter(p => typeof p === 'string');
    const unobtainableListRegex = Companion.data.UnobtainablePokemon.filter(p => typeof p === 'object').map(p => new RegExp(p));

    const pokemon = pokemonList.filter(p => {
        if (p.id < 1) {
            return false;
        }

        if (PokemonHelper.calcNativeRegion(p.name) > GameConstants.MAX_AVAILABLE_REGION) {
            return false;
        }

        if (unobtainableList.includes(p.name) || unobtainableListRegex.some(r => r.test(p.name))) {
            return false;
        }

        return true;
    });

    return pokemon;
};

const getObtainablePokemonListByRegion = ko.pureComputed(() => {
    const data = {};
    getObtainablePokemonList().forEach(p => {
        const nativeRegion = getPokemonNativeRegion(p.name);
        data[nativeRegion] = data[nativeRegion] || [];
        data[nativeRegion].push(p.name);
    });
    return data;
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
            const isResistant = partyPokemon.pokerus === GameConstants.Pokerus.Resistant;
            const isFriendSafari = Companion.data.friendSafariPokemon.includes(partyPokemon.name);
            switch (filterVal) {
                case 'not-shiny':
                    if (partyPokemon.shiny) {
                        return true;
                    }
                    break;
                case 'not-resistant':
                    if (isResistant) {
                        return true;
                    }
                    break;
                case 'not-resistant-not-friend-safari':
                    if (isResistant || isFriendSafari) {
                        return true;
                    }
                    break;
                case 'not-resistant-friend-safari':
                    if (isResistant || !isFriendSafari) {
                        return true;
                    }
                    break;
                case 'resistant':
                    if (!isResistant) {
                        return true;
                    }
                    break;
                case 'infected':
                    if (partyPokemon.pokerus != GameConstants.Pokerus.Infected) {
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

const isPokemonCaught = (pokemonName) => {
    return partyList()[PokemonHelper.getPokemonByName(pokemonName).id] != undefined;
};

const getCaughtPokeballImage = (pokemonName) => {
    const partyPokemon = partyList()[PokemonHelper.getPokemonByName(pokemonName).id];
    if (partyPokemon) {
        return `./pokeclicker/docs/assets/images/pokeball/Pokeball${partyPokemon.shiny ? '-shiny' : ''}.svg`;
    } else {
        return '';
    }
};

const hasPokerus = (pokemonName) => {
    const partyPokemon = partyList()[PokemonHelper.getPokemonByName(pokemonName).id];
    return (partyPokemon?.pokerus ?? 0) > 0;
};

const getPokerusImage = (pokemonName) => {
    const partyPokemon = partyList()[PokemonHelper.getPokemonByName(pokemonName).id];
    if (partyPokemon) {
        return `./pokeclicker/docs/assets/images/breeding/pokerus/${GameConstants.Pokerus[partyPokemon.pokerus]}.png`;
    } else {
        return '';
    }
};

const getDungeonData = ko.pureComputed(() => {
    const dungeonList = [];
    const dungeonOverrides = Companion.data.DungeonListOverride.map(d => d.dungeons).flat();

    GameConstants.RegionDungeons.forEach((rd, idx) => {
        dungeonList.push({
            region: idx,
            dungeons: rd.filter(d => !dungeonOverrides.includes(d))
        });
    });

    Companion.data.DungeonListOverride.forEach((rd) => dungeonList.push({...rd}));

    dungeonList.forEach(d => {
        d.dungeons = d.dungeons.map(dungeon => ({
            name: dungeon,
            clears: isSaveLoaded() ? getDungeonClearCount(dungeon) : 0
        }));
    });
    
    return dungeonList.sort((a, b) => a.region - b.region);
});

const getDungeonClearCount = (dungeon) => {
    if (!isSaveLoaded()) {
        return 0;
    }

    const dungeonIndex = GameConstants.getDungeonIndex(dungeon);
    return saveData().save.statistics.dungeonsCleared[dungeonIndex] || 0;
};

const getGymData = ko.pureComputed(() => {
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

    gymList.forEach(g => {
        g.gyms = g.gyms.map(gym => ({
            name: gym,
            clears: isSaveLoaded() ? getGymClearCount(gym) : 0
        }));
    });

    return gymList.sort((a, b) => a.region - b.region);
});

const getGymClearCount = (gym) => {
    if (!saveData()) {
        return 0;
    }

    const gymIndex = GameConstants.getGymIndex(gym);
    return saveData().save.statistics.gymsDefeated[gymIndex] || 0;
};

const getRouteData = ko.pureComputed(() => {
    const routeList = [];
    const routeOverrides = Companion.data.RouteListOverride;

    GameHelper.enumNumbers(GameConstants.Region).forEach(region => {
        if (region > GameConstants.MAX_AVAILABLE_REGION || region < 0) {
            return;
        }

        const regionRoutes = Routes.regionRoutes.filter(r => r.region == region);
        const routes = SubRegions.list[region].length == 1 ? regionRoutes
            : regionRoutes.filter(r => !routeOverrides.some(o => o.region === r.region && o.subRegion === r.subRegion));

        routeList.push({
            region: region,
            subRegion: 0,
            routes: routes
        });
    });

    routeOverrides.forEach((r) => routeList.push({...r}));

    routeList.forEach(r => {
        const regionName = GameConstants.camelCaseToString(GameConstants.Region[r.region]);
        r.routes.forEach(route => {
            route.routeName = route.routeName.replace(regionName, '').trim();
            route.defeats = isSaveLoaded() ? getRouteDefeatCount(route.region, route.number) : 0;
        });
    });

    return routeList.sort((a, b) =>
        (a.displayRegion || a.region) - (b.displayRegion || b.region)
        || (a.displaySubRegion || a.subRegion) - (b.displaySubRegion || b.subRegion));
});

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

const getFriendSafariForecast = ko.pureComputed(() => {
    if (!saveData()) {
        return [];
    }

    const trainerId = saveData().player.trainerId || '000000';
    SeededRand.seed(+trainerId);
    const shuffledPokemon = new Array(5).fill(SeededRand.shuffleArray(Companion.data.friendSafariPokemon)).flat();

    const batchCount = Math.ceil(shuffledPokemon.length / 5);
    const date = new Date();
    let startIndex = (Math.floor((date.getTime() - date.getTimezoneOffset() * 60 * 1000) / (24 * 60 * 60 * 1000)) % batchCount) * 5;

    const data = [];
    for (let i = 0; i < Math.ceil(Companion.data.friendSafariPokemon.length / 5); i++) {
        data.push({
            date: new Date(date),
            pokemon: shuffledPokemon.slice(startIndex, startIndex + 5)
        });
        startIndex += 5;
        if (startIndex >= shuffledPokemon.length) {
            startIndex = 0;
        }
        date.setDate(date.getDate() + 1);
    }

    return data;
});

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

    $('#pokemonStatsTable > thead th.sortable').click((e) => {
        const sort = e.target.dataset.sort;
        if (pokemonStatTableSort() == sort) {
            pokemonStatTableSortDir(!pokemonStatTableSortDir());
        } else {
            pokemonStatTableSort(sort);
            pokemonStatTableSortDir(true);
        }
    });
});

const arrayToWhatever = (array) => {
    const newArray = [];
    for (let i = 0; i < array.length; i += 2) {
        newArray.push([array[i], array?.[i+1] ]);
    }
    return newArray;
};

function compareBy(sortOption, direction) {
    return function (a, b) {
        let res, dir = direction ? -1 : 1;

        const aValue = getSortValue(sortOption, a);
        const bValue = getSortValue(sortOption, b);
        
        if (aValue == bValue) {
            return a.id - b.id;
        } else if (aValue < bValue) {
            res = -1;
        } else if (aValue > bValue) {
            res = 1;
        } else {
            res = 0;
        }

        return res * dir;
    }
}

function getSortValue(sortOption, partyPokemon) {
    switch (sortOption) {
        case 'name':
            return partyPokemon.name;
        case 'obtained':
            return partyPokemon.statistics.totalObtained;
        case 'hatched':
            return partyPokemon.statistics.totalHatched;
        case 'shiny-obtained':
            return partyPokemon.statistics.totalShinyObtained;
        case 'shiny-hatched':
            return partyPokemon.statistics.totalShinyHatched;
        case 'defeated':
            return partyPokemon.statistics.totalDefeated;
        case 'evs':
            return partyPokemon.evs();
        case 'ev-bonus':
            return partyPokemon.calculateEVAttackBonus();
        case 'id':
        default:
            return partyPokemon.id;
    }
}

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

    getMissingPokemon,
    getTotalMissingPokemonCount,
    getMissingRegionPokemonCount,

    partyList,
    getSortedPartyList,

    hideFromPokemonStatsTable,
    getPokemonStatsTableCount,
    pokemonStatTableSearch,
    pokemonStatTableFilter,
    isEventDiscordClientPokemon,

    isPokemonCaught,
    getCaughtPokeballImage,
    hasPokerus,
    getPokerusImage,

    getDungeonData,
    getGymData,
    getRouteData,
    hideOtherStatSection,

    getFriendSafariForecast,

    arrayToWhatever,
    //isTabActive,
};

},{}],3:[function(require,module,exports){
const UnobtainablePokemon = [
    'Mega Mewtwo X',
    'Mega Mewtwo Y',
    'Mega Medicham',
    'Mega Altaria',
    'Mega Banette',
    'Arceus (Fire)',
    'Arceus (Water)',
    'Arceus (Electric)',
    'Arceus (Grass)',
    'Arceus (Ice)',
    'Arceus (Fighting)',
    'Arceus (Poison)',
    'Arceus (Ground)',
    'Arceus (Flying)',
    'Arceus (Psychic)',
    'Arceus (Bug)',
    'Arceus (Rock)',
    'Arceus (Ghost)',
    'Arceus (Dragon)',
    'Arceus (Dark)',
    'Arceus (Steel)',
    'Arceus (Fairy)',
    'Eternamax Eternatus',
    'Dugtrio (Punk)',
    'Weepinbell (Fancy)',
    'Gengar (Punk)',
    'Onix (Rocker)',
    'Tangela (Pom-pom)',
    'Goldeen (Diva)',
    'XD001',
    'Furfrou (Heart)',
    /Gigantamax .+/
];

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

const pokemonRegionOverride = {

    // Magikarp
    ...Object.fromEntries(
        pokemonList.filter(p => Math.floor(p.id) == 129 && p.id > 129).map(p => [p.name, GameConstants.Region.alola])
    ),
    'Magikarp (Feebas)': GameConstants.Region.hoenn,

    // Pikachu
    ...Object.fromEntries(
        pokemonList.filter(p => Math.floor(p.id) == 25 && p.id > 25).map(p => [p.name, GameConstants.Region.alola])
    ),
    'Pinkan Pikachu': GameConstants.Region.kanto,
    'Detective Pikachu': GameConstants.Region.kanto,
    'Pikachu (World Cap)': GameConstants.Region.galar,

    // Mega and Primal
    ...Object.fromEntries(
        pokemonList.filter(p => p.name.startsWith('Mega ') || p.name.startsWith('Primal '))
            .map(p => [p.name, GameConstants.Region.kalos])
    ),

    'Hoppip (Chimecho)': GameConstants.Region.hoenn,
    'Meltan': GameConstants.Region.alola,
    'Melmetal': GameConstants.Region.alola,
    'Magearna (Original Color)': GameConstants.Region.galar,

    // Event / Discord / Client
    ...Object.fromEntries(EventDiscordClientPokemon.map(p => [p, -2]))
}

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
        subRegion: 4,
        name: 'Magikarp Jump',
        routes: Routes.regionRoutes.filter(r => r.region == GameConstants.Region.alola
            && r.subRegion == GameConstants.AlolaSubRegions.MagikarpJump)
    }
];

const friendSafariPokemon = [
    'Ivysaur',
    'Ivysaur (Clone)',
    'Spooky Ivysaur',
    'Ivysaur (Rose)',
    'Venusaur',
    'Venusaur (Clone)',
    'Spooky Venusaur',
    'Venusaur (Rose)',
    'Charmeleon',
    'Charmeleon (Clone)',
    'Charizard',
    'Charizard (Clone)',
    'Wartortle',
    'Wartortle (Clone)',
    'Blastoise',
    'Blastoise (Clone)',
    'Pinkan Pidgeotto',
    'Pikachu (Partner Cap)',
    'Surfing Pikachu',
    'Pinkan Pikachu',
    'Alolan Muk',
    'Magikarp Skelly',
    'Magikarp Calico (White, Orange)',
    'Magikarp Pink Dapples',
    'Magikarp Grey Diamonds',
    'Magikarp Purple Bubbles',
    'Magikarp Purple Patches',
    'Magikarp Brown Tiger',
    'Magikarp Orange Forehead',
    'Magikarp Black Mask',
    'Magikarp Saucy Blue',
    'Bayleef',
    'Meganium',
    'Quilava',
    'Typhlosion',
    'Croconaw',
    'Feraligatr',
    'Spiky-eared Pichu',
    'Spooky Togepi',
    'Surprise Togepi',
    'Jumpluff',
    'Forretress',
    'Flowering Celebi',
    'Grovyle',
    'Sceptile',
    'Combusken',
    'Blaziken',
    'Marshtomp',
    'Swampert',
    'Cradily',
    'Meta Groudon',
    'Grotle',
    'Torterra',
    'Monferno',
    'Infernape',
    'Prinplup',
    'Empoleon',
    'Staraptor',
    'Cranidos',
    'Rampardos',
    'Shieldon',
    'Bastiodon',
    'Burmy (Sand)',
    'Burmy (Trash)',
    'Wormadam (Plant)',
    'Wormadam (Sand)',
    'Wormadam (Trash)',
    'Mothim',
    'Cherrim (Overcast)',
    'Cherrim (Sunshine)',
    'Mismagius (Illusion)',
    'Handout Happiny',
    'Elf Munchlax',
    'Probopass',
    'Rotom (Discord)',
    'Giratina (Origin)',
    'Phione',
    'Servine',
    'Serperior',
    'Pignite',
    'Emboar',
    'Dewott',
    'Samurott',
    'Blitzle',
    'Darmanitan',
    'Cofagrigus',
    'Archeops',
    'Fraxure',
    'Quilladin',
    'Chesnaught',
    'Braixen',
    'Delphox',
    'Frogadier',
    'Greninja',
    'Ash-Greninja',
    'Floette (Eternal)',
    'Gogoat',
    'Aegislash (Blade)',
    'Goodra',
    'Dartrix',
    'Decidueye',
    'Torracat',
    'Incineroar',
    'Brionne',
    'Primarina',
    'Crabominable',
    'Lycanroc (Dusk)',
    'Magearna (Original Color)',
    'Naganadel',
    'Melmetal',
    'Thwackey',
    'Rillaboom',
    'Raboot',
    'Cinderace',
    'Drizzile',
    'Inteleon',
    'Toxtricity (Amped)',
    'Toxtricity (Low Key)',
    'Cursola',
    'Sirfetch\'d',
    'Runerigus',
    'Zacian (Crowned Sword)',
    'Zamazenta (Crowned Shield)',
    'Eternatus',
    'Kubfu',
    'Urshifu (Single Strike)',
    'Urshifu (Rapid Strike)',
];

module.exports = {
    UnobtainablePokemon,
    EventDiscordClientPokemon,

    pokemonRegionOverride,

    DungeonListOverride,
    GymListOverride,
    RouteListOverride,

    friendSafariPokemon,
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
App.game.farming.initialize();
App.game.breeding.initialize();
QuestLineHelper.loadQuestLines();

},{}],5:[function(require,module,exports){
const package = require('../pokeclicker/package.json');

window.Companion = {
    package,
    ...require('./game'),
    ...require('./app'),
    data: require('./data'),
}

},{"../pokeclicker/package.json":1,"./app":2,"./data":3,"./game":4}]},{},[5]);
