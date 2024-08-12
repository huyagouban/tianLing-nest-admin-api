import { OnlineService } from './online.service';
import { ListOnlineDto } from './dto/online.dto';
import { AjaxResult } from "src/common/ajaxResult";
export declare class OnlineController {
    private readonly onlineService;
    constructor(onlineService: OnlineService);
    onlineList(query: ListOnlineDto): Promise<AjaxResult>;
    logout(userId: number): Promise<AjaxResult>;
}
