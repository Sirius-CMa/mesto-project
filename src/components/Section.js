export default class Section {
  constructor({ rendering }, blockElementsSelector) {
    this._rendering = rendering;
    this._$block = document.querySelector(blockElementsSelector)
  }

  initiateCard(cards) {
    cards.reduceRight((_, card) => {
      this.addCardInBlockElements(card)
    }),
      null
  }

  addCardInBlockElements(card) {   // : ф добавления "element"
    this._$block.prepend(this._rendering(card));
  };
}
