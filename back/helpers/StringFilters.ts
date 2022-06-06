import xss from "xss";

export default class StringFilters {
  constructor(public xssFiltrate: typeof xss) {}
}
