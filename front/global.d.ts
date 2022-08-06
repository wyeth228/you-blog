declare namespace NodeJS {
  interface Process {
    server: boolean;
  }
}

declare module "*.svg" {
  const content: any;

  export default content;
}

declare module "@editorjs/header";
declare module "@editorjs/code";
declare module "@editorjs/inline-code";
declare module "@editorjs/image";
declare module "@editorjs/link";
