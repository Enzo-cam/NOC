import { Server } from "./presentation/server";
import { envs } from "./configs/envs.plugins";

(async () => {
    main();
})();


function main (){
    Server.start()
}