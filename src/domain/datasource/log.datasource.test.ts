import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";


describe('LogDatasource', () => {

    const newLog = new LogEntity({
        message: 'Test message',
        level: LogSeverityLevel.low,
        origin: 'Test origin',
    })

    // Lo importnate aca es que el MOCK implemente la Interfaz, da igual que dan los metodos
    class MockDataSource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<any> {
            return log;
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }

    test('Testing the abstract class', async () => {
        const mockDataSource = new MockDataSource();

        expect(mockDataSource).toBeInstanceOf(MockDataSource);
        expect(typeof mockDataSource.saveLog).toBe('function');
        expect(typeof mockDataSource.getLogs).toBe('function');
    });
});