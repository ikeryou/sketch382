import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { PaperItem } from "./paperItem";

// -----------------------------------------
//
// -----------------------------------------
export class Paper extends MyDisplay {

  private _item: Array<PaperItem> = []

  constructor(opt:any) {
    super(opt)

    const num = 10
    const text = 'ビール。ビール。ビール。ビール'
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('js-paperItem')
      const tg = i == 0 ? this.el : this._item[i - 1].el
      tg.appendChild(el)

      const item = new PaperItem({
        el: el,
        text: text,
        num: num,
        id: i,
      })
      this._item.push(item)
    }
  }

  protected _update(): void {
    super._update()

    const baseW = this._item[0].size.width
    const baseH = this._item[0].size.height
    Tween.instance.set(this.el, {
      width: baseW,
      height: baseH,
      x: (baseW / this._item.length) * -1,
    })
  }

  protected  _resize(): void {
    super._resize()
  }
}