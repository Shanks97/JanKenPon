export class MatchState{
    matchId: string;
    user1: UserInformation;
    user2: UserInformation;
    round: number;
    userOrderTurn: number;
    isFinished: boolean;
    parcialRounds: ParcialRound[];
}

export class UserInformation{
    id: string;
    completeName: string;
    order: number;
}

export class ParcialRound{
    round: number;
    winner: string;
}