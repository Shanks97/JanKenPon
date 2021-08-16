export class MatchCreated{
    matchId: string;
    user1: UserInformation;
    user2: UserInformation;
}

export class UserInformation{
    id: string;
    completeName: string;
    order: number;
}