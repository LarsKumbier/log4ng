import {} from 'jasmine';
import { ReflectiveInjector } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { Log4ngService } from './log4ng.service';
import { Log4ngServiceConfig } from './log4ng.service.config';
import { DummyRecipient, RecipientConfig } from './recipients';
import { Level, Message } from './message';
import { Pass, Block } from './filters';



class Log4ngServiceTest extends Log4ngService {
  public sendToRecipients(message: Message): void {
    return super.sendToRecipients(message);
  }
}


describe('Log4ngService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Log4ngServiceConfig,
          useValue: {}
        },
        Log4ngService,
        Log4ngServiceTest
      ]
    });
  });


  it('should call registered writers\' log method multiple times for multiple log messages',
        inject([Log4ngService],
        (logger: Log4ngService) => {
    const anyWriter = new DummyRecipient();
    spyOn(anyWriter, 'log');
    logger.addRecipient(anyWriter);
    expect(anyWriter.log).not.toHaveBeenCalled();

    logger.log('1st Message');
    expect(anyWriter.log).toHaveBeenCalledTimes(1);

    logger.log('2nd Message');
    expect(anyWriter.log).toHaveBeenCalledTimes(2);
  }));


  it('should call all registered writers\' on logging messages', inject([Log4ngService], (logger: Log4ngService) => {
    const anyWriter1 = new DummyRecipient();
    spyOn(anyWriter1, 'log');
    const anyWriter2 = new DummyRecipient();
    spyOn(anyWriter2, 'log');

    logger.addRecipient(anyWriter1)
          .addRecipient(anyWriter2);

    expect(anyWriter1.log).not.toHaveBeenCalled();
    expect(anyWriter2.log).not.toHaveBeenCalled();

    logger.log('a Message');

    expect(anyWriter1.log).toHaveBeenCalledTimes(1);
    expect(anyWriter2.log).toHaveBeenCalledTimes(1);
  }));


  it('should instantiate recipients from config', inject([Log4ngService], (logger: Log4ngService) => {
    const dummyConfig: RecipientConfig[] = [
      {
        classname: 'DummyRecipient',
        params: {
          name: 'anyRecipient1'
        }
      },
      {
        classname: 'DummyRecipient',
        params: {
          name: 'anyRecipient2'
        }
      }
    ];
    spyOn(logger, 'addRecipient').and.callThrough();

    logger.addRecipientsFromConfig(dummyConfig);

    expect(logger.addRecipient).toHaveBeenCalledWith(jasmine.any(DummyRecipient));
    expect(logger.addRecipient).toHaveBeenCalledTimes(2);
  }));


  it('should handle non-string objects', inject([Log4ngService], (logger: Log4ngServiceTest) => {
    const thing = {
      'aString': 'value',
      'aNumber': 42,
      aFunction: () => {
        return true;
      }
    };
    spyOn(logger, 'sendToRecipients').and.callThrough();

    logger.log(thing);

    expect((logger as any).sendToRecipients).toHaveBeenCalledWith(jasmine.any(Message));
  }));


  it('should instantiate from config without writers and filters', () => {
    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: Log4ngServiceConfig,
        useValue: {}
      },
      Log4ngService
    ]);

    const service = injector.get(Log4ngService);

    expect(service instanceof Log4ngService).toBe(true);
  });


  it('should run through the filter chain when logging', inject([Log4ngServiceTest], (logger: Log4ngServiceTest) => {
    const filter1 = new Pass();
    spyOn(filter1, 'shouldBeLogged').and.returnValue(true);
    const filter2 = new Pass();
    spyOn(filter2, 'shouldBeLogged').and.returnValue(true);
    const writer = new DummyRecipient();

    logger.addFilter(filter1)
          .addFilter(filter2)
          .addRecipient(writer);

    logger.log('1st Message', Level.Info);

    expect(filter1.shouldBeLogged).toHaveBeenCalledTimes(1);
    expect(filter2.shouldBeLogged).toHaveBeenCalledTimes(1);

    logger.log('2nd Message', Level.Debug);

    expect(filter1.shouldBeLogged).toHaveBeenCalledTimes(2);
    expect(filter2.shouldBeLogged).toHaveBeenCalledTimes(2);
  }));


  it('should NOT log a message if a filter prohibits it', inject([Log4ngService], (logger: Log4ngService) => {
    const filterPasses = new Pass();
    spyOn(filterPasses, 'shouldBeLogged').and.returnValue(true);
    const filterProhibits = new Pass();
    spyOn(filterProhibits, 'shouldBeLogged').and.returnValue(false);
    const writer = new DummyRecipient();
    spyOn(writer, 'log');

    logger.addFilter(filterPasses)
          .addFilter(filterProhibits)
          .addRecipient(writer);

    logger.log('A Message');

    expect(writer.log).not.toHaveBeenCalled();
  }));
});
