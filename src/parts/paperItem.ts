import { Color } from "three";
import { MyDisplay } from "../core/myDisplay";
import { Param } from "../core/param";
import { Tween } from "../core/tween";
import { Rect } from "../libs/rect";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class PaperItem extends MyDisplay {

  private _num: number
  private _id: number
  private _inner: HTMLElement
  private _text: HTMLElement

  public size: Rect = new Rect()

  constructor(opt:any) {
    super(opt)

    this._num = opt.num
    this._id = opt.id

    this._inner = document.createElement('div')
    this._inner.classList.add('js-paperItem__inner')
    this.el.append(this._inner)

    this._text = document.createElement('div')
    this._text.classList.add('js-paperItem__inner__text')
    this._inner.append(this._text)

    this._text.innerHTML = opt.text
  }

  protected _update(): void {
    super._update()

    if(this._c % 2 == 0) {
      this.size.width = this.getWidth(this._text)
      this.size.height = this.getHeight(this._text)
    }

    const p = Param.instance.p_paper
    const rate = p.rate.value * 0.01

    const key = ((this._num - 1) - this._id)
    const it = 1 / this._num
    const start = it * key

    const colA = new Color(0x000000)
    const colA2 = new Color(0xffff00)
    const colB = new Color(0x000000)

    Tween.instance.set(this.el, {
      width: this.size.width / this._num,
      height: this.size.height,
      x: (this.size.width / this._num),
      rotationY: Util.map(rate, 0, -90 * (this._id % 2 == 0 ? -1 : -1), start, start + it * 2),
      // rotationZ: Util.map(rate, 0, -10 * (this._id % 2 == 0 ? -1 : 1), start, start + it * 1),
      // rotationY: Util.map(rate, 0, -10 * (this._num - this._id), start, start + it * 1),
      backgroundColor: colA2.lerp(colB, Util.map(rate, 0, 2, start, start + it * 2)).getStyle()
    })

    Tween.instance.set(this._inner, {
      width: this.size.width / this._num,
      height: this.size.height,
    })
    Tween.instance.set(this._text, {
      x: (this.size.width / this._num) * this._id * -1,
      color: colA.getStyle()
    })
  }

  protected  _resize(): void {
    super._resize()
  }
}