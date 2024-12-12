export default interface checkScore{
    user_id: string,
    module_id: number | string;
    completed?: boolean;
    score: number,
    passed: boolean,
    attempt_number: number,
    feedback: string,
    prefect_score: number
}