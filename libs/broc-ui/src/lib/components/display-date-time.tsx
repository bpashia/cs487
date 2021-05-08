import React from 'react';
import { format, toDate } from 'date-fns';

// export const renderDateTime = (dt: string | Date) =>
//   format(toDate(new Date(dt)), 'MM/dd/yyyy hh:mm:ss a');

export const renderDate = (dt: string | Date) =>
  format(toDate(new Date(dt)), 'MM/dd/yyyy');

// export const toDateAtMidnight = (dt: string | Date): Date => {
//   if (!dt) return undefined;
//   return new Date(renderDate(dt));
// };

// export const toDateString = (dt: string | Date): string => {
//   if (!dt) return null;
//   return renderDate(dt);
// };
// export const toDateTimeString = (dt: string | Date): string => {
//   if (!dt) return null;
//   return renderDateTime(dt);
// };
