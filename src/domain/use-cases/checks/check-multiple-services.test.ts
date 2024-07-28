import { LogEntity } from "../../entities/log.entity";
import { CheckMultiplesServices } from "./check-multiple-services";

describe("Check multiple services", () => {
  // Mocking the repository
  const mockRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  // Mocking the callbacks
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Testing the CheckService instance to return a succes after a TRUE fetch", async () => {
    const mockRepos = [mockRepo1, mockRepo2];
    const checkMultiplesServices = new CheckMultiplesServices(
      mockRepos,
      successCallback,
      errorCallback
    );

    const result = await checkMultiplesServices.execute(
      "https://www.google.com"
    );
    expect(result).toBe(true);
    expect(successCallback).toHaveBeenCalled();

    // Check if the saveLog method was called with a LogEntity instance for each repo
    mockRepos.forEach((mockRepo) => {
      expect(mockRepo.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
  });

  test("Testing the CheckService instance to return a error after a FALSE fetch", async () => {
    const mockRepos = [mockRepo1, mockRepo2];

    const checkMultiplesServices = new CheckMultiplesServices(
      mockRepos,
      successCallback,
      errorCallback
    );

    const result = await checkMultiplesServices.execute(
      "https://www.localhost:3000"
    );
    expect(result).toBe(false);
    expect(errorCallback).toHaveBeenCalled();

    // Check if the saveLog method was called with a LogEntity instance
    mockRepos.forEach((mockRepo) => {
      expect(mockRepo.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
  });
});
