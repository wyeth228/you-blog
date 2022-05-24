import xss from "xss";

export default class StringFilters {
  xssFiltrate: typeof xss;

  constructor(xssFiltrate: typeof xss) {
    this.xssFiltrate = xssFiltrate;
  }
}
