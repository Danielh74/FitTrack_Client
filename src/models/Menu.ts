export interface Menu {
    id: number
    userName: string
    meals: Meal[]
};

export interface Meal {
    id: number
    order: number
    name: string
    proteinPoints: number
    carbsPoints: number
    fatsPoints: number
    isCompleted: boolean
};