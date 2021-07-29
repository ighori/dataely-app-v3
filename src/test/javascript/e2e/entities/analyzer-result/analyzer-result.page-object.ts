import { by, element, ElementArrayFinder, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class AnalyzerResultComponentsPage extends AlertPage {
  title: ElementFinder = element(by.id('analyzer-result-heading'));

  footer: ElementFinder = element(by.id('footer'));
  createButton: ElementFinder = element(by.id('jh-create-entity'));

  noRecords: ElementFinder = element(by.css('#page-heading ~ div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#page-heading ~ div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('.btn-info.details'));
  }
  getEditButton(record: ElementFinder) {
    return record.element(by.css('.btn-primary.edit'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('div table .btn-danger'));
  }
}

export class AnalyzerResultDeleteDialog {
  dialog: ElementFinder = element(by.id('removeEntity'));
  title: ElementFinder = element(by.id('dataelyAppV3App.analyzerResult.delete.question'));
  confirmButton: ElementFinder = element(by.id('jhi-confirm-delete-analyzerResult'));
}
