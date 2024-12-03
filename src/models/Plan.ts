export interface Plan {
    id: number
    userName: string
    isCompleted: boolean
    name: string
    planDetails: PlanDetails[]
};

export interface PlanDetails {
    id: number
    orderInPlan: number
    exerciseName: string
    reps: number
    sets: number
    currentWeight: number
    previousWeight: number
};

export interface Exercise {
    id: number
    name: string
    muscleGroupName: string
};

export interface MuscleGroup {
    id: number
    name: string
    exercises: string[]
};