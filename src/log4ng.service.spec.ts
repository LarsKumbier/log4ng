import {} from 'jasmine';
import { TestBed, inject } from '@angular/core/testing';
import { ReflectiveInjector } from '@angular/core';
import {
  Pass,
  DummyRecipient,
  RecipientConfig,
  Level,
  LOG4NG_SERVICE_HANDLER_PROVIDERS,
  LOG4NG_SERVICE_CONFIG,
  Log4ngService,
  Message
} from '.';


export class Log4ngTestClass extends Log4ngService {
  public sendToRecipients(message: Message): void {

  }
}


describe('Log4ngService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LOG4NG_SERVICE_HANDLER_PROVIDERS
      ]
    });
  });


  /**
   * FIXME: this looks promising
  it('should have a nice readable interface', inject([Log4ngService], (logger: Log4ngService) => {
    logger.logsTo(console).and
          .logsTo(graylog)
          .if(isMinLevel(Level.Debug)).and
          .if(isMaxLevel(Level.Warn));
  }));
  */


  /**
   * FIXME: refactor into two one-dimensional tests
   */
  it('should call registered writers\' logMessage function each time logger logs a message',
        inject([Log4ngService], (logger: Log4ngService) => {
    const anyWriter = new DummyRecipient();
    spyOn(anyWriter, 'log');
    logger.addRecipient(anyWriter);

    logger.log('1st Message', Level.Info);

    expect(anyWriter.log).toHaveBeenCalledTimes(1);

    logger.log('2nd Message', Level.Error);

    expect(anyWriter.log).toHaveBeenCalledTimes(2);
  }));


  it('should call all registered writers\' on logging messages', inject([Log4ngService], (logger: Log4ngService) => {
    const anyWriter1 = new DummyRecipient();
    spyOn(anyWriter1, 'log');
    const anyWriter2 = new DummyRecipient();
    spyOn(anyWriter2, 'log');

    logger.addRecipient(anyWriter1)
          .addRecipient(anyWriter2);

    logger.log('a Message', Level.Info);

    expect(anyWriter1.log).toHaveBeenCalledTimes(1);
    expect(anyWriter2.log).toHaveBeenCalledTimes(1);
  }));



  it('should work without registered writers', inject([Log4ngService], (logger: Log4ngService) => {
    logger.log('A Message');
  }));


  it('should log without registered filters', inject([Log4ngService], (logger: Log4ngService) => {
    const writer = new DummyRecipient();
    spyOn(writer, 'log');
    logger.addRecipient(writer);

    logger.log('Some Message', Level.Warn);

    expect(writer.log).toHaveBeenCalledTimes(1);
  }));


  it('should run through the filter chain when logging', inject([Log4ngService], (logger: Log4ngService) => {
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


  it('should instantiate writers from config', inject([Log4ngService], (logger: Log4ngService) => {
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


  it('should handle non-string objects', () => {
    const thing = {
      'aString': 'value',
      'aNumber': 42,
      aFunction: () => {
        return true;
      }
    };
    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: LOG4NG_SERVICE_CONFIG,
        useValue: LOG4NG_SERVICE_CONFIG
      },
      {
        provide: Log4ngService,
        useClass: Log4ngTestClass
      }
    ]);

    const logger = injector.get(Log4ngService);
    spyOn(logger, 'sendToRecipients').and.callThrough();

    logger.log(thing);

    expect((logger as any).sendToRecipients).toHaveBeenCalledWith(jasmine.any(Message));
  });


  it('should instantiate from config without writers and filters', () => {
    const injector = ReflectiveInjector.resolveAndCreate([
      LOG4NG_SERVICE_HANDLER_PROVIDERS,
      {
        provide: LOG4NG_SERVICE_CONFIG,
        useValue: {}
      }
    ]);

    const service = injector.get(Log4ngService);

    expect(service instanceof Log4ngService).toBe(true);
  });
});
