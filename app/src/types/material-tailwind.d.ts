// Local ambient types to relax overly-strict prop types from @material-tailwind/react
// This keeps the runtime behavior unchanged while avoiding TypeScript errors
// caused by library types that require unrelated DOM props.
declare module "@material-tailwind/react" {
  const anyExport: any;
  export const Typography: anyExport;
  export const Card: anyExport;
  export const CardBody: anyExport;
  export const Avatar: anyExport;
  export const IconButton: anyExport;
  export const Button: anyExport;
  export const ThemeProvider: anyExport;
  export default anyExport;
}

export {};
