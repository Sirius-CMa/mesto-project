export default class Section {
  constructor({ render }, blockSelector) {
    this._render = render;
    this._$block = document.querySelector(blockSelector)
  }

  // initiateCard(cards) {
  //   cards.reduceRight((_, card) => {
  //     this.addCardInBlockElements(card)
  //   }),
  //     null
  // }

  addCardInBlockElements(card) {   // : ф добавления "element"
    this._$block.prepend(this._render(card));
  };
}
