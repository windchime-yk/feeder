type MockFunction<T extends (...args: never[]) => unknown> = {
  (...args: Parameters<T>): ReturnType<T>;
  mockReturnValue: (value: ReturnType<T>) => void;
  mockResolvedValue: (value: Awaited<ReturnType<T>>) => void;
  mockRejectedValue: (reason: unknown) => void;
};

type Mocked<T> = {
  [P in keyof T]: T[P] extends (...args: never[]) => unknown
    ? MockFunction<T[P]>
    : T[P];
};

export function createMock<T>(): Mocked<T> {
  return new Proxy({} as Mocked<T>, {
    get: (target, prop: string | symbol) => {
      if (!(prop in target)) {
        let returnValue: unknown;
        let isRejected = false;
        let rejectionReason: unknown;

        const mockFn = () => {
          if (isRejected) {
            return Promise.reject(rejectionReason);
          }
          if (returnValue instanceof Promise) {
            return returnValue;
          }
          return returnValue;
        };

        mockFn.mockReturnValue = (value: unknown) => {
          returnValue = value;
          isRejected = false;
        };

        mockFn.mockResolvedValue = (value: unknown) => {
          returnValue = Promise.resolve(value);
          isRejected = false;
        };

        mockFn.mockRejectedValue = (reason: unknown) => {
          rejectionReason = reason;
          isRejected = true;
        };

        (target as Record<string | symbol, unknown>)[prop] = mockFn;
      }
      return (target as Record<string | symbol, unknown>)[prop];
    },
  });
}
