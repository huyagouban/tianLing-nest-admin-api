export declare class PasswordUtils {
    private static saltRounds;
    static create(password: string): Promise<string>;
    static compare(rawPassword: string, hashPassword: string): Promise<boolean>;
}
