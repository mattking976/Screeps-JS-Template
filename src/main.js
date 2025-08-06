import { filter } from "lodash";

//main module should be very little here that actually controls anything
import { run } from 'role.harvester';
import { run as _run } from "role.haulers";

//setting base minimum numbers.
var minHarvesters = 3;
var minHaulers = 3;

export function loop () {
	// Your code goes here

	//clearing out the dead creeps names so that we can use them again if needed
	for(var name in Memory.creeps){
		if(!Game.creeps[name]){
			delete Memory.creeps[name];
			console.log('clearing the memory of dead creeps, name: ' + name);
		}
	}

	//number of harvesters in play
	var harvesters = _.filter(Game.creeps, (creep) => 
		creep.memory.role == 'harvester');
	console.log('Harvesters #: ' + harvesters.length);

    //number of haulers in play
	var haulers = _.filter(Game.creeps, (creep) => 
		creep.memory.role == 'hauler');
	console.log('Haulers #: ' + haulers.length);

	//number of available energy units across the owned rooms.
	for(var name in Game.rooms){
		console.log('Room ' + name+ ' has ' + 
			Game.rooms[name].energyAvailable + ' energy');
	}

	if(harvesters.length < minHarvesters) {
		var newName = 'Harvester' + Game.time.toString();
		Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE], newName, 
			{memory: {role: 'harvester'}});
	}
    else if(haulers.length < minHaulers){
		var newName = 'Hauler' + Game.time.toString();
		Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, 
			{memory: {role: 'hauler'}});
	}

	if(Game.spawns['Spawn1'].spawning){
		var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
		Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
	}

	//assigning role ai to creeps.
	for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            run(creep);
			continue
        }
        if(creep.memory.role == 'hauler')
		{
			_run(creep);
			continue
		}
    }
}