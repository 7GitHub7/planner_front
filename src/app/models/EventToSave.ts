export class EventToSave {
  title: string;
  start: Date;
  end: Date;
  color: any;
  actions?: string;
  draggable?: number;
  beforeStart?: number;
  afterEnd?: number;
  userID: number;
  noteID: number[];
}
