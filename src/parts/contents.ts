import { MyDisplay } from "../core/myDisplay";
import { Paper } from "./paper";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  constructor(opt:any) {
    super(opt)

    new Paper({
      el:document.querySelector('.l-main > .l-main-item'),
    });
  }
}