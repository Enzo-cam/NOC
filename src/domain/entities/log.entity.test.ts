import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('Log Entity', () => {

    test('Testing the constructor to create a LogEntity instance', async () => {

        const log = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.low,
            origin: 'log.entity.test.ts',
        })

        expect(log).toBeInstanceOf(LogEntity);

    });

    test('Testing the logFromJson to be a LogEntity instance', async () => {
        const logs = `
            {"message":"TypeError: fetch failed","level":"medium","createdAt":"2024-07-26T16:35:45.013Z","origin":"check-service.ts"}
        `

        const log = LogEntity.fromJson(logs);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("TypeError: fetch failed");
        expect(log.level).toBe(LogSeverityLevel.medium);
    })


    test('Testing the logFromObject to be a LogEntity instance', async () => {
        const logs = {
            message: "TypeError: fetch failed",
            level: LogSeverityLevel.medium,
            createdAt: "2024-07-26T16:35:45.013Z",
            origin: "check-service.ts"
        }

        const log = LogEntity.fromObject(logs);
        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("TypeError: fetch failed");
        expect(log.level).toBe(LogSeverityLevel.medium);
    
    });

});
