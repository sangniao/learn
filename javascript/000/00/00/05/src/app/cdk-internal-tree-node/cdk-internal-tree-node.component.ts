import { Component, Input, TemplateRef } from "@angular/core";
import { CdkInternalTreeNode } from "./cdk-internal-tree-node.model";
import { CdkTreeNodeDefDirective } from "./directives/cdk-internal-tree-node-def.directive";

@Component({
  selector: "cdk-internal-tree-node",
  templateUrl: "./cdk-internal-tree-node.component.html",
  styleUrls: ["./cdk-internal-tree-node.component.scss"]
})
export class CdkInternalTreeNodeComponent {
  @Input() node: CdkInternalTreeNode;
  @Input() template: TemplateRef<CdkTreeNodeDefDirective>;

  isChecked = false;

  get nodeContext() {
    return {
      $implicit: this.node,
      checked: this.isChecked
    };
  }
}
