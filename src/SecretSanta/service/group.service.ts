import { Inject, Injectable } from "@nestjs/common";
import { AddParticipantDto, CreateGroupDto } from "@models/group/dto";
import { Group } from "@models/group/entities";
import { IGroupRepository } from "@SecretSanta/repository/group.repository.interface";
import { IGroupService } from "@SecretSanta/service/group.service.interface";
import { RaffleDto } from "@models/couple/dto";
import { Couple } from "@models/couple/entities/couple.entity";
import { CanNotRaffle, YearAlreadyRaffled } from "@shared/errors";
import { ICoupleRepository } from "@SecretSanta/repository/couple.repository.interface";

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @Inject(IGroupRepository)
    private readonly groupRepository: IGroupRepository,
    @Inject(ICoupleRepository)
    private readonly coupleRepository: ICoupleRepository,
  ) {}

  async create(group: CreateGroupDto): Promise<Group> {
    return await this.groupRepository.createGroup(group);
  }

  async addParticipant(addParticipantDto: AddParticipantDto): Promise<void> {
    await this.groupRepository.addParticipant(addParticipantDto);
  }
  
  async raffle(raffleDto: RaffleDto): Promise<Couple[]> {
    
    if(await this.coupleRepository.yearAlreadyRaffled(raffleDto)) throw new YearAlreadyRaffled(raffleDto.groupId, raffleDto.year);    
    
    const previousCouples = await this.coupleRepository.getPreviousCouples(raffleDto);

    /**
     * participantId, groupId
     */
    const participants = await this.groupRepository.getAllParticipantsInGroup(raffleDto);

    /**
     * "grafo" con listas de adyacencia
     * [
     *  {
     *    participantId,
     *    [id, id, id]
     *  }
     * ]
     */
    const posibleMatches = [] 
    const newIds = []
    const checkedIds = []
    let oldParticipantCouples = 0
    for (const participant of participants) {
      for (const couple of previousCouples) {
        if((couple.secretSanta.id == participant.participantId || couple.giftee.id == participant.participantId) && !checkedIds.includes(participant.participantId)){
          checkedIds.push(participant.participantId);
          oldParticipantCouples++;
        } 
      }
    }
    for (const participant of participants) {
      const participantId = participant.participantId;
      const posibleGifteesIds: string[] = this.getPosibleGifteesIds(participantId, previousCouples)
      if(posibleGifteesIds.length == oldParticipantCouples) {
        newIds.push(participantId)
      }
      posibleMatches.push({
        participantId,
        posibleGifteesIds,
        indexInPosibleGiftees: 0
      })
    }
    for (const match of posibleMatches) {
      for (const id of newIds) {
        if(match.participantId != id) match.posibleGifteesIds.push(id);
      }
    }

    if(posibleMatches.length == 2) throw new CanNotRaffle(raffleDto.groupId, raffleDto.year);

    /**
     * Recorrer "grafo" buscando ciclo
     */

    let ids = []
    const positionInGraph = 0
    const positionInIds = 0
    ids.push(posibleMatches[0].participantId)

    ids = this.findCycle(ids, posibleMatches, positionInGraph, positionInIds);

    if(ids.length == 0) throw new CanNotRaffle(raffleDto.groupId, raffleDto.year);

    /**
     * armo parejas
     */

    const newCouples = [];
    for(let i = 0; i < ids.length-1; i++){
      newCouples.push({
        secretSantaId: ids[i],
        gifteeId: ids[i+1],
        year: raffleDto.year,
        groupId: raffleDto.groupId
      })   
    }

    await this.coupleRepository.createMany(newCouples);
    return newCouples;
  }

  getPosibleGifteesList(posibleMatches: any[], actualId: string): string[] {
    for (const match of posibleMatches) {
      if(match.participantId == actualId) return match.posibleGifteesIds
    }
  }

  getPosibleGifteesIds(participantId: string, previousCouples: Couple[]): string[] {
    const posibleGiftees = [];
    const alreadyGiftedCouples = previousCouples.filter((couple) => {
      return couple.secretSanta.id == participantId  
    })
    for (const couple of previousCouples) {
      if(couple.giftee.id != participantId && !posibleGiftees.includes(couple.giftee.id) && !alreadyGiftedCouples.some((someCouple) => {
        return someCouple.giftee.id == couple.giftee.id 
      })){
        posibleGiftees.push(couple.giftee.id)
      }
    }
    return posibleGiftees;
  }

  findCycle(ids: any[], graph: any[], positionInGraph: number, positionInIds: number)  {

      if(ids.length == graph.length && graph[this.getPositionInGraph(graph, ids[ids.length-1])].posibleGifteesIds.includes(ids[0])) {
          ids.push(ids[0]);
          return ids;
      }

      let nextId = this.selectNext(graph, positionInGraph, ids, positionInIds);


      if(nextId == -1 && positionInIds == 0) return []

      if(nextId == -1){
          positionInIds = positionInIds - 1; 
          nextId = ids[positionInIds]
          positionInGraph = this.getPositionInGraph(graph, nextId);
          return this.findCycle(ids, graph, positionInGraph, positionInIds);
      }
      
      if(positionInIds < ids.length-1){
          this.cleanFromPosition(ids,positionInIds);
          ids.push(nextId)
          positionInIds = ids.length-1
          positionInGraph = this.getPositionInGraph(graph, nextId);
          return this.findCycle(ids, graph, positionInGraph, positionInIds) 
      }else{
          ids.push(nextId)
          positionInIds = positionInIds + 1
          positionInGraph = this.getPositionInGraph(graph, nextId);
          return this.findCycle(ids, graph, positionInGraph, positionInIds) 
      }

  }

  getPositionInGraph(graph: any[], id: string) {
      for(let i = 0; i < graph.length; i++) {
          if(graph[i].participantId == id) return i;
      } 
  }

  cleanFromPosition(ids: any[], position: number) {
      for(let i = ids.length-1; i > position; i--){
          ids.pop();
      }
  } 

  selectNext(graph: any[], positionInGraph: number, ids: any[], positionInIds: number)  {
      const posibleGiftees = graph[positionInGraph].posibleGifteesIds;
      for(let i = graph[positionInGraph].indexInPosibleGiftees; i < posibleGiftees.length; i++){
          if(!this.isContainedBeforePosition(posibleGiftees[i], ids, positionInIds)){  
              graph[positionInGraph].indexInPosibleGiftees = i+1
              return posibleGiftees[i];
          }else{
              graph[positionInGraph].indexInPosibleGiftees = i+1
          }
      }
      graph[positionInGraph].indexInPosibleGiftees = 0
      return -1 
  }

  isContainedBeforePosition(id: string, ids: any[], positionInIds: number)  {
      for(let i = 0; i <= positionInIds; i++){
          if(ids[i] == id) return true;
      }
      return false;
  }


}