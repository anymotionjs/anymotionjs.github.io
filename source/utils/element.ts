export function eachElement(selector: string, callback: (ele: Element, index: number, list: Element[]) => void) {
  document.querySelectorAll(selector).forEach((ele, index, array) => callback(ele, index, [...array]))
}
