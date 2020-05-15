declare module "less" {
  export interface RootFileInfo {
    rewriteUrls?: boolean;
    filename: string;
    relativeUrls: boolean;
    rootpath: string;
    currentDirectory: string;
    entryPath: string;
    rootFilename: string;
    reference: boolean;
  }

  export interface PreProcessor {
    process: (src: string, extra: PreProcessorExtraInfo) => string;
  }

  export interface PreProcessorExtraInfo {
    context: { pluginManager: PluginManager };
    fileInfo: RootFileInfo;
    imports: { [key: string]: unknown };
  }

  export interface LoadedFile {
    contents?: string;
    filename?: string;
  }

  export interface LoadedFileSync extends LoadedFile {
    error?: {
      type: string;
      message: string;
    };
  }

  export type LoadOptions = { [k: string]: unknown };

  export interface AbstractFileManagerInterface {
    supportsSync(filename: string, currentDir: string, options: LoadOptions): boolean;
  }

  export interface FileManagerInterface extends AbstractFileManagerInterface {
    supports(filename: string, currentDir: string, options: LoadOptions): boolean;
    loadFile(filename: string, currentDir: string, options: LoadOptions): Promise<LoadedFile>;
    loadFileSync?(filename: string, currentDir: string, options: LoadOptions): LoadedFileSync;
  }

  class AbstractFileManager implements AbstractFileManagerInterface {
    supportsSync(filename: string, currentDir: string, options: LoadOptions): boolean;
  }

  class FileManager extends AbstractFileManager implements FileManagerInterface {
    supports(filename: string, currentDir: string, options: LoadOptions): boolean;
    loadFile(filename: string, currentDir: string, options: LoadOptions): Promise<LoadedFile>;
    loadFileSync?(filename: string, currentDir: string, options: LoadOptions): LoadedFileSync;
  }

  class PluginManager {
    constructor(less: Less);
    addPreProcessor(preProcessor: PreProcessor, priority?: number): void;
    addFileManager(fileManager: FileManagerInterface): void;
  }

  export interface Plugin {
    install: (less: Less, pluginManager: PluginManager) => void;
  }

  export interface SourceMapOption {
    sourceMapURL?: string;
    sourceMapBasepath?: string;
    sourceMapRootpath?: string;
    outputSourceFiles?: boolean;
    sourceMapFileInline?: boolean;
  }

  export interface StaticOptions {
    async: boolean;
    fileAsync: boolean;
    modifyVars: { [variable: string]: string };
  }

  export interface Options {
    sourceMap?: SourceMapOption;
    filename?: string;
    paths?: string[];
    lint?: boolean;
    plugins?: Plugin[];
    compress?: boolean;
    strictImports?: boolean;
    insecure?: boolean;
    depends?: boolean;
    maxLineLen?: number;
    color?: boolean;
    ieCompat?: boolean;
    javascriptEnabled?: boolean;
    dumpLineNumbers?: "comment" | string;
    rootpath?: string;
    math?: "always" | "strict" | "parens-division" | "parens" | "strict-legacy" | number;
    silent?: boolean;
    strictUnits?: boolean;
    globalVars?: { [key: string]: string };
    modifyVars?: { [key: string]: string };
    syncImport?: boolean;
  }

  export type RenderCallback = (error: RenderError, output: RenderOutput | undefined) => void;

  export interface RenderError {
    column: number;
    extract: string[];
    filename: string;
    index: number;
    line: number;
    message: string;
    type: string;
  }

  export interface RenderOutput {
    css: string;
    map: string;
    imports: string[];
  }

  export interface Less {
    options: StaticOptions;
    sheets: HTMLLinkElement[];
    version: number[];

    AbstractFileManager: typeof AbstractFileManager;
    FileManager: typeof FileManager;

    render(input: string, callback: RenderCallback): void;
    render(input: string, options: Options, callback: RenderCallback): void;
    render(input: string, options?: Options): Promise<RenderOutput>;
  }

  const less: Less;
  export default less;
}
