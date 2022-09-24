import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CdkTreeComponent } from './cdk-tree/cdk-tree.component';
import { CdkTreeNodeDirective } from './cdk-internal-tree-node/directives/cdk-tree-node.directive';
import { CdkTreeNodeDefDirective } from './cdk-internal-tree-node/directives/cdk-internal-tree-node-def.directive';
import { CdkInternalTreeNodeComponent } from './cdk-internal-tree-node/cdk-internal-tree-node.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    CdkTreeComponent,
    CdkInternalTreeNodeComponent,
    CdkTreeNodeDirective,
    CdkTreeNodeDefDirective,
  ],
  exports: [CdkTreeComponent, CdkTreeNodeDirective, CdkTreeNodeDefDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
