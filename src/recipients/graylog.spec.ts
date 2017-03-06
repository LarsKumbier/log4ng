import {} from 'jasmine';
import { TestBed, async, inject } from '@angular/core/testing';
import {
  BaseRequestOptions,
  Http,
  HttpModule,
  Request,
  RequestMethod,
  Response,
  ResponseOptions,
  ResponseType } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Graylog } from './graylog';
import { Message } from '../message';

const RESPONSE_OK = new Response(new ResponseOptions({
  status: 202,
  statusText: 'Accepted'
}));

const RESPONSE_404 = new Response(new ResponseOptions({
  status: 404,
  statusText: 'Not Found'
}));

const RESPONSE_NO_CONNECTION = new Response(new ResponseOptions({
  status: 0,
  statusText: '',
  type: ResponseType.Error
}));

describe('Graylog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  });


  it('meta-test on how to use a mockBackend for http', inject([Http, MockBackend], (fakeHttp: Http, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Post);
      connection.mockRespond(RESPONSE_OK);
    });

    fakeHttp.post('http://example.com', '{"key":"value"}').subscribe(
      (response) => {
        expect(response.ok).toBe(true);
        expect(response.status).toBe(202);
        expect(response.statusText).toBe('Accepted');
      },
      (error) => {
        fail('expected this http connection to be mocked correctly');
      }
    );
  }));


  it('should use our http-with-mockBackend', inject([Http, MockBackend], (fakeHttp: Http, mockBackend: MockBackend) => {
    const msg = 'I am a Message';

    mockBackend.connections.subscribe((connection) => {
      expect(connection.request.method).toBe(RequestMethod.Post);
      const body = JSON.parse(connection.request.getBody());
      expect((body as any).short_message).toBe(msg);
      connection.mockRespond(RESPONSE_OK);
    });

    const config = {
      gelfUrl: 'http://1.2.3.4:5678/gelf',
      http: fakeHttp,
      failSilently: true
    };

    const graylog = new Graylog(config);
    graylog.log(new Message(msg));
  }));


  it('should fail when response is a 404', inject([Http, MockBackend], (fakeHttp: Http, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(RESPONSE_404);
    });

    const config = {
      gelfUrl: 'http://1.2.3.4:5678/gelf',
      http: fakeHttp,
      failSilently: true
    };

    const graylog = new GraylogTestclass(config);
    spyOn(graylog, 'handleError').and.callThrough();
    graylog.log(new Message('anything'));
    expect((graylog as any).handleError).toHaveBeenCalled();
  }));


  it('should fail when no connection is possible', inject([Http, MockBackend], (fakeHttp: Http, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(RESPONSE_NO_CONNECTION);
    });

    const config = {
      gelfUrl: 'http://1.2.3.4:5678/gelf',
      http: fakeHttp,
      failSilently: true
    };

    const graylog = new GraylogTestclass(config);
    spyOn(graylog, 'handleError').and.callThrough();
    graylog.log(new Message('anything'));
    expect((graylog as any).handleError).toHaveBeenCalled();
  }));
});


class GraylogTestclass extends Graylog {
  public handleError(error: any): void { }
}
