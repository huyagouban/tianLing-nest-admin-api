export declare class IpUtils {
    private static IP2RegionInstance;
    static requestIp: (req: Request) => any;
    static ip2Region: (ip: string) => import("ip2region").IP2RegionResult;
}
