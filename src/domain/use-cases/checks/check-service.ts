
interface ICheckService{
    execute(url:string) :Promise<boolean>;
}

type SuccessCB = () => void;
type ErrorCB = (error: string) => void;

export class CheckService implements ICheckService {
    
    constructor(
        private readonly successCB: SuccessCB,
        private readonly errorCB: ErrorCB
    ){}


    // No es static debido a que inyectaremos dependencias
    async execute(url:string): Promise<boolean>{
        try {
            const res = await fetch(url);
            if(!res.ok){
                throw new Error(`Error on check service: ${url}`)
            }


            this.successCB();
            return true;
        } catch (error) {
            // console.log(`${error}: that happen.`)
            this.errorCB(`${error}`)
            return false;
        }
    }
}