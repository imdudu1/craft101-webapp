import { Subject } from 'rxjs';

export class LiveMC {
  private readonly client: WebSocket;
  private readonly events: Map<string, Subject<string>>;
  private readonly host: string;

  constructor(host: string) {
    this.host = host;
    this.events = new Map();
    this.client = new WebSocket(host);

    this.client.onmessage = (event) => {
      this.onMessage(event);
    };

    setTimeout(() => {
      this.client.send(
        JSON.stringify({
          event: 'message',
          data: '123',
        }),
      );
    }, 5000);
  }

  addEventCallback(event: string, fn: (param1: string) => void) {
    let subject = this.events.get(event)!;
    if (!subject) {
      subject = LiveMC.newSubject();
      this.events.set(event, subject);
    }
    subject.subscribe(fn);
  }

  send(event: string, data: string) {
    this.client.send(
      JSON.stringify({
        event,
        data,
      }),
    );
  }

  close() {
    this.events.forEach((event) => event.unsubscribe());
    this.client.close();
  }

  private onMessage({ data }: MessageEvent): void {
    const payload = JSON.parse(data);
    const eventSubject = this.events.get(payload.event)!;
    if (eventSubject) {
      eventSubject.next(payload.data);
    }
  }

  private static newSubject(): Subject<string> {
    return new Subject<string>();
  }
}
