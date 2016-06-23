/**
 * Class to track the start and finish of work progress.
 */
export class ProgressTracker{
    private inProgressCount: number = 0;

    get isInProgress(): boolean{
        return this.inProgressCount > 0;
    }

    startProgress(): void{
        this.inProgressCount ++;
    }

    endProgress(): void{
        this.inProgressCount --;
    }
    
}