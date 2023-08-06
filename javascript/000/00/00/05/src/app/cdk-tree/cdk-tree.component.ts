import { Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { CdkInternalTreeNode } from "../cdk-internal-tree-node/cdk-internal-tree-node.model";

import { CdkTreeNodeDefDirective } from "../cdk-internal-tree-node/directives/cdk-internal-tree-node-def.directive";

@Component({
  selector: "cdk-tree",
  templateUrl: "./cdk-tree.component.html",
  styleUrls: ["./cdk-tree.component.scss"]
})
export class CdkTreeComponent {
  @Input() dataSource: CdkInternalTreeNode[];

  @ContentChild(CdkTreeNodeDefDirective, { read: TemplateRef })
  nodeTemplate: TemplateRef<CdkTreeNodeDefDirective>;
}
