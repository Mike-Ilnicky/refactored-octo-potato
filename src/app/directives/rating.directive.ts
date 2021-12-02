import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[rating]',
})
export class RatingDirective {

  @Input() set rating(n: number) {
    if (n === 0) {
      this.viewContainer.clear();
      return
    }
    for (let i=1; i<=n; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef
              ) {
  }
}
