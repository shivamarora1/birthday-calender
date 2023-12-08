export type eventsDataType = { [month: number]: dayEventsType | undefined };
export type dayEventsType = { [day: number]: String[] };

export type event = {
  id?: number;
  month: number;
  day: number;
  title: string;
  created_at?: Date;
};
