export default class Section {
  constructor({ rendering }, blockElementsSelector) {
    this._rendering = rendering;
    this._block = document.querySelector(blockElementsSelector)
  }

  initiateCard(cards) {
    console.log(cards)
    cards.reduceRight((_, card) => {
      this.addCardInBlockElements(card)
    }),
      null
  }

  addCardInBlockElements(card) {   // : ф добавления "element"
    this._block.prepend(this._rendering(card));
  };
}
