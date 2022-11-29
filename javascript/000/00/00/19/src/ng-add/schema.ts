export interface Schema {
  /** Name of the project */
  project: string;
  /**
   * preprocessor for css or type
   * @default css
   */
  cssType: cssType;
  /**
   * tailwindcss version to be installed
   * @default latest
   */
  tailwindcssVersion: string;
}

export type cssType = 'css' | 'scss' | 'sass' | 'less';
