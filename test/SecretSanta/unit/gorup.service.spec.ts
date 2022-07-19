import { RaffleDto } from '@models/couple/dto';
import { Couple } from '@models/couple/entities/couple.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CoupleRepository, GroupRepository, ICoupleRepository, IGroupRepository } from '@SecretSanta/repository';

import { GroupService, IGroupService } from '@SecretSanta/service';
import { YearAlreadyRaffled } from '@shared/errors';

import { SharedModule } from '@shared/shared.module';

describe('GroupService  Unit Test', () => {
  let groupService: IGroupService;
  let groupRepository: IGroupRepository;
  let coupleRepository: ICoupleRepository;

  beforeEach(async () => {
    const groupServiceProvider = {
      provide: IGroupService,
      useClass: GroupService,
    };

    const groupRepositoryProvider = {
      provide: IGroupRepository,
      useClass: GroupRepository,
    };

    const coupleRepositoryProvider = {
        provide: ICoupleRepository,
        useClass: CoupleRepository
    }

    const app: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [groupRepositoryProvider, groupServiceProvider, coupleRepositoryProvider],
    }).compile();

    groupService = app.get<IGroupService>(IGroupService);
    groupRepository = app.get<IGroupRepository>(IGroupRepository);
    coupleRepository = app.get<ICoupleRepository>(ICoupleRepository);
  });

  describe('raffle', () => {

    it('should match couples', async () => {

        const participants = [
            {
                participantId: "1",
                groupId: "group1"
            },
            {
                participantId: "2",
                groupId: "group1"
            },
            {
                participantId: "3",
                groupId: "group1"
            },
            {
                participantId: "4",
                groupId: "group1"
            },
        ]

        const previousCouples: Couple[] = [
            {
                id: 'some id',
                group: {id: 'group1'},
                year: 2021,
                secretSanta: { id: '1', name: 'some name' },
                giftee: { id: '2', name: 'some name' }
            }, 
            {
                id: 'some id',
                group: {id: 'group1'},
                year: 2021,
                secretSanta: { id: '2', name: 'some name' },
                giftee: { id: '3', name: 'some name' }
            },   
            {
                id: 'some id',
                group: {id: 'group1'},
                year: 2021,
                secretSanta: { id: '3', name: 'some name' },
                giftee: { id: '4', name: 'some name' }
            },   
            {
                id: 'some id',
                group: {id: 'group1'},
                year: 2021,
                secretSanta: { id: '4', name: 'some name' },
                giftee: { id: '1', name: 'some name' }
            },                 
        ]

        const excpectedResult = [
            {
                secretSantaId: '1',
                gifteeId: '4',
                groupId: 'group1',
                year: 2022,
            }, 
            {
                secretSantaId: '4',
                gifteeId: '3',
                groupId: 'group1',
                year: 2022,
            },   
            {
                secretSantaId: '3',
                gifteeId: '2',
                groupId: 'group1',
                year: 2022,
            },   
            {
                secretSantaId: '2',
                gifteeId: '1',
                groupId: 'group1',
                year: 2022,
            },  
        ]

        const input: RaffleDto = {
            groupId: "group1",
            year: 2022
        }

        jest.spyOn(groupRepository, 'getAllParticipantsInGroup').mockImplementation(() => Promise.resolve(participants));
        jest.spyOn(coupleRepository, 'getPreviousCouples').mockImplementation(() => Promise.resolve(previousCouples));
        jest.spyOn(coupleRepository, 'yearAlreadyRaffled').mockImplementation(() => Promise.resolve(false));
        jest.spyOn(coupleRepository, 'createMany').mockImplementation(() => Promise.resolve([]));

        const result = await groupService.raffle(input);
        
        expect(result).toEqual(excpectedResult);
  
    });

    it('should throw error if year already raffled', async () => {

        const input: RaffleDto = {
            groupId: "group1",
            year: 2022
        }

        jest.spyOn(coupleRepository, 'yearAlreadyRaffled').mockImplementation(() => Promise.resolve(true));

        try {
            await groupService.raffle(input);
        } catch (error) {
            expect(error.message).toBe(`Group ${input.groupId} already raffled in ${input.year}`);
        }

    });

    it('should throw error if there are no possible matches', async () => {
        const participants = [
            {
                participantId: "1",
                groupId: "group1"
            },
            {
                participantId: "2",
                groupId: "group1"
            },
            {
                participantId: "3",
                groupId: "group1"
            },
        ]

        const previousCouples: Couple[] = [
            {
                id: 'some id',
                group: {id: 'group1'},
                year: 2020,
                secretSanta: { id: '1', name: 'some name' },
                giftee: { id: '2', name: 'some name' }
            }, 
            {
                id: 'some id',
                group: {id: 'group1'},
                year: 2020,
                secretSanta: { id: '2', name: 'some name' },
                giftee: { id: '3', name: 'some name' }
            },   
            {
                id: 'some id',
                group: {id: 'group1'},
                year: 2020,
                secretSanta: { id: '3', name: 'some name' },
                giftee: { id: '1', name: 'some name' }
            },  
            {
                id: 'some id',
                group: {id: 'group1'},
                year: 2021,
                secretSanta: { id: '1', name: 'some name' },
                giftee: { id: '3', name: 'some name' }
            }, 
            {
                id: 'some id',
                group: {id: 'group1'},
                year: 2021,
                secretSanta: { id: '2', name: 'some name' },
                giftee: { id: '1', name: 'some name' }
            },   
            {
                id: 'some id',
                group: {id: 'group1'},
                year: 2021,
                secretSanta: { id: '3', name: 'some name' },
                giftee: { id: '2', name: 'some name' }
            },              
        ]

        const input: RaffleDto = {
            groupId: "group1",
            year: 2022
        }

        jest.spyOn(groupRepository, 'getAllParticipantsInGroup').mockImplementation(() => Promise.resolve(participants));
        jest.spyOn(coupleRepository, 'getPreviousCouples').mockImplementation(() => Promise.resolve(previousCouples));
        jest.spyOn(coupleRepository, 'yearAlreadyRaffled').mockImplementation(() => Promise.resolve(false));
        jest.spyOn(coupleRepository, 'createMany').mockImplementation(() => Promise.resolve([]));

        try {
            await groupService.raffle(input);
        } catch (error) {
            expect(error.message).toBe(`Group ${input.groupId} can not match conditions to be raffled in year ${input.year}`);
        }

    });
  });
});