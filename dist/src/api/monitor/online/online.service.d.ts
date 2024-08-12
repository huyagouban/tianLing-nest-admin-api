import { ListOnlineDto } from './dto/online.dto';
import { AjaxResult } from "src/common/ajaxResult";
import { RedisService } from "src/api/redis/redis.service";
import { OnlineInfoVo } from "src/api/monitor/online/vo/online.vo";
export declare class OnlineService {
    private readonly redisService;
    constructor(redisService: RedisService);
    onlineList(query: ListOnlineDto): Promise<AjaxResult>;
    paginate(onlineUserList: OnlineInfoVo[], currentPage: number, pageSize: number): OnlineInfoVo[];
    logout(userId: number): Promise<AjaxResult>;
}
