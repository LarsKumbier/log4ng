import { ConsoleRecipient, RecipientConfigParams } from '.';
import { Message, Level } from '../message';

describe('ConsoleWriter', () => {
  it('should pass messages to the console', () => {
    const mock = new MockConsole();
    const config: RecipientConfigParams = {
      consoleFn: mock
    };
    const sut = new ConsoleRecipient(config);
    spyOn(mock, 'info');
    const msg = 'some Message';
    sut.log(new Message(msg, Level.Info));
    expect(mock.info).toHaveBeenCalledWith(msg);
  });


  it('should run messages through the filter chain first', () => {
    const mock = new MockConsole();
    const config: RecipientConfigParams = {
      consoleFn: mock,
      filters: [{
        classname: 'Block'
      }]
    };
    const sut = new ConsoleRecipient(config);
    spyOn(mock, 'info');
    const msg = 'some Message';
    sut.log(new Message(msg, Level.Info));
    expect(mock.info).not.toHaveBeenCalled();
  });


  it('should use the correct log level function', () => {
    const mock = new MockConsole();
    const config: RecipientConfigParams = {
      consoleFn: mock
    };
    const sut = new ConsoleRecipient(config);

    spyOn(mock, 'log').and.callThrough();
    sut.log(new Message('I am a message WITHOUT level'));
    expect(mock.log).toHaveBeenCalledWith('I am a message WITHOUT level');
    (mock as any).log.calls.reset();

    sut.log(new Message('I am a LOG message', Level.Log));
    expect(mock.log).toHaveBeenCalledWith('I am a LOG message');

    spyOn(mock, 'debug').and.callThrough();
    sut.log(new Message('I am a DEBUG message', Level.Debug));
    expect(mock.debug).toHaveBeenCalledWith('I am a DEBUG message');

    spyOn(mock, 'info').and.callThrough();
    sut.log(new Message('I am a INFO message', Level.Info));
    expect(mock.info).toHaveBeenCalledWith('I am a INFO message');

    spyOn(mock, 'warn').and.callThrough();
    sut.log(new Message('I am a WARN message', Level.Warn));
    expect(mock.warn).toHaveBeenCalledWith('I am a WARN message');

    spyOn(mock, 'error').and.callThrough();
    sut.log(new Message('I am a ERROR message', Level.Error));
    expect(mock.error).toHaveBeenCalledWith('I am a ERROR message');
  });
});


class MockConsole implements Console {
  assert(test?: boolean, message?: string, ...optionalParams: any[]): void {}
  clear(): void {}
  count(countTitle?: string): void {}
  debug(message?: string, ...optionalParams: any[]): void {}
  dir(value?: any, ...optionalParams: any[]): void {}
  dirxml(value: any): void {}
  error(message?: any, ...optionalParams: any[]): void {}
  exception(message?: string, ...optionalParams: any[]): void {}
  group(groupTitle?: string): void {}
  groupCollapsed(groupTitle?: string): void {}
  groupEnd(): void {}
  info(message?: any, ...optionalParams: any[]): void {}
  log(message?: any, ...optionalParams: any[]): void {}
  msIsIndependentlyComposed(element: Element): boolean { return true; };
  profile(reportName?: string): void {}
  profileEnd(): void {}
  select(element: Element): void {}
  table(...data: any[]): void {}
  time(timerName?: string): void {}
  timeEnd(timerName?: string): void {}
  trace(message?: any, ...optionalParams: any[]): void {}
  warn(message?: any, ...optionalParams: any[]): void {}
}
