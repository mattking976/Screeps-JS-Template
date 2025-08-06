var roleHauler = {
    /** @param {Creep} creep **/
    run: function(creep){
        if (creep.store.getFreeCapacity() > 0){
            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: Resource => Resource.resourceType == RESOURCE_ENERGY
            })
            
            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);

            if(creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestDroppedEnergy);
            }
        }
        else{
            var allSpawns = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (Structure) => {
                    return (Structure.structureType == StructureSpawn) && 
                    Structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            var closestSpawn = creep.pos.findClosestByRange(allSpawns);

            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (Structure) => {
                    return (Structure.structureType == STRUCTURE_SPAWN ||
                        Structure.structureType == STRUCTURE_EXTENSION ||
                        Structure.structureType == STRUCTURE_TOWER ||
                        Structure.structureType == STRUCTURE_CONTAINER) && 
                        Structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            const closestTarget = creep.pos.findClosestByRange(targets);

            if(creep.transfer(closestSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestSpawn);
            }
            else if(creep.transfer(closestTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(closestTarget);
            }
            else{
                //keeping haulers out of harms way kinda
                creep.moveTo(Game.spawns['Spawn1'].pos.x + 5, Game.spawns['Spawn1'].pos.y + 5);
            }
        }
    }
}

export default roleHauler;