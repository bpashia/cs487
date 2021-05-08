export interface Option<T extends string | number> {
  label: string;
  value: T;
}

// export const toOption = (obj: any): Option => {
//   switch (typeof obj) {
//     case 'object':
//       return {
//         label: obj.name,
//         value: obj.id,
//       };
//     default:
//       const stringValue = String(obj);
//       return {
//         label: stringValue,
//         value: stringValue,
//       };
//   }
// };

// export const toOptions = (obj: any[] | object): Option[] => {
//   if (Array.isArray(obj)) {
//     return obj.map(toOption);
//   }
//   if (typeof obj === 'object') {
//     return Object.values(obj).map(toOption);
//   }
// };
