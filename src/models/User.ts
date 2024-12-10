import { Menu } from "./Menu"
import { Plan } from "./Plan"
import { Weight } from "./Weight"

export interface User {
    id: number
    firstName: string
    lastName: string
    age: number
    gender: string
    city: string
    email: string
    phoneNumber: string
    goal: string
    height: number
    weight: Weight[]
    abdominalCircumference: number
    agreedToTerms: boolean
    armCircumference: number
    bodyFatPrecentage: number
    healthDeclarationId: number | null
    hipsCircumference: number
    menu: Menu | null
    neckCircumference: number
    pecsCircumference: number
    plans: Plan[]
    thighsCircumference: number
    waistCircumference: number
    registrationDate: string
};

export interface UsersList {
    id: number
    firstName: string
    lastName: string
    age: number
    gender: string
    city: string
    agreedToTerms: boolean
    healthDeclarationId: number | null
    registrationDate: string
};

export interface TokenPayload {
    aud: string
    email: string
    exp: number
    iat: number
    iss: string
    nameid: string
    nbf: number
    role: string
};

export interface HealthDeclaration {
    id: number
    heartDisease: boolean
    chestPainInRest: boolean
    chestPainInDaily: boolean
    chestPainInActivity: boolean
    dizzy: boolean
    lostConsciousness: boolean
    asthmaTreatment: boolean
    shortBreath: boolean
    familyDeathHeartDisease: boolean
    familySuddenEarlyAgeDeath: boolean
    trainUnderSupervision: boolean
    chronicIllness: boolean
    isPregnant: boolean
}





