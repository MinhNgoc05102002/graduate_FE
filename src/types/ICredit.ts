export interface ICredit {
    avatar: string
    categories: any
    classes: any
    countFlashcard: number
    countLearn: number
    countLearnCal: number
    countReport: number
    createdAt: string
    createdBy: string
    creditId: string
    description: string
    flashcards: any
    folders: any
    name: string
}

export interface IProps {
    credit: ICredit;
}