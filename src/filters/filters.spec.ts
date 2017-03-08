import {} from 'jasmine';
import { LogFilters, LogFilterConfig, Pass } from '.';

describe('LogFilters', () => {
  it('should instantiate filters from config', () => {
    const dummyConfig: LogFilterConfig[] = [
      {
        classname: 'Pass'
      },
      {
        classname: 'Pass'
      }
    ];
    const service = new LogFilters();
    spyOn(service, 'addFilter').and.callThrough();
    service.addFiltersByConfig(dummyConfig);
    expect(service.addFilter).toHaveBeenCalledWith(jasmine.any(Pass));
    expect(service.addFilter).toHaveBeenCalledTimes(2);
  });


  it('config MUST be an array, else error', () => {
    const invalidConfig = {
      classname: 'Pass'
    };
    let pass = false;
    try {
      const service = new LogFilters();
      service.addFiltersByConfig(invalidConfig);
    } catch (e) {
      pass = true;
    }
    expect(pass).toBe(true);
  });
});
