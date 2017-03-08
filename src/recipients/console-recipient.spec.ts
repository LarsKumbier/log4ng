import { ConsoleRecipient, RecipientConfigParams } from '.';
import { Message, Level } from '../message';

/**
 * FIXME: console may not exist everywhere and should be mocked
 */
describe('ConsoleRecipient', () => {
  it('should pass messages to the console', () => {
    const mock = console;
    const config:RecipientConfigParams = {
      consoleFn: mock
    }
    const sut = new ConsoleRecipient(config);
    spyOn(mock, 'info');
    const msg = 'some Message';
    sut.log(new Message(msg, Level.Info));
    expect(mock.info).toHaveBeenCalledWith(msg);
  });


  it('should run messages through the filter chain first', () => {
    const mock = console;
    const config:RecipientConfigParams = {
      consoleFn: mock,
      filters: [{
        classname: "Block"
      }]
    }
    const sut = new ConsoleRecipient(config);
    spyOn(mock, 'info');
    const msg = 'some Message';
    sut.log(new Message(msg, Level.Info));
    expect(mock.info).not.toHaveBeenCalled();
  });


  it('should use the correct log level function', () => {
    const mock = console;
    const config:RecipientConfigParams = {
      consoleFn: mock
    };
    const sut = new ConsoleRecipient(config);

    spyOn(mock, 'log');
    sut.log(new Message('I am a message WITHOUT level'));
    expect(mock.log).toHaveBeenCalledWith('I am a message WITHOUT level');
    (mock as any).log.calls.reset();

    sut.log(new Message('I am a LOG message', Level.Log));
    expect(mock.log).toHaveBeenCalledWith('I am a LOG message');

    spyOn(mock, 'debug');
    sut.log(new Message('I am a DEBUG message', Level.Debug));
    expect(mock.debug).toHaveBeenCalledWith('I am a DEBUG message');

    spyOn(mock, 'info');
    sut.log(new Message('I am a INFO message', Level.Info));
    expect(mock.info).toHaveBeenCalledWith('I am a INFO message');

    spyOn(mock, 'warn');
    sut.log(new Message('I am a WARN message', Level.Warn));
    expect(mock.warn).toHaveBeenCalledWith('I am a WARN message');

    spyOn(mock, 'error');
    sut.log(new Message('I am a ERROR message', Level.Error));
    expect(mock.error).toHaveBeenCalledWith('I am a ERROR message');
  });
});
