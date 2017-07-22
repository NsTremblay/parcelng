import { Directive } from '@angular/core';

/**
 * Generated class for the ImportDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[import]' // Attribute selector
})
export class ImportDirective {

  constructor() {
    console.log('Hello ImportDirective Directive');
  }

}
