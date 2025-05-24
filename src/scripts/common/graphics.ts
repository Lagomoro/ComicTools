// ================================================================================
// * Module dependencies
// --------------------------------------------------------------------------------

// ================================================================================

// ================================================================================
//# region Color
// --------------------------------------------------------------------------------
export class Color {
  // ------------------------------------------------------------------------------
  // * Parameter
  // ------------------------------------------------------------------------------
  private _r: number;
  private _g: number;
  private _b: number;
  private _a: number;
  // ------------------------------------------------------------------------------
  // * Getter & Setter
  // ------------------------------------------------------------------------------
  public get r(): number {
    return this._r;
  };

  public get g(): number {
    return this._g;
  }

  public get b(): number {
    return this._b;
  }

  public get a(): number {
    return this._a;
  }
  // ------------------------------------------------------------------------------
  // * Constructor
  // ------------------------------------------------------------------------------
  public constructor(r: number, g: number, b: number, a: number = 1) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
  }
  // ------------------------------------------------------------------------------
  // * Function
  // ------------------------------------------------------------------------------
  public static fromHSV(h: number, s: number = 1, v: number = 1, a: number = 1): Color {
    let r = 0, g = 0, b = 0;
    if (s < 0) s = 0;
    if (s > 1) s = 1;
    if (v < 0) v = 0;
    if (v > 1) v = 1;
    h %= 360;
    if (h < 0) h += 360;
    h /= 60;
    const i = Math.floor(h);
    const f = h - i;
    const p1 = v * (1 - s);
    const p2 = v * (1 - s * f);
    const p3 = v * (1 - s * (1 - f));
    switch(i) {
      case 0: r = v;  g = p3; b = p1; break;
      case 1: r = p2; g = v;  b = p1; break;
      case 2: r = p1; g = v;  b = p3; break;
      case 3: r = p1; g = p2; b = v;  break;
      case 4: r = p3; g = p1; b = v;  break;
      case 5: r = v;  g = p1; b = p2; break;
    }
    return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a);
  };
  // ------------------------------------------------------------------------------
  //# region Convert
  // ------------------------------------------------------------------------------
  public toGreyStyleColor(): Color {
    const grayscale = this._r * 0.299 + this._g * 0.587 + this._b * 0.114;
    return new Color(grayscale, grayscale, grayscale, this._a);
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region Calc
  // ------------------------------------------------------------------------------
  private _clamp(value: number){
    return Math.max(0, Math.min(value, 255));
  }
  // ------------------------------------------------------------------------------
  public add(r: number, g: number, b: number, a: number = 0) {
    this._r = this._clamp(this._r + r);
    this._g = this._clamp(this._g + g);
    this._b = this._clamp(this._b + b);
    this._a = this._clamp(this._a + a);
    return this;
  };

  public addNew(r: number, g: number, b: number, a: number = 0) {
    return new Color(this._clamp(this._r + r), this._clamp(this._g + g), this._clamp(this._b + b), this._clamp(this._a + a));
  };

  public addColor(color: Color) {
    this._r = this._clamp(this._r + color._r);
    this._g = this._clamp(this._g + color._g);
    this._b = this._clamp(this._b + color._b);
    this._a = this._clamp(this._a + color._a);
    return this;
  };

  public addColorNew(color: Color) {
    return new Color(this._clamp(this._r + color._r), this._clamp(this._g + color._g), this._clamp(this._b + color._b), this._clamp(this._a + color._a));
  };
  // ------------------------------------------------------------------------------
  public minus(r: number, g: number, b: number, a: number = 0) {
    this._r = this._clamp(this._r - r);
    this._g = this._clamp(this._g - g);
    this._b = this._clamp(this._b - b);
    this._a = this._clamp(this._a - a);
    return this;
  };

  public minusNew(r: number, g: number, b: number, a: number = 0) {
    return new Color(this._clamp(this._r - r), this._clamp(this._g - g), this._clamp(this._b - b), this._clamp(this._a - a));
  };

  public minusColor(color: Color) {
    this._r = this._clamp(this._r - color._r);
    this._g = this._clamp(this._g - color._g);
    this._b = this._clamp(this._b - color._b);
    this._a = this._clamp(this._a - color._a);
    return this;
  };

  public minusColorNew(color: Color) {
    return new Color(this._clamp(this._r - color._r), this._clamp(this._g - color._g), this._clamp(this._b - color._b), this._clamp(this._a - color._a));
  };
  // ------------------------------------------------------------------------------
  public distance(r: number, g: number, b: number): number {
    return Math.sqrt(Math.pow(this._r - r, 2) + Math.pow(this._g - g, 2) + Math.pow(this._b - b, 2));
  };

  public distanceColor(color: Color): number {
    return Math.sqrt(Math.pow(this._r - color._r, 2) + Math.pow(this._g - color._g, 2) + Math.pow(this._b - color._b, 2));
  };
  // ------------------------------------------------------------------------------
  //# region Set
  // ------------------------------------------------------------------------------
  public setRGB(r: number, g: number, b: number) {
    this._r = r;
    this._g = g;
    this._b = b;
  };

  public setRGBA(r: number, g: number, b: number, a: number = 1) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
  };

  public setColor(color: Color) {
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this._a = color._a;
  };
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
  //# region ToString
  // ------------------------------------------------------------------------------
  public toRGBString(): string {
    return `rgb(${ this._r }, ${ this._g }, ${ this._b })`;
  }

  public toRGBAString(): string {
    return `rgba(${ this._r }, ${ this._g }, ${ this._b }, ${ this._a })`;
  }
  // ------------------------------------------------------------------------------
  //# endregion
  // ------------------------------------------------------------------------------
}
// --------------------------------------------------------------------------------
//# endregion
// ================================================================================
