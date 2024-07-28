import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";



describe('Check Service', () => {

    // Mocking the repository
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    // Mocking the callbacks
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    beforeEach  (() => {
        jest.clearAllMocks();
    });

    test('Testing the CheckService instance to return a succes after a TRUE fetch', async () => {        
        const checkService = new CheckService(
            mockRepository,
             successCallback,
             errorCallback
        );

        const result = await checkService.execute('https://www.google.com');
        expect(result).toBe(true);
        expect(successCallback).toHaveBeenCalled();

        // Check if the saveLog method was called with a LogEntity instance
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });
    
    test('Testing the CheckService instance to return a error after a FALSE fetch', async () => {
            
        const checkService = new CheckService(
            mockRepository,
             successCallback,
             errorCallback
        );


        const result = await checkService.execute('https://www.localhost:3000');
        expect(result).toBe(false);
        expect(errorCallback).toHaveBeenCalled();

        // Check if the saveLog method was called with a LogEntity instance
        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
    });

});